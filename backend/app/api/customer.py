from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.customer import Customer

from app.schemas.customer import (
    CustomerCreate,
    CustomerResponse
)

from app.auth.dependencies import admin_required

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


# -----------------------------
# CREATE CUSTOMER (ADMIN ONLY)
# -----------------------------
@router.post(
    "/",
    response_model=CustomerResponse
)
def create_customer(
        customer: CustomerCreate,
        db: Session = Depends(get_db),
        current_user=Depends(admin_required)
):
    db_customer = Customer(
        **customer.model_dump()
    )

    db.add(db_customer)

    db.commit()

    db.refresh(db_customer)

    return db_customer


# -----------------------------
# GET ALL CUSTOMERS
# -----------------------------
@router.get(
    "/",
    response_model=list[CustomerResponse]
)
def get_customers(
        db: Session = Depends(get_db)
):
    return db.query(
        Customer
    ).all()


# -----------------------------
# GET SINGLE CUSTOMER
# -----------------------------
@router.get(
    "/{customer_id}",
    response_model=CustomerResponse
)
def get_customer(
        customer_id: int,
        db: Session = Depends(get_db)
):
    return db.query(
        Customer
    ).filter(
        Customer.id == customer_id
    ).first()