# Gunicorn configuration for Raspberry Pi
import os

# Server socket
bind = "127.0.0.1:11000"

# Worker processes - single worker for Raspberry Pi
workers = 1
# Using sync worker for Flask compatibility
worker_class = "sync"
threads = 1

# Explicitly disable reloading for production
reload = False

# Timeouts
timeout = 120
keepalive = 5

# Logging
accesslog = "logs/access.log"
errorlog = "logs/error.log"
loglevel = "info"

# Create logs directory if it doesn't exist
os.makedirs("logs", exist_ok=True) 