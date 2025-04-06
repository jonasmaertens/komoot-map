from datetime import datetime
from typing import Optional
from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Tour(Base):
    __tablename__ = 'tours'

    # Primary key
    komoot_id = Column(String, primary_key=True)
    
    # Basic tour information
    name = Column(String)
    date = Column(DateTime)
    sport_type = Column(String)
    
    # Tour statistics
    distance = Column(Float)  # in meters
    duration = Column(Integer)  # in seconds
    time_in_motion = Column(Integer)  # in seconds
    elevation_gain = Column(Float)  # in meters
    elevation_loss = Column(Float)  # in meters
    
    # Geographic data
    center_lat = Column(Float)
    center_lon = Column(Float)
    bbox_min_lat = Column(Float)
    bbox_min_lon = Column(Float)
    bbox_max_lat = Column(Float)
    bbox_max_lon = Column(Float)
    
    # File paths
    gpx_path = Column(String)
    kml_path = Column(String)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Tour(komoot_id={self.komoot_id}, name='{self.name}', date='{self.date}')>" 