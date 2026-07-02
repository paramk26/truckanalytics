from pydantic import BaseModel
from datetime import date


class InvoiceCreate(BaseModel):
    customer_id: int

    invoice_number: str

    invoice_type: str

    start_date: date
    end_date: date

    subtotal: float = 0
    expense_total: float = 0
    gst_amount: float = 0
    grand_total: float = 0

    payment_status: str = "PENDING"

    generated_date: date

    remarks: str | None = None


class InvoiceResponse(InvoiceCreate):
    id: int

    class Config:
        from_attributes = True