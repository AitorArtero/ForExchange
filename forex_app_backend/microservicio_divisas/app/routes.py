from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from . import schemas, services
from .database import get_db

currency_router = APIRouter()

@currency_router.get("/currencies", response_model=List[schemas.CurrencyBase])
def get_currencies():
    """
    Obtiene la lista de todas las monedas disponibles
    """
    return services.get_currency_list()

@currency_router.get("/exchange-rate", response_model=schemas.CurrencyRate)
def get_rate(from_currency: str, to_currency: str, db: Session = Depends(get_db)):
    """
    Obtiene el tipo de cambio entre dos monedas
    """
    return services.get_exchange_rate(from_currency, to_currency, db)

@currency_router.get("/exchange-rate/{rate_id}", response_model=schemas.CurrencyRate)
def get_rate_by_id(rate_id: int, db: Session = Depends(get_db)):
    """
    Obtiene un tipo de cambio específico por su ID
    """
    return services.get_exchange_rate_by_id(rate_id, db)

@currency_router.get("/convert")
def convert_currency(
    from_currency: str, 
    to_currency: str, 
    amount: float,
    db: Session = Depends(get_db)
):
    """
    Convierte una cantidad de una moneda a otra
    """
    rate = services.get_exchange_rate(from_currency, to_currency, db)
    return {
        "from_currency": from_currency,
        "to_currency": to_currency,
        "amount": amount,
        "result": amount * rate.rate,
        "rate": rate.rate
    }