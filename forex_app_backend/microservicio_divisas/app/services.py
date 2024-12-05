import requests
import os
from datetime import datetime
from fastapi import HTTPException
from sqlalchemy.orm import Session
from . import models, schemas

ALPHAVANTAGE_API_KEY = os.getenv("ALPHAVANTAGE_API_KEY")
BASE_URL = "https://www.alphavantage.co/query"

def get_exchange_rate(from_currency: str, to_currency: str, db: Session):
    # Primero intentamos obtener de la base de datos
    cached_rate = db.query(models.ExchangeRate).filter(
        models.ExchangeRate.from_currency == from_currency,
        models.ExchangeRate.to_currency == to_currency
    ).first()

    # Si el dato existe y tiene menos de 1 hora, lo devolvemos
    if cached_rate and (datetime.utcnow() - cached_rate.timestamp).seconds < 3600:
        return cached_rate

    # Si no, consultamos a AlphaVantage
    params = {
        "function": "CURRENCY_EXCHANGE_RATE",
        "from_currency": from_currency,
        "to_currency": to_currency,
        "apikey": ALPHAVANTAGE_API_KEY
    }

    response = requests.get(BASE_URL, params=params)
    
    if response.status_code != 200:
        raise HTTPException(status_code=503, detail="External API error")

    data = response.json()
    
    if "Realtime Currency Exchange Rate" not in data:
        raise HTTPException(status_code=404, detail="Exchange rate not found")
    
    rate_data = data["Realtime Currency Exchange Rate"]
    
    # Actualizar o crear nuevo registro en la base de datos
    new_rate = models.ExchangeRate(
        from_currency=from_currency,
        to_currency=to_currency,
        rate=float(rate_data["5. Exchange Rate"]),
        timestamp=datetime.utcnow()
    )
    
    db.add(new_rate)
    db.commit()
    db.refresh(new_rate)
    
    return new_rate

def get_exchange_rate_by_id(rate_id: int, db: Session):
    """
    Obtiene un tipo de cambio específico por su ID
    """
    exchange_rate = db.query(models.ExchangeRate).filter(
        models.ExchangeRate.id == rate_id
    ).first()
    
    if not exchange_rate:
        raise HTTPException(status_code=404, detail="Exchange rate not found")
    
    # Si el tipo de cambio tiene más de 1 hora, actualizamos
    if (datetime.utcnow() - exchange_rate.timestamp).seconds >= 3600:
        # Obtener tipo de cambio actualizado
        updated_rate = get_exchange_rate(
            exchange_rate.from_currency,
            exchange_rate.to_currency,
            db
        )
        return updated_rate
    
    return exchange_rate

def get_currency_list():
    return [
        {"code": "USD", "name": "Dólar Estadounidense", "region": "América del Norte", "country": "Estados Unidos"},
        {"code": "EUR", "name": "Euro", "region": "Europa", "country": "Zona Euro"},
        {"code": "JPY", "name": "Yen Japonés", "region": "Asia", "country": "Japón"},
        {"code": "GBP", "name": "Libra Esterlina", "region": "Europa", "country": "Reino Unido"},
        {"code": "CHF", "name": "Franco Suizo", "region": "Europa", "country": "Suiza"},
        {"code": "CAD", "name": "Dólar Canadiense", "region": "América del Norte", "country": "Canadá"},
        {"code": "AUD", "name": "Dólar Australiano", "region": "Oceanía", "country": "Australia"},
        {"code": "NZD", "name": "Dólar Neozelandés", "region": "Oceanía", "country": "Nueva Zelanda"},
        {"code": "SEK", "name": "Corona Sueca", "region": "Europa", "country": "Suecia"},
        {"code": "NOK", "name": "Corona Noruega", "region": "Europa", "country": "Noruega"},
        {"code": "DKK", "name": "Corona Danesa", "region": "Europa", "country": "Dinamarca"},
        {"code": "SGD", "name": "Dólar de Singapur", "region": "Asia", "country": "Singapur"},
        {"code": "HKD", "name": "Dólar de Hong Kong", "region": "Asia", "country": "Hong Kong"},
        {"code": "MXN", "name": "Peso Mexicano", "region": "América del Norte", "country": "México"},
        {"code": "BRL", "name": "Real Brasileño", "region": "América del Sur", "country": "Brasil"},
        {"code": "ZAR", "name": "Rand Sudafricano", "region": "África", "country": "Sudáfrica"},
        {"code": "INR", "name": "Rupia India", "region": "Asia", "country": "India"},
        {"code": "CNY", "name": "Yuan Chino", "region": "Asia", "country": "China"},
        {"code": "RUB", "name": "Rublo Ruso", "region": "Europa", "country": "Rusia"},
        {"code": "TRY", "name": "Lira Turca", "region": "Europa/Asia", "country": "Turquía"},
        {"code": "KRW", "name": "Won Surcoreano", "region": "Asia", "country": "Corea del Sur"},
        {"code": "THB", "name": "Baht Tailandés", "region": "Asia", "country": "Tailandia"},
        {"code": "IDR", "name": "Rupia Indonesia", "region": "Asia", "country": "Indonesia"},
        {"code": "AED", "name": "Dírham de los Emiratos Árabes Unidos", "region": "Asia", "country": "Emiratos Árabes Unidos"},
        {"code": "SAR", "name": "Riyal Saudí", "region": "Asia", "country": "Arabia Saudita"}
    ]