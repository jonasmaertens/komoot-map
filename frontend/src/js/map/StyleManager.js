import { Style, Circle, Fill, Stroke, Text } from 'ol/style';

export class StyleManager {
    constructor() {
        // Define colors for different sport types
        this.sportColors = {
            'cycling': '#3498db', // Blue
            'hiking': '#2ecc71',  // Green
            'running': '#e74c3c', // Red
            'default': '#f39c12'  // Orange
        };
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
    
    createMarkerStyle(sportType, isSelected = false) {
        const color = this.sportColors[sportType?.toLowerCase()] || this.sportColors.default;
        
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
    
    createTourStyle(color = '#3498db', width = 3) {
        return new Style({
            stroke: new Stroke({
                color: color,
                width: width
            })
        });
    }
} 