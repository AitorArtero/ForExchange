from flask import Flask
from flask_cors import CORS
from app.config.settings import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Para que se acepten las peticiones del frontend
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    from app.routes.forex_routes import forex_bp
    from app.routes.favorites_routes import auth_bp
    from app.routes.favorites_routes import favorites_bp
    
    app.register_blueprint(forex_bp, url_prefix='/api/v1/forex')
    app.register_blueprint(auth_bp, url_prefix='/api/v1')
    app.register_blueprint(favorites_bp, url_prefix='/api/v1/favorites')
    
    return app
