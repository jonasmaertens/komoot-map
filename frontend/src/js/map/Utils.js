export class Utils {
    static formatNumber(num) {
        return num.toLocaleString();
    }
    
    static formatDistance(meters) {
        const km = meters / 1000;
        return `${km.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})} km`;
    }
    
    static formatElevation(meters) {
        if (meters >= 1000) {
            const km = meters / 1000;
            return `${km.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})} km`;
        } else {
            return `${Math.round(meters).toLocaleString()} m`;
        }
    }
    
    static formatDuration(seconds) {
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
    
    static getRandomColor() {
        // Generate a random color in hex format
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
} 