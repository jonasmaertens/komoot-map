#!/usr/bin/env python3
import json
import sys
import argparse
from pathlib import Path
from typing import List, Dict
from datetime import datetime

from src.api.komoot_api import KomootAPI
from src.data.database import init_db, get_db
from src.data.models import Tour
from src.processors.gpx_processor import GPXProcessor
from src.processors.kml_processor import KMLProcessor
from src.utils.config import GPX_DIR, KML_SIMPLE_DIR

def process_tour(api: KomootAPI, tour_data: Dict, db) -> None:
    """Process a single tour and save it to the database."""
    tour_id = tour_data["id"]
    
    # Check if tour already exists
    existing_tour = db.query(Tour).filter(Tour.komoot_id == tour_id).first()
    if existing_tour:
        print(f"Tour {tour_id} already exists, skipping...")
        return
    
    # Get GPX data
    gpx_data = api.get_tour_gpx(tour_id)
    
    # Save GPX file
    gpx_path = GPX_DIR / f"{tour_id}.gpx"
    gpx_path.write_text(gpx_data)
    
    # Process GPX data
    gpx_processor = GPXProcessor()
    parsed_data = gpx_processor.process_gpx(gpx_data, tour_id)
    if not parsed_data:
        raise ValueError(f"Failed to process GPX data for tour {tour_id}")
    
    # Get points and metadata
    points = parsed_data["points"]
    bbox = parsed_data["bbox"]
    center = parsed_data["center"]
    
    # Simplify points
    simplified_points = gpx_processor.simplify_points(points, tolerance=0.0005)
    
    # Create and save simplified KML
    kml_processor = KMLProcessor()
    kml_path = kml_processor.create_and_save_kml(simplified_points, tour_data, tour_id)
    
    # Parse date from API response
    date_str = tour_data.get("date", "")
    if not date_str:
        raise ValueError(f"No date found for tour {tour_id}")
    
    # Remove 'Z' if it exists
    if date_str.endswith("Z"):
        date_str = date_str[:-1]
    
    try:
        date = datetime.fromisoformat(date_str)
    except ValueError:
        raise ValueError(f"Could not parse date '{date_str}' for tour {tour_id}")
    
    # Create tour record
    tour = Tour(
        komoot_id=tour_id,
        name=tour_data.get("name", f"Tour {tour_id}"),  # Use API data for name
        date=date,
        distance=tour_data.get("distance", 0),
        duration=tour_data.get("duration", 0),
        time_in_motion=tour_data.get("time_in_motion", 0),
        elevation_gain=tour_data.get("elevation_up", 0),
        elevation_loss=tour_data.get("elevation_down", 0),
        sport_type=tour_data.get("sport", ""),
        bbox_min_lat=bbox[0],
        bbox_min_lon=bbox[1],
        bbox_max_lat=bbox[2],
        bbox_max_lon=bbox[3],
        center_lat=center[0],
        center_lon=center[1],
        gpx_path=str(gpx_path),
        kml_path=str(kml_path)
    )
    
    db.add(tour)
    db.commit()
    print(f"Tour {tour_id} processed and saved successfully")

def main():
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Process Komoot tours')
    parser.add_argument('cookies_json', help='JSON string containing cookies')
    parser.add_argument('--limit', type=int, help='Limit the number of tours to process')
    args = parser.parse_args()
    
    # Parse cookies from command line
    cookies = json.loads(args.cookies_json)
    
    # Initialize database
    init_db()
    
    # Initialize API client
    api = KomootAPI(cookies)
    
    # Get total number of tours
    total_tours = api.get_total_tours()
    print(f"Found {total_tours} tours")
    
    # Get tours (with limit if specified)
    tours = api.get_tours(args.limit if args.limit else total_tours)
    print(f"Processing {len(tours)} tours")
    
    # Process each tour
    db = next(get_db())
    for tour in tours:
        try:
            process_tour(api, tour, db)
        except Exception as e:
            print(f"Error processing tour {tour['id']}: {e}")
    
    print("Done!")

if __name__ == "__main__":
    main() 