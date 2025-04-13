from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.pool import QueuePool
from pathlib import Path
import logging
from ..utils.config import ROOT_DIR
from .models import Base, Tour  # Import Base and Tour from models

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database directory setup
DB_DIR = ROOT_DIR / "data" / "db"  # Changed to include 'db' subdirectory
DB_DIR.mkdir(parents=True, exist_ok=True)
DATABASE_URL = f"sqlite:///{DB_DIR}/tours.db"

logger.info(f"Database path: {DB_DIR}/tours.db")
logger.info(f"Database URL: {DATABASE_URL}")
logger.info(f"Database directory exists: {DB_DIR.exists()}")
logger.info(f"Database file exists: {(DB_DIR / 'tours.db').exists()}")

# Create engine with pool settings
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},  # Required for SQLite
    poolclass=QueuePool,
    pool_size=10,
    max_overflow=10,
    pool_timeout=10,
    pool_recycle=300,
    echo=False  # Enable SQL logging
)

# Create session factory bound to our engine
Session = scoped_session(sessionmaker(bind=engine))

def init_db():
    """Initialize database, create tables."""
    logger.info("Initializing database...")
    from .models import Base
    Base.metadata.create_all(bind=engine)
    logger.info("Database initialized")
    
    # Verify tables
    from sqlalchemy import inspect
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    logger.info(f"Available tables: {tables}")

def get_db():
    """Get a database session."""
    db = Session()
    try:
        yield db
    finally:
        db.close() 