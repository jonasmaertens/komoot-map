from typing import List, Tuple, Dict, Any
import xml.etree.ElementTree as ET
from pathlib import Path
from ..utils.config import KML_SIMPLE_DIR

class KMLProcessor:
    def __init__(self):
        self.kml_simple_dir = KML_SIMPLE_DIR
        self.kml_simple_dir.mkdir(parents=True, exist_ok=True)
    
    def create_and_save_kml(self, points: List[Tuple[float, float]], metadata: Dict[str, Any], tour_id: str) -> Path:
        """
        Create a simplified KML file from points and metadata.
        
        Args:
            points: List of (latitude, longitude) tuples
            metadata: Tour metadata
            tour_id: Tour ID
            
        Returns:
            Path to the saved KML file
        """
        # Create KML document
        kml = ET.Element("kml")
        kml.set("xmlns", "http://earth.google.com/kml/2.0")
        
        # Create document
        doc = ET.SubElement(kml, "Document")
        doc.set("xmlns", "http://earth.google.com/kml/2.0")
        
        # Add name
        name = ET.SubElement(doc, "name")
        name.text = f"{tour_id}.gpx"
        
        # Add visibility
        visibility = ET.SubElement(doc, "visibility")
        visibility.text = "1"
        
        # Create folder
        folder = ET.SubElement(doc, "Folder")
        
        # Add folder name
        folder_name = ET.SubElement(folder, "name")
        folder_name.text = "Tracks"
        
        # Create placemark
        placemark = ET.SubElement(folder, "Placemark")
        
        # Add placemark name
        placemark_name = ET.SubElement(placemark, "name")
        placemark_name.text = metadata.get("name", "Tour")
        
        # Create line string
        line_string = ET.SubElement(placemark, "LineString")
        
        # Add coordinates
        coordinates = ET.SubElement(line_string, "coordinates")
        coordinates.text = " ".join([f"{lon},{lat}" for lat, lon in points])
        
        # Convert to string
        kml_data = ET.tostring(kml, encoding="unicode")
        
        # Save KML file
        kml_file = self.kml_simple_dir / f"{tour_id}.kml"
        kml_file.write_text(kml_data)
        
        return kml_file 