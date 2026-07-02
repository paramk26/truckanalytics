from pydantic import BaseModel
from datetime import date


class TankerCreate(BaseModel):
    registration_number: str
    capacity_kl: int

    make: str | None = None
    model: str | None = None

    manufacturing_year: int | None = None

    chassis_number: str | None = None
    engine_number: str | None = None

    assigned_plant: str | None = None

    insurance_expiry: date | None = None
    pollution_expiry: date | None = None
    road_tax_expiry: date | None = None
    fitness_expiry: date | None = None
    permit_expiry: date | None = None

    purchase_date: date | None = None
    purchase_price: float | None = None


class TankerResponse(TankerCreate):
    id: int
    status: str

    class Config:
        from_attributes = True