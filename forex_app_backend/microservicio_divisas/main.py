# main.py
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
import os
from dotenv import load_dotenv

from app.database import engine, get_db
from app.models import Base
from app.schemas import CurrencyRate, CurrencyPair
from app.services import get_exchange_rate, get_currency_list
from app.routes import currency_router

Base.metadata.create_all(bind=engine)

load_dotenv()

app = FastAPI(
    title="ForExchange Currency Service",
    description="Microservicio para gestión de divisas y tipos de cambio",
    version="1.0.0"
)

app.include_router(currency_router, prefix="/api/v1")

@app.get("/health")
def health_check():
    return {"status": "healthy"}