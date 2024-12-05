from flask import Blueprint, request
from app.utils.proxy import proxy_request
from app.config.settings import Config

auth_bp = Blueprint('auth', __name__)
favorites_bp = Blueprint('favorites', __name__)

# Rutas de autenticación y perfil (sin /favorites)
@auth_bp.route('/register', methods=['POST'])
@proxy_request(Config.FAVORITES_SERVICE_URL)
def register():
    pass

@auth_bp.route('/login', methods=['POST'])
@proxy_request(Config.FAVORITES_SERVICE_URL)
def login():
    pass

@auth_bp.route('/logout', methods=['POST'])
@proxy_request(Config.FAVORITES_SERVICE_URL)
def logout():
    pass

@auth_bp.route('/profile', methods=['GET'])
@proxy_request(Config.FAVORITES_SERVICE_URL)
def get_profile():
    pass

@auth_bp.route('/profile', methods=['DELETE'])
@proxy_request(Config.FAVORITES_SERVICE_URL)
def delete_profile():
    pass

# Rutas de favoritos (con /favorites)
@favorites_bp.route('', methods=['GET'])
@proxy_request(Config.FAVORITES_SERVICE_URL)
def get_favorites():
    pass

@favorites_bp.route('', methods=['POST'])
@proxy_request(Config.FAVORITES_SERVICE_URL)
def add_favorite():
    pass

@favorites_bp.route('/<favorite_id>', methods=['DELETE'])
@proxy_request(Config.FAVORITES_SERVICE_URL)
def delete_favorite(favorite_id):
    pass
