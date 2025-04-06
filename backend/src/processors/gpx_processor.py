import gpxdata
from typing import List, Tuple, Dict, Any
from pathlib import Path
import xml.etree.ElementTree as ET
import numpy as np
from datetime import datetime
from ..processors.bbox_calculator import calculate_bbox, calculate_center
from ..utils.config import GPX_DIR, GPX_MIN_DISTANCE, GPX_PATH_DIFFERENCE_THRESHOLD
from geopy.distance import geodesic

class GPXProcessor:
    def __init__(self):
        self.gpx_dir = GPX_DIR
        self.gpx_dir.mkdir(parents=True, exist_ok=True)
    
    def process_gpx(self, gpx_data: str, tour_id: str) -> Dict[str, Any]:
        """
        Process GPX data for a tour.
        
        Args:
            gpx_data: GPX data as string
            tour_id: Tour ID
            
        Returns:
            Dictionary with processed GPX data containing only points, bbox, and center
        """
        try:
            # Save GPX file
            gpx_file = self.gpx_dir / f"{tour_id}.gpx"
            with open(gpx_file, "w", encoding="utf-8") as f:
                f.write(gpx_data)
            
            # Parse GPX data
            doc = gpxdata.Document.readGPX(str(gpx_file), str(tour_id))
            
            # Extract all track points
            points = []
            
            for track in doc.tracks:
                for segment in track.segments:
                    for point in segment.points:
                        points.append((point.lat, point.lon))
            
            if not points:
                raise ValueError(f"No valid points found in GPX data for tour {tour_id}")
            
            # Calculate bbox and center
            bbox = calculate_bbox(points)
            center = calculate_center(points)
            
            return {
                "points": points,
                "bbox": bbox,
                "center": center
            }
        except Exception as e:
            print(f"Error processing GPX data for tour {tour_id}: {str(e)}")
            return None

    def simplify_points(self, points: List[Tuple[float, float]]) -> List[Tuple[float, float]]:
        """
        Simplify a list of points using a distance-based filtering approach.
        
        This algorithm has two steps:
        1. Remove points that are too close together (less than 60 meters apart)
        2. Remove points that don't significantly change the path (using a threshold of 0.2)
        
        Args:
            points: List of (latitude, longitude) tuples
        
        Returns:
            Simplified list of points
        """
        if len(points) <= 2:
            return points
            
        # Step 1: Remove points that are too close together
        i = 0
        initial_len = len(points)
        
        while i < len(points) - 2:
            coords = (points[i][0], points[i][1])
            coords_next = (points[i + 1][0], points[i + 1][1])
            distance = geodesic(coords, coords_next).km * 1000  # Convert to meters
            
            if distance <= 60:  # Remove points that are less than 60 meters apart
                points.pop(i + 1)
            else:
                i += 1
                
        # Step 2: Remove points that don't significantly change the path
        new_points = [points[0]]  # Always keep the first point
        
        for i in range(len(points)):
            if i >= 2:
                coords = (points[i][0], points[i][1])
                coords_last = (points[i - 1][0], points[i - 1][1])
                coords_last2 = (points[i - 2][0], points[i - 2][1])
                
                # Calculate the direct distance between the current point and the point two steps back
                hypotenuse = geodesic(coords, coords_last2).km * 1000
                
                # Calculate the sum of the distances through the middle point
                cathetus_sum = (geodesic(coords, coords_last).km + geodesic(coords_last, coords_last2).km) * 1000
                
                # Calculate the difference between the direct path and the path through the middle point
                difference = cathetus_sum - hypotenuse
                
                # If the difference is significant, keep the middle point
                if difference > 0.2:
                    new_points.append(points[i - 1])
                    
        # Always keep the last point
        new_points.append(points[-1])
        
        return new_points

    def _point_line_distance(self, point: np.ndarray, line_start: np.ndarray, line_end: np.ndarray) -> float:
        """
        Calculate the perpendicular distance from a point to a line segment.
        Uses vectorized operations for better performance.
        
        Args:
            point: Point coordinates as numpy array [lat, lon]
            line_start: Start point of line segment as numpy array [lat, lon]
            line_end: End point of line segment as numpy array [lat, lon]
        
        Returns:
            Distance in degrees
        """
        # Vector from line_start to point
        v1 = point - line_start
        
        # Vector from line_start to line_end
        v2 = line_end - line_start
        
        # Length of line segment squared
        v2_squared = np.sum(v2 ** 2)
        
        if v2_squared == 0:
            return np.sqrt(np.sum(v1 ** 2))
        
        # Calculate the projection of v1 onto v2
        t = np.clip(np.dot(v1, v2) / v2_squared, 0, 1)
        
        # Calculate the perpendicular distance
        projection = line_start + t * v2
        return np.sqrt(np.sum((point - projection) ** 2)) 