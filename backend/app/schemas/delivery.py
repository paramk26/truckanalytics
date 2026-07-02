from pydantic import BaseModel
from datetime import date


class DeliveryCreate(BaseModel):
    customer_id: int
    tanker_id: int

    driver_id: int
    helper_id: int | None = None

    customer_rate_id: int

    delivery_date: date

    trip_number: int = 1

    source_plant: str | None = None
    destination: str | None = None

    quantity_kl: float

    extra_expense: float = 0

    remarks: str | None = None


class DeliveryResponse(DeliveryCreate):
    id: int

    class Config:
        from_attributes = True