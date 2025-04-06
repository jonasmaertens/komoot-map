#!/usr/bin/env python3
from src.api.server import app
from src.data.database import init_db, engine
from sqlalchemy import inspect
import logging

logger = logging.getLogger(__name__)

if __name__ == "__main__":
    # Initialize database
    init_db()
    
    # Verify database setup
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    logger.info(f"Available tables after initialization: {tables}")
    
    # Run Flask in development mode
    app.run(host="127.0.0.1", port=11000, debug=True) 