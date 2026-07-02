from pydantic import BaseModel
from datetime import date


class PaymentCreate(BaseModel):
    invoice_id: int

    payment_date: date

    amount_received: float

    payment_method: str

    reference_number: str | None = None

    remarks: str | None = None


class PaymentResponse(PaymentCreate):
    id: int

    class Config:
        from_attributes = True