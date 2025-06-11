import 'ol/ol.css';
import { MapInitializer } from './MapInitializer';
import { TourManager } from './TourManager';
import { StyleManager } from './StyleManager';
import { EventHandler } from './EventHandler';
import { Utils } from './Utils';

export class TourMap {
    constructor(targetElement) {
        // Initialize map components
        this.mapInitializer = new MapInitializer(targetElement);
        this.map = this.mapInitializer.getMap();
        this.tourSource = this.mapInitializer.getTourSource();
        this.clusteredSource = this.mapInitializer.getClusteredSource();
        this.tourLayer = this.mapInitializer.getTourLayer();
        
        // Initialize managers
        this.tourManager = new TourManager(this.tourSource, this.map);
        this.styleManager = new StyleManager();
        this.eventHandler = new EventHandler(this);
        
        // Set up state
        this.activeTourLayer = null;
        this.selectedTourId = null;
        this.markerFeatures = {};
        this.allTours = [];
        this.tourLayers = {};
        this.showAllTours = false;
        
        // Set up event listeners
        this.eventHandler.setupEventListeners();
        
        // Load data
        this.tourManager.loadAllTours().then(tours => {
            this.allTours = tours;
        });
        this.tourManager.loadStats();
        
        // Set up toggle for showing all tours
        this.eventHandler.setupShowAllToursToggle();
        
        // Set up toggle for full screen mode
        this.eventHandler.setupFullScreenToggle();
        
        // Set up GPS location button
        this.eventHandler.setupLocationButton();
    }
    
    // Delegate methods to appropriate managers
    async selectTour(tourId) {
        return this.tourManager.selectTour(tourId, this);
    }
    
    deselectTour() {
        this.tourManager.deselectTour(this);
    }
    
    async loadTourKML(tourId) {
        return this.tourManager.loadTourKML(tourId, this);
    }
    
    toggleAllToursDisplay() {
        this.tourManager.toggleAllToursDisplay(this);
    }
    
    // Utility methods
    formatNumber(num) {
        return Utils.formatNumber(num);
    }
    
    formatDistance(meters) {
        return Utils.formatDistance(meters);
    }
    
    formatElevation(meters) {
        return Utils.formatElevation(meters);
    }
    
    formatDuration(seconds) {
        return Utils.formatDuration(seconds);
    }
    
    getRandomColor() {
        return Utils.getRandomColor();
    }
} 