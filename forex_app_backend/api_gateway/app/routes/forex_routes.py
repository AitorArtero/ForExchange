from flask import Blueprint, request
from app.utils.proxy import proxy_request
from app.config.settings import Config

forex_bp = Blueprint('forex', __name__)

@forex_bp.route('/health')
@proxy_request(Config.FOREX_SERVICE_URL)
def health():
    pass

@forex_bp.route('/currencies')
@proxy_request(Config.FOREX_SERVICE_URL)
def get_currencies():
    pass

@forex_bp.route('/exchange-rate')
@proxy_request(Config.FOREX_SERVICE_URL)
def get_exchange_rate():
    pass

@forex_bp.route('/exchange-rate/<int:rate_id>')
@proxy_request(Config.FOREX_SERVICE_URL)
def get_exchange_rate_by_id(rate_id):
    pass

@forex_bp.route('/convert')
@proxy_request(Config.FOREX_SERVICE_URL)
def convert_amount():
    pass
