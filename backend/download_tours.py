#!/usr/bin/env python3
import csv
import json
import sys
from pathlib import Path
from src.api.komoot_api import KomootAPI
from src.processors.gpx_processor import GPXProcessor
from src.processors.kml_processor import KMLProcessor
from src.data.database import init_db, Tour
from sqlalchemy.orm import Session

def read_cookies(file_path: str):
    """Read cookies from a tab-separated file and convert to JSON format."""
    cookies = []
    with open(file_path, 'r') as f:
        for line in f:
            # Split by tabs and get name and value
            parts = line.strip().split('\t')
            if len(parts) >= 2:
                cookies.append({
                    'name': parts[0].strip(),
                    'value': parts[1].strip(),
                    'domain': parts[2].strip() if len(parts) > 2 else None,
                    'path': parts[3].strip() if len(parts) > 3 else None
                })
    return cookies

def main():
    # Read cookies from CSV
    cookies = read_cookies('../temp_cookies')
    if not cookies:
        print("No cookies found in temp_cookies file")
        return
    
    # Convert cookies to JSON string
    cookies_json = json.dumps(cookies)
    
    # Import and run the main function with the cookies JSON
    from main import main as process_tours
    
    # Run without limit to download all tours
    sys.argv = ['main.py', cookies_json]
    process_tours()

if __name__ == "__main__":
    main() 