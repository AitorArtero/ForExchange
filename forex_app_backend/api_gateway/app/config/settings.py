import os

class Config:
    FOREX_SERVICE_URL = os.getenv('FOREX_SERVICE_URL', 'http://forex_service:8001')
    FAVORITES_SERVICE_URL = os.getenv('FAVORITES_SERVICE_URL', 'http://favorites_service:3000')