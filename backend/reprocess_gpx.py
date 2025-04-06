#!/usr/bin/env python3
import os
from pathlib import Path
import argparse
from src.processors.gpx_processor import GPXProcessor
from src.processors.kml_processor import KMLProcessor
from src.utils.config import GPX_DIR, KML_SIMPLE_DIR
from src.data.database import init_db, get_db
from src.data.models import Tour

def reprocess_gpx_files(force=False):
    """
    Reprocess all existing GPX files with the new simplification logic.
    
    Args:
        force: If True, reprocess all files even if they already have KML files
    """
    # Initialize processors
    gpx_processor = GPXProcessor()
    kml_processor = KMLProcessor()
    
    # Get database connection
    init_db()
    db = next(get_db())
    
    # Get all GPX files
    gpx_files = list(GPX_DIR.glob("*.gpx"))
    print(f"Found {len(gpx_files)} GPX files to process")
    
    # Process each GPX file
    for gpx_file in gpx_files:
        tour_id = gpx_file.stem
        
        # Check if KML already exists
        kml_file = KML_SIMPLE_DIR / f"{tour_id}.kml"
        if kml_file.exists() and not force:
            print(f"KML file for tour {tour_id} already exists, skipping...")
            continue
        
        print(f"Processing tour {tour_id}...")
        
        try:
            # Read GPX data
            with open(gpx_file, "r", encoding="utf-8") as f:
                gpx_data = f.read()
            
            # Process GPX data
            parsed_data = gpx_processor.process_gpx(gpx_data, tour_id)
            if not parsed_data:
                print(f"Failed to process GPX data for tour {tour_id}")
                continue
            
            # Get points
            points = parsed_data["points"]
            
            # Simplify points with new algorithm
            simplified_points = gpx_processor.simplify_points(points)
            
            # Get tour data from database
            tour = db.query(Tour).filter(Tour.komoot_id == tour_id).first()
            if not tour:
                print(f"Tour {tour_id} not found in database, skipping...")
                continue
            
            # Create tour data dictionary
            tour_data = {
                "id": tour.komoot_id,
                "name": tour.name,
                "date": tour.date.isoformat(),
                "distance": tour.distance,
                "duration": tour.duration,
                "time_in_motion": tour.time_in_motion,
                "elevation_up": tour.elevation_gain,
                "elevation_down": tour.elevation_loss,
                "sport": tour.sport_type
            }
            
            # Create and save simplified KML
            kml_path = kml_processor.create_and_save_kml(simplified_points, tour_data, tour_id)
            
            # Update tour record with new KML path
            tour.kml_path = str(kml_path)
            db.commit()
            
            print(f"Tour {tour_id} reprocessed successfully")
            
        except Exception as e:
            print(f"Error processing tour {tour_id}: {e}")
    
    print("Reprocessing complete!")

def main():
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Reprocess GPX files with new simplification logic')
    parser.add_argument('--force', action='store_true', help='Force reprocessing of all files')
    args = parser.parse_args()
    
    # Reprocess GPX files
    reprocess_gpx_files(force=args.force)

if __name__ == "__main__":
    main() 