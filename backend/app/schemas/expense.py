from pydantic import BaseModel
from datetime import date


class ExpenseCreate(BaseModel):
    customer_id: int

    delivery_id: int | None = None

    amount: float

    expense_type: str

    description: str | None = None

    expense_date: date


class ExpenseResponse(ExpenseCreate):
    id: int

    class Config:
        from_attributes = True