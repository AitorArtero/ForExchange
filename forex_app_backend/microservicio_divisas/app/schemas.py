from pydantic import BaseModel
from datetime import datetime

class CurrencyBase(BaseModel):
    code: str
    name: str
    region: str
    country: str

class CurrencyCreate(CurrencyBase):
    pass

class CurrencyRate(BaseModel):
    id: int
    from_currency: str
    to_currency: str
    rate: float
    timestamp: datetime

    class Config:
        from_attributes = True

class CurrencyPair(BaseModel):
    from_currency: str
    to_currency: str