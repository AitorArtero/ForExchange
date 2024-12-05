from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Crear el motor de SQLAlchemy
engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def test_connection():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
            logger.info("Conexión a la base de datos exitosa")
            return True
    except Exception as e:
        logger.error(f"Error al conectar con la base de datos: {e}")
        return False

def init_db():
    try:
        # Probar la conexión primero
        if not test_connection():
            return
        from app import models
        
        # Crear todas las tablas
        Base.metadata.create_all(bind=engine)
        logger.info("Base de datos inicializada correctamente")
        
    except Exception as e:
        logger.error(f"Error al inicializar la base de datos: {e}")