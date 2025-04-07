import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import KML from 'ol/format/KML';
import { format } from 'date-fns';
import { Utils } from './Utils';

export class TourManager {
    constructor(tourSource, map) {
        this.tourSource = tourSource;
        this.map = map;
        this.markerFeatures = {};
        this.tourLayers = {};
        this.loadingCancelled = false;
    }
    
    async loadAllTours() {
        try {
            // Load all tours using relative path
            const response = await fetch('/api/all-tours');
            const tours = await response.json();
            
            // Add all tours to the source
            this.tourSource.clear();
            
            for (const tour of tours) {
                const feature = new Feature({
                    geometry: new Point(fromLonLat([tour.center_lon, tour.center_lat])),
                    tour: tour
                });
                
                this.tourSource.addFeature(feature);
                this.markerFeatures[tour.komoot_id] = feature;
            }
            
            return tours;
        } catch (error) {
            console.error('Error loading all tours:', error);
            return [];
        }
    }
    
    async loadStats() {
        try {
            const response = await fetch('/api/stats');
            const stats = await response.json();
            
            // Update statistics display with formatted numbers
            document.getElementById('totalTours').textContent = Utils.formatNumber(stats.total_tours);
            document.getElementById('totalDistance').textContent = Utils.formatDistance(stats.total_distance);
            document.getElementById('totalDuration').textContent = Utils.formatDuration(stats.total_duration);
            document.getElementById('totalElevationGain').textContent = Utils.formatElevation(stats.total_elevation_gain);
            document.getElementById('totalElevationLoss').textContent = Utils.formatElevation(stats.total_elevation_loss);
            
            // Show statistics panel
            document.getElementById('statsPanel').classList.remove('hidden');
        } catch (error) {
            console.error('Error loading statistics:', error);
        }
    }
    
    async selectTour(tourId, tourMap) {
        if (tourMap.selectedTourId === tourId) {
            return;
        }
        
        tourMap.selectedTourId = tourId;
        
        try {
            // Get tour details using relative path
            const response = await fetch(`/api/tours/${tourId}`);
            const tour = await response.json();
            
            // Display tour info with formatted numbers
            document.getElementById('tourName').textContent = tour.name;
            document.getElementById('tourDate').textContent = tour.date ? format(new Date(tour.date), 'PPP') : 'Unknown';
            document.getElementById('tourDistance').textContent = Utils.formatDistance(tour.distance);
            document.getElementById('tourDuration').textContent = Utils.formatDuration(tour.duration);
            document.getElementById('tourElevationGain').textContent = Utils.formatElevation(tour.elevation_gain);
            document.getElementById('tourElevationLoss').textContent = Utils.formatElevation(tour.elevation_loss);
            document.getElementById('tourSportType').textContent = tour.sport_type || 'Unknown';
            
            // Update Komoot link
            document.getElementById('komootLink').href = `https://www.komoot.com/de-de/tour/${tour.komoot_id}`;
            
            document.getElementById('tourInfo').classList.remove('hidden');
            
            // Refresh the tour layer style to update highlighting
            tourMap.tourLayer.changed();
            
            // Load KML
            await this.loadTourKML(tourId, tourMap);
        } catch (error) {
            console.error('Error selecting tour:', error);
        }
    }
    
    deselectTour(tourMap) {
        tourMap.selectedTourId = null;
        document.getElementById('tourInfo').classList.add('hidden');
        
        // Refresh the tour layer style to update highlighting
        tourMap.tourLayer.changed();
        
        // Remove active tour layer
        if (tourMap.activeTourLayer) {
            this.map.removeLayer(tourMap.activeTourLayer);
            tourMap.activeTourLayer = null;
        }
    }
    
    async loadTourKML(tourId, tourMap) {
        try {
            // Remove previous tour layer
            if (tourMap.activeTourLayer) {
                this.map.removeLayer(tourMap.activeTourLayer);
            }
            
            // If showing all tours, don't display the selected tour separately
            if (tourMap.showAllTours) {
                return;
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
            
            // Set the tour property on each feature
            features.forEach(feature => {
                feature.set('tour', { komoot_id: tourId });
            });
            
            // Generate random color
            const color = Utils.getRandomColor();
            
            // Create new vector layer for the tour
            tourMap.activeTourLayer = new VectorLayer({
                source: new VectorSource({
                    features: features
                }),
                style: tourMap.styleManager.createTourStyle(color, 2)
            });
            
            // Add the tour layer to the map
            this.map.addLayer(tourMap.activeTourLayer);
            
            // Fit the view to the tour extent
            const extent = tourMap.activeTourLayer.getSource().getExtent();
            this.map.getView().fit(extent, {
                padding: [50, 50, 50, 50],
                duration: 1000  // Smooth animation
            });
        } catch (error) {
            console.error('Error loading tour KML:', error);
        }
    }
    
    toggleAllToursDisplay(tourMap) {
        if (tourMap.showAllTours) {
            // Reset the cancellation flag
            this.loadingCancelled = false;
            // Hide the tour layer (clusters and points)
            tourMap.tourLayer.setVisible(false);
            // Show all tours
            this.displayAllTours(tourMap);
        } else {
            // Set the cancellation flag to stop any ongoing loading
            this.loadingCancelled = true;
            // Show the tour layer (clusters and points)
            tourMap.tourLayer.setVisible(true);
            // Hide all tours
            this.hideAllTours(tourMap);
        }
    }
    
    async displayAllTours(tourMap) {
        // Remove active tour layer if it exists
        if (tourMap.activeTourLayer) {
            this.map.removeLayer(tourMap.activeTourLayer);
            tourMap.activeTourLayer = null;
        }
        
        // Hide tour info
        document.getElementById('tourInfo').classList.add('hidden');
        
        // Load and display all tours
        for (const tour of tourMap.allTours) {
            // Check if loading was cancelled
            if (this.loadingCancelled) {
                break;
            }
            await this.loadAndDisplayTour(tour.komoot_id, tourMap);
        }
    }
    
    hideAllTours(tourMap) {
        // Remove all tour layers
        for (const tourId in tourMap.tourLayers) {
            this.map.removeLayer(tourMap.tourLayers[tourId]);
        }
        tourMap.tourLayers = {};
    }
    
    highlightTour(tourId, tourMap) {
        // If we're not in display all tours mode, don't do anything
        if (!tourMap.showAllTours) {
            return;
        }
        
        // Reset all tour styles to normal
        for (const id in tourMap.tourLayers) {
            const layer = tourMap.tourLayers[id];
            const color = layer.get('color') || Utils.getRandomColor();
            layer.setStyle(tourMap.styleManager.createTourStyle(color, 2));
        }
        
        // If tourId is null, just reset all styles and return
        if (!tourId) {
            return;
        }
        
        // Highlight the selected tour by making it larger
        if (tourMap.tourLayers[tourId]) {
            const layer = tourMap.tourLayers[tourId];
            const color = layer.get('color') || Utils.getRandomColor();
            layer.setStyle(tourMap.styleManager.createTourStyle(color, 4));
        }
    }
    
    async loadAndDisplayTour(tourId, tourMap) {
        try {
            // Check if tour layer already exists
            if (tourMap.tourLayers[tourId]) {
                return;
            }
            
            // Load simplified KML
            const response = await fetch(`/api/tours/${tourId}/kml?simplified=true`);
            const kmlText = await response.text();
            
            const format = new KML({
                extractStyles: false
            });
            const features = format.readFeatures(kmlText, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });
            
            // Set the tour property on each feature
            features.forEach(feature => {
                feature.set('tour', { komoot_id: tourId });
            });
            
            // Generate random color
            const color = Utils.getRandomColor();
            
            // Create new vector layer for the tour
            const tourLayer = new VectorLayer({
                source: new VectorSource({
                    features: features
                }),
                style: tourMap.styleManager.createTourStyle(color, 2)
            });
            
            // Store the color for later use
            tourLayer.set('color', color);
            
            // Check if loading was cancelled before adding the layer
            if (this.loadingCancelled) {
                return;
            }
            
            // Add the tour layer to the map
            this.map.addLayer(tourLayer);
            
            // Store the layer
            tourMap.tourLayers[tourId] = tourLayer;
        } catch (error) {
            console.error(`Error loading tour KML for ${tourId}:`, error);
        }
    }
} 