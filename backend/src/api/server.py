from flask import Flask, jsonify, send_file, request, send_from_directory
from flask_cors import CORS
from pathlib import Path
from sqlalchemy import and_
from ..data.database import get_db, init_db
from ..data.models import Tour
from ..utils.config import KML_DIR, KML_SIMPLE_DIR
import os

app = Flask(__name__, static_folder='static')
CORS(app)  # Enable CORS for all routes

# Serve static files (frontend)
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/tours', methods=['GET'])
def get_tours():
    """Get tours that intersect with the given bounding box."""
    bbox = request.args.get('bbox', '')
    if not bbox:
        return jsonify({"error": "Missing bbox parameter"}), 400
    
    try:
        # Parse bbox (min_lon,min_lat,max_lon,max_lat)
        min_lon, min_lat, max_lon, max_lat = map(float, bbox.split(','))
    except ValueError:
        return jsonify({"error": "Invalid bbox format"}), 400
    
    # Get database session
    db = next(get_db())
    
    # Query tours that intersect with the bbox
    tours = db.query(Tour).filter(
        and_(
            Tour.bbox_min_lon <= max_lon,
            Tour.bbox_max_lon >= min_lon,
            Tour.bbox_min_lat <= max_lat,
            Tour.bbox_max_lat >= min_lat
        )
    ).all()
    
    # Convert to JSON
    result = []
    for tour in tours:
        result.append({
            "id": tour.komoot_id,
            "komoot_id": tour.komoot_id,
            "name": tour.name,
            "date": tour.date.isoformat() if tour.date else None,
            "distance": tour.distance,
            "duration": tour.duration,
            "elevation_gain": tour.elevation_gain,
            "sport_type": tour.sport_type,
            "center_lat": tour.center_lat,
            "center_lon": tour.center_lon,
            "bbox": {
                "min_lat": tour.bbox_min_lat,
                "min_lon": tour.bbox_min_lon,
                "max_lat": tour.bbox_max_lat,
                "max_lon": tour.bbox_max_lon
            }
        })
    
    return jsonify(result)

@app.route('/api/all-tours', methods=['GET'])
def get_all_tours():
    """Get all tours without bbox filtering."""
    # Get database session
    db = next(get_db())
    
    # Query all tours
    tours = db.query(Tour).all()
    
    # Convert to JSON
    result = []
    for tour in tours:
        result.append({
            "id": tour.komoot_id,
            "komoot_id": tour.komoot_id,
            "name": tour.name,
            "date": tour.date.isoformat() if tour.date else None,
            "distance": tour.distance,
            "duration": tour.duration,
            "elevation_gain": tour.elevation_gain,
            "sport_type": tour.sport_type,
            "center_lat": tour.center_lat,
            "center_lon": tour.center_lon,
            "bbox": {
                "min_lat": tour.bbox_min_lat,
                "min_lon": tour.bbox_min_lon,
                "max_lat": tour.bbox_max_lat,
                "max_lon": tour.bbox_max_lon
            }
        })
    
    return jsonify(result)

@app.route('/api/tours/<string:tour_id>', methods=['GET'])
def get_tour(tour_id):
    """Get detailed information about a specific tour."""
    db = next(get_db())
    tour = db.query(Tour).filter(Tour.komoot_id == tour_id).first()
    
    if not tour:
        return jsonify({"error": "Tour not found"}), 404
    
    # Convert metadata to dict if it exists
    metadata_dict = None
    if hasattr(tour, 'metadata') and tour.metadata is not None:
        if isinstance(tour.metadata, dict):
            metadata_dict = tour.metadata
        else:
            # Try to convert to dict if it's a string or other format
            try:
                metadata_dict = dict(tour.metadata)
            except (TypeError, ValueError):
                # If conversion fails, just use None
                metadata_dict = None
    
    return jsonify({
        "id": tour.komoot_id,
        "komoot_id": tour.komoot_id,
        "name": tour.name,
        "date": tour.date.isoformat() if tour.date else None,
        "distance": tour.distance,
        "duration": tour.duration,
        "elevation_gain": tour.elevation_gain,
        "sport_type": tour.sport_type,
        "center_lat": tour.center_lat,
        "center_lon": tour.center_lon,
        "bbox": {
            "min_lat": tour.bbox_min_lat,
            "min_lon": tour.bbox_min_lon,
            "max_lat": tour.bbox_max_lat,
            "max_lon": tour.bbox_max_lon
        },
        "metadata": metadata_dict
    })

@app.route('/api/tours/<string:tour_id>/kml', methods=['GET'])
def get_tour_kml(tour_id):
    """Get KML data for a specific tour."""
    simplified = request.args.get('simplified', 'false').lower() == 'true'
    
    db = next(get_db())
    try:
        tour = db.query(Tour).filter(Tour.komoot_id == tour_id).first()
        
        if not tour:
            return jsonify({"error": "Tour not found"}), 404
        
        # Get KML file path
        kml_path = Path(tour.kml_path)
        
        if not kml_path.exists():
            return jsonify({"error": "KML file not found"}), 404
        
        return send_file(kml_path, mimetype='application/vnd.google-earth.kml+xml')
    finally:
        db.close()

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get statistics about all tours."""
    db = next(get_db())
    try:
        # Get total number of tours
        total_tours = db.query(Tour).count()
        
        # Get total distance
        total_distance = db.query(Tour.distance).filter(Tour.distance.isnot(None)).all()
        total_distance = sum(d[0] for d in total_distance if d[0] is not None)
        
        # Get total duration
        total_duration = db.query(Tour.duration).filter(Tour.duration.isnot(None)).all()
        total_duration = sum(d[0] for d in total_duration if d[0] is not None)
        
        # Get total elevation gain
        total_elevation = db.query(Tour.elevation_gain).filter(Tour.elevation_gain.isnot(None)).all()
        total_elevation = sum(d[0] for d in total_elevation if d[0] is not None)
        
        # Get sport types
        sport_types = db.query(Tour.sport_type).filter(Tour.sport_type.isnot(None)).distinct().all()
        sport_types = [s[0] for s in sport_types if s[0] is not None]
        
        return jsonify({
            "total_tours": total_tours,
            "total_distance": total_distance,
            "total_duration": total_duration,
            "total_elevation": total_elevation,
            "sport_types": sport_types
        })
    finally:
        db.close()

def run_server(host='127.0.0.1', port=11000):
    """Run the Flask server."""
    init_db()
    # Use single worker thread for Raspberry Pi
    app.run(host=host, port=port, threaded=False) 