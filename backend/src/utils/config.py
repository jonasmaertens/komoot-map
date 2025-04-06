import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Base paths
ROOT_DIR = Path(__file__).parent.parent.parent
DATA_DIR = ROOT_DIR / "data"

# Data directories
GPX_DIR = DATA_DIR / "gpx"
KML_DIR = DATA_DIR / "kml"
KML_SIMPLE_DIR = DATA_DIR / "kml_simple"

# Ensure directories exist
for directory in [GPX_DIR, KML_DIR, KML_SIMPLE_DIR]:
    directory.mkdir(parents=True, exist_ok=True)

# Komoot configuration
KOMOOT_USER_ID = os.getenv("KOMOOT_USER_ID")
if not KOMOOT_USER_ID:
    raise ValueError("KOMOOT_USER_ID environment variable is required")

# API configuration
API_RATE_LIMIT = 0.5  # seconds between requests 