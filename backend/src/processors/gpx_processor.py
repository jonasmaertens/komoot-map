import gpxdata
from typing import List, Tuple, Dict, Any
from pathlib import Path
import xml.etree.ElementTree as ET
import numpy as np
from datetime import datetime
from ..processors.bbox_calculator import calculate_bbox, calculate_center
from ..utils.config import GPX_DIR

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

    def simplify_points(self, points: List[Tuple[float, float]], tolerance: float = 0.0001) -> List[Tuple[float, float]]:
        """
        Simplify a list of points using the Douglas-Peucker algorithm.
        
        The Douglas-Peucker algorithm recursively subdivides a curve and removes points
        that don't contribute significantly to the curve's shape. The tolerance parameter
        determines how aggressive the simplification is:
        - Smaller values (e.g., 0.0001) preserve more detail
        - Larger values (e.g., 0.001) produce more aggressive simplification
        
        Args:
            points: List of (latitude, longitude) tuples
            tolerance: Maximum allowed distance between the original curve and the simplified curve
                      in degrees (approximately 111 meters per degree)
        
        Returns:
            Simplified list of points
        """
        if len(points) <= 2:
            return points
        
        # Convert points to numpy array for faster computation
        points_array = np.array(points)
        
        # Find the point with the maximum distance from the line
        max_dist = 0
        max_idx = 0
        
        # Calculate distances for all points except endpoints
        for i in range(1, len(points) - 1):
            dist = self._point_line_distance(points_array[i], points_array[0], points_array[-1])
            if dist > max_dist:
                max_dist = dist
                max_idx = i
        
        # If the maximum distance is greater than the tolerance, recursively simplify
        if max_dist > tolerance:
            left = self.simplify_points(points[:max_idx + 1], tolerance)
            right = self.simplify_points(points[max_idx:], tolerance)
            return left[:-1] + right
        else:
            return [points[0], points[-1]]

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