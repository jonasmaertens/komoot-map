import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import KML from 'ol/format/KML';
import { fromLonLat, transform } from 'ol/proj';
import { Style, Icon, Stroke, Fill, Circle, Text } from 'ol/style';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { format } from 'date-fns';
import { Cluster } from 'ol/source';

export class TourMap {
    constructor(targetElement) {
        // Create base map layer
        this.baseLayer = new TileLayer({
            source: new OSM()
        });

        // Create map with base layer
        this.map = new Map({
            target: targetElement,
            layers: [this.baseLayer],
            view: new View({
                center: transform([9.993682, 53.551086], 'EPSG:4326', 'EPSG:3857'),
                projection: 'EPSG:3857',
                zoom: 6
            })
        });

        // Create vector source for tours
        this.tourSource = new VectorSource();
        
        // Create clustered source with dynamic distance
        this.clusteredSource = new Cluster({
            source: this.tourSource,
            distance: 60, // Increased initial distance
            minDistance: 30, // Increased minimum distance
        });
        
        // Create vector layer with clustered source
        this.tourLayer = new VectorLayer({
            source: this.clusteredSource,
            style: (feature) => {
                const size = feature.get('features').length;
                let style;
                
                if (size === 1) {
                    // Single feature - use sport type style
                    const tour = feature.get('features')[0].get('tour');
                    const isSelected = tour.komoot_id === this.selectedTourId;
                    style = this.createMarkerStyle(tour.sport_type, isSelected);
                } else {
                    // Cluster - use cluster style
                    style = this.createClusterStyle(size);
                }
                
                return style;
            }
        });
        
        this.map.addLayer(this.tourLayer);
        
        this.activeTourLayer = null;
        this.selectedTourId = null;
        this.markerFeatures = {}; // Store tour markers as a regular object
        this.allTours = []; // Store all tours
        
        // Handle click events
        this.map.on('click', (event) => this.handleMapClick(event));
        
        // Update clustering distance when zoom changes
        this.map.getView().on('change:resolution', () => {
            const zoom = this.map.getView().getZoom();
            // More aggressive distance scaling with zoom
            const baseDistance = 60;
            const zoomFactor = Math.pow(1.8, zoom - 6);
            const distance = Math.max(30, baseDistance / zoomFactor);
            this.clusteredSource.setDistance(distance);
        });
        
        // Load all tours and statistics
        this.loadAllTours();
        this.loadStats();
    }

    createClusterStyle(size) {
        // Calculate radius based on size with a logarithmic scale
        const minRadius = 12;
        const maxRadius = 30;
        const radius = minRadius + Math.min(maxRadius - minRadius, Math.log2(size) * 3);
        
        // Calculate color based on size
        const intensity = Math.min(1, Math.log2(size) / 6);
        const r = Math.round(52 + (41 - 52) * intensity);
        const g = Math.round(152 + (128 - 152) * intensity);
        const b = Math.round(219 + (185 - 219) * intensity);
        const color = `rgb(${r}, ${g}, ${b})`;
        
        return new Style({
            image: new Circle({
                radius: radius,
                fill: new Fill({
                    color: color
                }),
                stroke: new Stroke({
                    color: '#ffffff',
                    width: 2
                })
            }),
            text: new Text({
                text: size.toString(),
                fill: new Fill({
                    color: '#ffffff'
                }),
                font: `${Math.min(16, 12 + Math.log2(size))}px Arial`,
                offsetY: 1
            })
        });
    }

    async loadAllTours() {
        try {
            // Load all tours using relative path
            const response = await fetch('/api/all-tours');
            this.allTours = await response.json();
            
            // Add all tours to the source
            this.tourSource.clear();
            
            for (const tour of this.allTours) {
                const feature = new Feature({
                    geometry: new Point(fromLonLat([tour.center_lon, tour.center_lat])),
                    tour: tour
                });
                
                this.tourSource.addFeature(feature);
                this.markerFeatures[tour.komoot_id] = feature;
            }
        } catch (error) {
            console.error('Error loading all tours:', error);
        }
    }

    async loadStats() {
        try {
            const response = await fetch('/api/stats');
            const stats = await response.json();
            
            // Update statistics display with formatted numbers
            document.getElementById('totalTours').textContent = this.formatNumber(stats.total_tours);
            document.getElementById('totalDistance').textContent = this.formatDistance(stats.total_distance);
            document.getElementById('totalDuration').textContent = this.formatDuration(stats.total_duration);
            document.getElementById('totalElevation').textContent = this.formatElevation(stats.total_elevation);
            
            // Show statistics panel
            document.getElementById('statsPanel').classList.remove('hidden');
        } catch (error) {
            console.error('Error loading statistics:', error);
        }
    }

    formatNumber(num) {
        return num.toLocaleString();
    }
    
    formatDistance(meters) {
        const km = meters / 1000;
        return `${km.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})} km`;
    }
    
    formatElevation(meters) {
        if (meters >= 1000) {
            const km = meters / 1000;
            return `${km.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})} km`;
        } else {
            return `${Math.round(meters).toLocaleString()} m`;
        }
    }
    
    formatDuration(seconds) {
        if (!seconds) return 'Unknown';
        
        const days = Math.floor(seconds / (24 * 3600));
        const hours = Math.floor((seconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (days > 0) {
            return `${days}d ${hours}h ${minutes}m`;
        } else if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${minutes}m`;
        }
    }

    async handleMapClick(event) {
        const feature = this.map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
        
        if (feature) {
            // Check if it's a cluster
            if (feature.get('features')) {
                const features = feature.get('features');
                
                // If it's a single feature, select it
                if (features.length === 1) {
                    const tour = features[0].get('tour');
                    await this.selectTour(tour.komoot_id);
                } else {
                    // Log detailed cluster information
                    console.log('Cluster clicked:', {
                        numFeatures: features.length,
                        currentZoom: this.map.getView().getZoom(),
                        currentCenter: this.map.getView().getCenter(),
                        clusterCenter: feature.getGeometry().getCoordinates()
                    });
                    
                    // Log coordinates of each point in the cluster
                    console.log('Cluster points:');
                    features.forEach((f, index) => {
                        const coords = f.getGeometry().getCoordinates();
                        const tour = f.get('tour');
                        console.log(`Point ${index + 1}:`, {
                            coordinates: coords,
                            tourId: tour.komoot_id,
                            tourName: tour.name
                        });
                    });
                    
                    // Calculate extent based on actual point coordinates
                    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                    features.forEach(f => {
                        const coords = f.getGeometry().getCoordinates();
                        minX = Math.min(minX, coords[0]);
                        minY = Math.min(minY, coords[1]);
                        maxX = Math.max(maxX, coords[0]);
                        maxY = Math.max(maxY, coords[1]);
                    });
                    
                    const width = maxX - minX;
                    const height = maxY - minY;
                    console.log('Calculated extent size:', { width, height });
                    
                    // Create extent with padding
                    const padding = Math.max(width, height) * 0.1; // Reduced padding to 10%
                    const newExtent = [
                        minX - padding,
                        minY - padding,
                        maxX + padding,
                        maxY + padding
                    ];
                    
                    console.log('Adjusted extent:', newExtent);
                    
                    // Calculate appropriate zoom level based on cluster size and spread
                    const spread = Math.max(width, height);
                    const currentZoom = this.map.getView().getZoom();
                    
                    // Calculate target zoom based on spread size
                    let targetZoom;
                    if (spread < 1000) {
                        targetZoom = 16; // Very close points
                    } else if (spread < 2000) {
                        targetZoom = 15;
                    } else if (spread < 4000) {
                        targetZoom = 14;
                    } else if (spread < 8000) {
                        targetZoom = 13;
                    } else {
                        targetZoom = 12;
                    }
                    
                    // Ensure we zoom in at least 2 levels from current zoom
                    targetZoom = Math.max(targetZoom, currentZoom + 2);
                    
                    // Fit the view to the cluster extent with padding
                    this.map.getView().fit(newExtent, {
                        padding: [50, 50, 50, 50],
                        duration: 500,
                        maxZoom: targetZoom
                    });
                    
                    // Log the final zoom level
                    setTimeout(() => {
                        console.log('Final zoom level:', this.map.getView().getZoom());
                    }, 600);
                }
            } else {
                const tour = feature.get('tour');
                await this.selectTour(tour.komoot_id);
            }
        } else {
            this.deselectTour();
        }
    }

    async selectTour(tourId) {
        if (this.selectedTourId === tourId) {
            return;
        }
        
        this.selectedTourId = tourId;
        
        try {
            // Get tour details using relative path
            const response = await fetch(`/api/tours/${tourId}`);
            const tour = await response.json();
            
            // Display tour info with formatted numbers
            document.getElementById('tourName').textContent = tour.name;
            document.getElementById('tourDate').textContent = tour.date ? format(new Date(tour.date), 'PPP') : 'Unknown';
            document.getElementById('tourDistance').textContent = this.formatDistance(tour.distance);
            document.getElementById('tourDuration').textContent = this.formatDuration(tour.duration);
            document.getElementById('tourElevation').textContent = this.formatElevation(tour.elevation_gain);
            document.getElementById('tourSportType').textContent = tour.sport_type || 'Unknown';
            
            document.getElementById('tourInfo').classList.remove('hidden');
            
            // Refresh the tour layer style to update highlighting
            this.tourLayer.changed();
            
            // Load KML
            await this.loadTourKML(tourId);
        } catch (error) {
            console.error('Error selecting tour:', error);
        }
    }
    
    deselectTour() {
        this.selectedTourId = null;
        document.getElementById('tourInfo').classList.add('hidden');
        
        // Refresh the tour layer style to update highlighting
        this.tourLayer.changed();
        
        // Remove active tour layer
        if (this.activeTourLayer) {
            this.map.removeLayer(this.activeTourLayer);
            this.activeTourLayer = null;
        }
    }

    async loadTourKML(tourId) {
        try {
            // Remove previous tour layer
            if (this.activeTourLayer) {
                this.map.removeLayer(this.activeTourLayer);
            }
            
            // Load simplified KML using relative path
            const response = await fetch(`/api/tours/${tourId}/kml?simplified=true`);
            const kmlText = await response.text();
            
            const format = new KML({
                extractStyles: false
            });
            const features = format.readFeatures(kmlText, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });
            
            // Create new vector layer for the tour
            this.activeTourLayer = new VectorLayer({
                source: new VectorSource({
                    features: features
                }),
                style: new Style({
                    stroke: new Stroke({
                        color: '#3498db',
                        width: 3
                    })
                })
            });
            
            // Add the tour layer to the map
            this.map.addLayer(this.activeTourLayer);
            
            // Fit the view to the tour extent
            const extent = this.activeTourLayer.getSource().getExtent();
            this.map.getView().fit(extent, {
                padding: [50, 50, 50, 50],
                duration: 1000  // Smooth animation
            });
        } catch (error) {
            console.error('Error loading tour KML:', error);
        }
    }

    createMarkerStyle(sportType, isSelected = false) {
        // Define colors for different sport types
        const colors = {
            'cycling': '#3498db', // Blue
            'hiking': '#2ecc71',  // Green
            'running': '#e74c3c', // Red
            'default': '#f39c12'  // Orange
        };
        
        const color = colors[sportType?.toLowerCase()] || colors.default;
        
        return new Style({
            image: new Circle({
                radius: isSelected ? 8 : 6,
                fill: new Fill({
                    color: color
                }),
                stroke: new Stroke({
                    color: '#ffffff',
                    width: isSelected ? 2 : 1
                })
            })
        });
    }
} 