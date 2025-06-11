import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

export class EventHandler {
    constructor(tourMap) {
        this.tourMap = tourMap;
        this.geolocation = null;
        this.geolocationLayer = null;
        this.positionFeature = null;
        this.accuracyFeature = null;
    }
    
    setupEventListeners() {
        // Handle click events
        this.tourMap.map.on('click', (event) => this.handleMapClick(event));
    }
    
    async handleMapClick(event) {
        // Use hitTolerance to increase the hitbox for features
        const feature = this.tourMap.map.forEachFeatureAtPixel(event.pixel, (feature) => feature, {
            hitTolerance: 10 // 10 pixels tolerance for hit detection
        });
        
        if (feature) {
            // Check if it's a cluster
            if (feature.get('features')) {
                const features = feature.get('features');
                
                // If it's a single feature, select it
                if (features.length === 1) {
                    const tour = features[0].get('tour');
                    await this.tourMap.selectTour(tour.komoot_id);
                    
                    // If in display all tours mode, highlight the tour
                    if (this.tourMap.showAllTours) {
                        this.tourMap.tourManager.highlightTour(tour.komoot_id, this.tourMap);
                    }
                } else {
                    // Log detailed cluster information
                    console.log('Cluster clicked:', {
                        numFeatures: features.length,
                        currentZoom: this.tourMap.map.getView().getZoom(),
                        currentCenter: this.tourMap.map.getView().getCenter(),
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
                    const currentZoom = this.tourMap.map.getView().getZoom();
                    
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
                    this.tourMap.map.getView().fit(newExtent, {
                        padding: [50, 50, 50, 50],
                        duration: 500,
                        maxZoom: targetZoom
                    });
                    
                    // Log the final zoom level
                    setTimeout(() => {
                        console.log('Final zoom level:', this.tourMap.map.getView().getZoom());
                    }, 600);
                }
            } else {
                const tour = feature.get('tour');
                await this.tourMap.selectTour(tour.komoot_id);
                
                // If in display all tours mode, highlight the tour
                if (this.tourMap.showAllTours) {
                    this.tourMap.tourManager.highlightTour(tour.komoot_id, this.tourMap);
                }
            }
        } else {
            this.tourMap.deselectTour();
            
            // If in display all tours mode, reset all tour styles
            if (this.tourMap.showAllTours) {
                this.tourMap.tourManager.highlightTour(null, this.tourMap);
            }
        }
    }
    
    setupShowAllToursToggle() {
        const toggle = document.getElementById('showAllTours');
        if (toggle) {
            toggle.addEventListener('click', () => {
                this.tourMap.showAllTours = !this.tourMap.showAllTours;
                toggle.classList.toggle('active', this.tourMap.showAllTours);
                this.tourMap.toggleAllToursDisplay();
            });
        }
    }
    
    setupFullScreenToggle() {
        const toggle = document.getElementById('fullScreen');
        if (toggle) {
            toggle.addEventListener('click', () => {
                const container = document.querySelector('.container');
                const isFullScreen = container.classList.toggle('full-screen');
                toggle.classList.toggle('active', isFullScreen);
            });
        }
    }
    
    setupLocationButton() {
        const locationBtn = document.getElementById('locateUser');
        if (locationBtn) {
            locationBtn.addEventListener('click', () => {
                this.getCurrentLocation();
            });
        }
    }
    
    initializeGeolocation() {
        if (this.geolocation) {
            return; // Already initialized
        }
        
        // Create geolocation object
        this.geolocation = new Geolocation({
            trackingOptions: {
                enableHighAccuracy: true,
            },
            projection: this.tourMap.map.getView().getProjection(),
        });
        
        // Create accuracy feature (circle showing GPS accuracy)
        this.accuracyFeature = new Feature();
        this.geolocation.on('change:accuracyGeometry', () => {
            this.accuracyFeature.setGeometry(this.geolocation.getAccuracyGeometry());
        });
        
        // Create position feature (blue dot showing exact position)
        this.positionFeature = new Feature();
        this.positionFeature.setStyle(
            new Style({
                image: new CircleStyle({
                    radius: 8,
                    fill: new Fill({
                        color: '#3399CC',
                    }),
                    stroke: new Stroke({
                        color: '#fff',
                        width: 2,
                    }),
                }),
            })
        );
        
        this.geolocation.on('change:position', () => {
            const coordinates = this.geolocation.getPosition();
            this.positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
        });
        
        // Create vector layer for geolocation features
        this.geolocationLayer = new VectorLayer({
            source: new VectorSource({
                features: [this.accuracyFeature, this.positionFeature],
            }),
            style: [
                // Style for accuracy circle
                new Style({
                    fill: new Fill({
                        color: 'rgba(51, 153, 204, 0.1)',
                    }),
                    stroke: new Stroke({
                        color: 'rgba(51, 153, 204, 0.5)',
                        width: 1,
                    }),
                }),
            ],
        });
        
        // Add the geolocation layer to the map
        this.tourMap.map.addLayer(this.geolocationLayer);
        
        // Handle geolocation errors
        this.geolocation.on('error', (error) => {
            console.error('Geolocation error:', error);
            const locationBtn = document.getElementById('locateUser');
            locationBtn.classList.remove('loading');
            locationBtn.disabled = false;
            
            let message = 'Unable to retrieve your location.';
            if (error.message) {
                message = error.message;
            }
            alert(message);
        });
    }
    
    getCurrentLocation() {
        const locationBtn = document.getElementById('locateUser');
        
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by this browser.');
            return;
        }
        
        // Initialize geolocation if not already done
        this.initializeGeolocation();
        
        // Add loading state
        locationBtn.classList.add('loading');
        locationBtn.disabled = true;
        
        // Set up one-time position tracking
        const onPositionChange = () => {
            const position = this.geolocation.getPosition();
            if (position) {
                // Center the map on the user's location
                this.tourMap.map.getView().animate({
                    center: position,
                    zoom: 16,
                    duration: 1000
                });
                
                // Remove loading state
                locationBtn.classList.remove('loading');
                locationBtn.disabled = false;
                
                // Remove the event listener as we only want to do this once
                this.geolocation.un('change:position', onPositionChange);
                
                // Stop tracking after getting the position
                setTimeout(() => {
                    this.geolocation.setTracking(false);
                }, 2000);
            }
        };
        
        // Listen for position changes
        this.geolocation.on('change:position', onPositionChange);
        
        // Start tracking
        this.geolocation.setTracking(true);
        
        // Set a timeout in case position doesn't come quickly
        setTimeout(() => {
            if (locationBtn.classList.contains('loading')) {
                this.geolocation.setTracking(false);
                this.geolocation.un('change:position', onPositionChange);
                locationBtn.classList.remove('loading');
                locationBtn.disabled = false;
                alert('Location request timed out. Please try again.');
            }
        }, 10000);
    }
} 