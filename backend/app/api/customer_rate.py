from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.customer_rate import CustomerRate

from app.schemas.customer_rate import (
    CustomerRateCreate,
    CustomerRateResponse
)
from app.auth.dependencies import admin_required

router = APIRouter(
    prefix="/customer-rates",
    tags=["Customer Rates"]
)


@router.post(
    "/",
    response_model=CustomerRateResponse
)
def create_customer_rate(
    customer_rate: CustomerRateCreate,
    db: Session = Depends(get_db)
):
    db_rate = CustomerRate(
        **customer_rate.model_dump()
    )

    db.add(db_rate)
    db.commit()
    db.refresh(db_rate)

    return db_rate


@router.get(
    "/",
    response_model=list[CustomerRateResponse]
)
def get_customer_rates(
        db: Session = Depends(get_db),
        current_user=Depends(admin_required)
):
    return db.query(
        CustomerRate
    ).all()