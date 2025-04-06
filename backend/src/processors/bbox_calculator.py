from typing import Tuple, List
from geopy.distance import geodesic

def calculate_bbox(points: List[Tuple[float, float]]) -> Tuple[float, float, float, float]:
    """
    Calculate bounding box for a list of points.
    Returns (min_lat, min_lon, max_lat, max_lon)
    """
    if not points:
        raise ValueError("No points provided")
    
    lats, lons = zip(*points)
    return min(lats), min(lons), max(lats), max(lons)

def calculate_center(points: List[Tuple[float, float]]) -> Tuple[float, float]:
    """
    Calculate center point for a list of points.
    Returns (center_lat, center_lon)
    """
    if not points:
        raise ValueError("No points provided")
    
    lats, lons = zip(*points)
    return sum(lats) / len(lats), sum(lons) / len(lons)

def bbox_intersects(bbox1: Tuple[float, float, float, float], 
                   bbox2: Tuple[float, float, float, float]) -> bool:
    """
    Check if two bounding boxes intersect.
    """
    min_lat1, min_lon1, max_lat1, max_lon1 = bbox1
    min_lat2, min_lon2, max_lat2, max_lon2 = bbox2
    
    return not (max_lon1 < min_lon2 or
               min_lon1 > max_lon2 or
               max_lat1 < min_lat2 or
               min_lat1 > max_lat2)

def bbox_contains_point(bbox: Tuple[float, float, float, float], 
                       point: Tuple[float, float]) -> bool:
    """
    Check if a point is within a bounding box.
    """
    min_lat, min_lon, max_lat, max_lon = bbox
    lat, lon = point
    
    return (min_lat <= lat <= max_lat and
            min_lon <= lon <= max_lon) 