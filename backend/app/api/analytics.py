from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.dependencies import get_db

from app.models.delivery import Delivery
from app.models.expense import Expense
from app.models.invoice import Invoice
from app.models.payment import Payment
from app.models.customer import Customer
from app.models.tanker import Tanker

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

@router.get("/total-revenue")
def total_revenue(
        db: Session = Depends(get_db)
):
    revenue = db.query(
        func.sum(
            Invoice.grand_total
        )
    ).scalar()

    return {
        "total_revenue": revenue or 0
    }

@router.get("/total-expenses")
def total_expenses(
        db: Session = Depends(get_db)
):
    expenses = db.query(
        func.sum(
            Expense.amount
        )
    ).scalar()

    return {
        "total_expenses": expenses or 0
    }

@router.get("/outstanding-payments")
def outstanding_payments(
        db: Session = Depends(get_db)
):
    outstanding = db.query(
        func.sum(
            Invoice.grand_total
        )
    ).filter(
        Invoice.payment_status == "PENDING"
    ).scalar()

    return {
        "outstanding_payments": outstanding or 0
    }

@router.get("/customer-count")
def customer_count(
        db: Session = Depends(get_db)
):
    count = db.query(
        func.count(
            Customer.id
        )
    ).scalar()

    return {
        "customers": count
    }

@router.get("/tanker-count")
def tanker_count(
        db: Session = Depends(get_db)
):
    count = db.query(
        func.count(
            Tanker.id
        )
    ).scalar()

    return {
        "tankers": count
    }

@router.get("/delivery-count")
def delivery_count(
        db: Session = Depends(get_db)
):
    count = db.query(
        func.count(
            Delivery.id
        )
    ).scalar()

    return {
        "deliveries": count
    }

@router.get("/net-profit")
def net_profit(
        db: Session = Depends(get_db)
):
    revenue = db.query(
        func.sum(
            Invoice.grand_total
        )
    ).scalar() or 0

    expenses = db.query(
        func.sum(
            Expense.amount
        )
    ).scalar() or 0

    return {
        "net_profit": revenue - expenses
    }

@router.get("/top-customers")
def top_customers(
        db: Session = Depends(get_db)
):
    return db.query(
        Customer.company_name,
        func.sum(
            Invoice.grand_total
        ).label("revenue")
    ).join(
        Invoice,
        Customer.id == Invoice.customer_id
    ).group_by(
        Customer.company_name
    ).order_by(
        func.sum(
            Invoice.grand_total
        ).desc()
    ).limit(5).all()