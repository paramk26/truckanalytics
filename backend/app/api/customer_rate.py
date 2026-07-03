from fastapi import APIRouter, Depends, HTTPException
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
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
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
        db: Session = Depends(get_db)
):
    return db.query(
        CustomerRate
    ).all()


@router.get(
    "/{customer_rate_id}",
    response_model=CustomerRateResponse
)
def get_customer_rate(
        customer_rate_id: int,
        db: Session = Depends(get_db)
):
    customer_rate = db.query(CustomerRate).filter(
        CustomerRate.id == customer_rate_id
    ).first()

    if not customer_rate:
        raise HTTPException(status_code=404, detail="Customer rate not found")

    return customer_rate


@router.put(
    "/{customer_rate_id}",
    response_model=CustomerRateResponse
)
def update_customer_rate(
        customer_rate_id: int,
        customer_rate: CustomerRateCreate,
        db: Session = Depends(get_db),
        current_user=Depends(admin_required)
):
    db_rate = db.query(CustomerRate).filter(
        CustomerRate.id == customer_rate_id
    ).first()

    if not db_rate:
        raise HTTPException(status_code=404, detail="Customer rate not found")

    for key, value in customer_rate.model_dump().items():
        setattr(db_rate, key, value)

    db.commit()
    db.refresh(db_rate)

    return db_rate


@router.delete(
    "/{customer_rate_id}"
)
def delete_customer_rate(
        customer_rate_id: int,
        db: Session = Depends(get_db),
        current_user=Depends(admin_required)
):
    db_rate = db.query(CustomerRate).filter(
        CustomerRate.id == customer_rate_id
    ).first()

    if not db_rate:
        raise HTTPException(status_code=404, detail="Customer rate not found")

    db.delete(db_rate)
    db.commit()

    return {"message": "Customer rate deleted successfully"}
