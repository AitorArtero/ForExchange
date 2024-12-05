import requests
from flask import request, Response
from functools import wraps

def proxy_request(service_url):
    def decorator(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            try:
                original_path = request.path
                # Para forex health
                if original_path == '/api/v1/forex/health':
                    path = '/health'
                # Para forex el resto
                elif '/api/v1/forex' in original_path:
                    path = original_path.replace('/api/v1/forex', '/api/v1')
               # Para rutas de autenticación y perfil
                elif '/api/v1/register' in original_path:
                    path = '/api/register'
                elif '/api/v1/login' in original_path:
                    path = '/api/login'
                elif '/api/v1/logout' in original_path:
                    path = '/api/logout'
                elif '/api/v1/profile' in original_path:
                    path = '/api/profile'
                # Para favorites
                elif '/api/v1/favorites' in original_path:
                    path = original_path.replace('/api/v1/favorites', '/api/favorites')
                else:
                    path = original_path

                target_url = f"{service_url.rstrip('/')}{path}"

                # Filtrar headers problemáticos
                headers = {
                    key: value for key, value in request.headers.items()
                    if key.lower() not in ['host', 'content-length']
                }

                response = requests.request(
                    method=request.method,
                    url=target_url,
                    headers=headers,
                    data=request.get_data(),
                    params=request.args,
                    allow_redirects=False,
                    timeout=30
                )

                return Response(
                    response.content,
                    response.status_code,
                    headers=dict(response.headers)
                )
            except requests.exceptions.RequestException as e:
                print(f"Error detailed: {str(e)}")
                return {"error": f"Service connection error: {str(e)}"}, 503
        return wrapped
    return decorator
