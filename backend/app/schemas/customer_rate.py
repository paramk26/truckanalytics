from pydantic import BaseModel


class CustomerRateCreate(BaseModel):
    customer_id: int
    tanker_capacity: int
    plant_name: str
    rate: float


class CustomerRateResponse(CustomerRateCreate):
    id: int

    class Config:
        from_attributes = True