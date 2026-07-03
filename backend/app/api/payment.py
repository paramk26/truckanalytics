from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.payment import Payment

from app.schemas.payment import (
    PaymentCreate,
    PaymentResponse
)
from app.auth.dependencies import admin_required
router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)


@router.post(
    "/",
    response_model=PaymentResponse
)
def create_payment(
    payment: PaymentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    db_payment = Payment(
        **payment.model_dump()
    )

    db.add(db_payment)

    db.commit()

    db.refresh(db_payment)

    return db_payment


@router.get(
    "/",
    response_model=list[PaymentResponse]
)
def get_payments(
    db: Session = Depends(get_db)
):
    return db.query(
        Payment
    ).all()


@router.get(
    "/{payment_id}",
    response_model=PaymentResponse
)
def get_payment(
    payment_id: int,
    db: Session = Depends(get_db)
):
    payment = db.query(
        Payment
    ).filter(
        Payment.id == payment_id
    ).first()

    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    return payment


@router.put(
    "/{payment_id}",
    response_model=PaymentResponse
)
def update_payment(
    payment_id: int,
    payment: PaymentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    db_payment = db.query(Payment).filter(Payment.id == payment_id).first()

    if not db_payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    for key, value in payment.model_dump().items():
        setattr(db_payment, key, value)

    db.commit()
    db.refresh(db_payment)

    return db_payment


@router.delete(
    "/{payment_id}"
)
def delete_payment(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    db_payment = db.query(Payment).filter(Payment.id == payment_id).first()

    if not db_payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    db.delete(db_payment)
    db.commit()

    return {"message": "Payment deleted successfully"}
