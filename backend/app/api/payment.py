from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.payment import Payment

from app.schemas.payment import (
    PaymentCreate,
    PaymentResponse
)

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
    db: Session = Depends(get_db)
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
    return db.query(
        Payment
    ).filter(
        Payment.id == payment_id
    ).first()