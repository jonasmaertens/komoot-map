import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat, transform } from 'ol/proj';
import { Cluster } from 'ol/source';
import { StyleManager } from './StyleManager';

export class MapInitializer {
    constructor(targetElement) {
        this.targetElement = targetElement;
        this.styleManager = new StyleManager();
        
        // Initialize map components
        this.baseLayer = this.createBaseLayer();
        this.map = this.createMap();
        this.tourSource = this.createTourSource();
        this.clusteredSource = this.createClusteredSource();
        this.tourLayer = this.createTourLayer();
        
        // Add layers to map
        this.map.addLayer(this.tourLayer);
        
        // Set up zoom change handler
        this.setupZoomChangeHandler();
    }
    
    createBaseLayer() {
        return new TileLayer({
            source: new OSM()
        });
    }
    
    createMap() {
        return new Map({
            target: this.targetElement,
            layers: [this.baseLayer],
            view: new View({
                center: transform([9.993682, 53.551086], 'EPSG:4326', 'EPSG:3857'),
                projection: 'EPSG:3857',
                zoom: 6
            })
        });
    }
    
    createTourSource() {
        return new VectorSource();
    }
    
    createClusteredSource() {
        return new Cluster({
            source: this.tourSource,
            distance: 60,
            minDistance: 30,
        });
    }
    
    createTourLayer() {
        return new VectorLayer({
            source: this.clusteredSource,
            style: (feature) => {
                const size = feature.get('features').length;
                let style;
                
                if (size === 1) {
                    // Single feature - use sport type style
                    const tour = feature.get('features')[0].get('tour');
                    const isSelected = tour.komoot_id === this.selectedTourId;
                    style = this.styleManager.createMarkerStyle(tour.sport_type, isSelected);
                } else {
                    // Cluster - use cluster style
                    style = this.styleManager.createClusterStyle(size);
                }
                
                return style;
            }
        });
    }
    
    setupZoomChangeHandler() {
        this.map.getView().on('change:resolution', () => {
            const zoom = this.map.getView().getZoom();
            // More aggressive distance scaling with zoom
            const baseDistance = 60;
            const zoomFactor = Math.pow(1.8, zoom - 6);
            const distance = Math.max(30, baseDistance / zoomFactor);
            this.clusteredSource.setDistance(distance);
        });
    }
    
    // Getters
    getMap() {
        return this.map;
    }
    
    getTourSource() {
        return this.tourSource;
    }
    
    getClusteredSource() {
        return this.clusteredSource;
    }
    
    getTourLayer() {
        return this.tourLayer;
    }
} 