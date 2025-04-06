import csv
import json
import os
import sys
from typing import Dict, List

def read_cookies_from_csv(file_path: str) -> List[Dict[str, str]]:
    cookies = []
    with open(file_path, 'r') as f:
        reader = csv.reader(f, delimiter='\t')
        for row in reader:
            if len(row) >= 2:  # Ensure we have at least name and value
                cookie = {
                    'name': row[0],
                    'value': row[1],
                    'domain': row[2] if len(row) > 2 else '',
                    'path': row[3] if len(row) > 3 else '/'
                }
                cookies.append(cookie)
    return cookies

def start_server():
    print("Starting the server...")
    # Get absolute path to backend directory
    backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'backend'))
    # Change to the backend directory
    os.chdir(backend_dir)
    # Import and run the Flask app
    sys.path.append('.')  # Add current directory to Python path
    from src.api.server import app
    app.run(host='0.0.0.0', port=11000, debug=True, use_reloader=False)  # Disable reloader

def main():
    # Store original working directory
    original_dir = os.getcwd()
    
    try:
        # Read cookies from CSV
        cookies = read_cookies_from_csv('temp_cookies.csv')
        
        # Convert to JSON
        cookies_json = json.dumps(cookies, indent=2)
        
        # Save to a temporary JSON file
        with open('temp_cookies.json', 'w') as f:
            f.write(cookies_json)
        
        print("Cookies converted and saved to temp_cookies.json")
        print(f"Found {len(cookies)} cookies")
        
        # Start the server
        start_server()
    finally:
        # Restore original working directory
        os.chdir(original_dir)

if __name__ == "__main__":
    main() 