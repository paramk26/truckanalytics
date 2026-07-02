from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

from app.database.dependencies import get_db

from app.models.customer import Customer
from app.models.tanker import Tanker
from app.models.employee import Employee
from app.models.delivery import Delivery
from app.models.expense import Expense
from app.models.invoice import Invoice
from app.models.payment import Payment
from app.models.maintenance import Maintenance

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def get_dashboard(
        db: Session = Depends(get_db)
):
    current_month = date.today().month
    current_year = date.today().year

    total_customers = db.query(
        func.count(Customer.id)
    ).scalar() or 0

    total_tankers = db.query(
        func.count(Tanker.id)
    ).scalar() or 0

    total_employees = db.query(
        func.count(Employee.id)
    ).scalar() or 0

    total_deliveries = db.query(
        func.count(Delivery.id)
    ).scalar() or 0

    monthly_revenue = db.query(
        func.sum(Invoice.grand_total)
    ).filter(
        func.extract(
            "month",
            Invoice.generated_date
        ) == current_month,
        func.extract(
            "year",
            Invoice.generated_date
        ) == current_year
    ).scalar() or 0

    monthly_expenses = db.query(
        func.sum(Expense.amount)
    ).filter(
        func.extract(
            "month",
            Expense.expense_date
        ) == current_month,
        func.extract(
            "year",
            Expense.expense_date
        ) == current_year
    ).scalar() or 0

    pending_payments = db.query(
        func.sum(Invoice.grand_total)
    ).filter(
        Invoice.payment_status == "PENDING"
    ).scalar() or 0

    total_payments_received = db.query(
        func.sum(Payment.amount_received)
    ).scalar() or 0

    total_maintenance_cost = db.query(
        func.sum(Maintenance.cost)
    ).scalar() or 0

    net_profit = monthly_revenue - monthly_expenses

    return {
        "customers": total_customers,
        "tankers": total_tankers,
        "employees": total_employees,
        "deliveries": total_deliveries,

        "monthly_revenue": monthly_revenue,
        "monthly_expenses": monthly_expenses,
        "net_profit": net_profit,

        "pending_payments": pending_payments,
        "payments_received": total_payments_received,

        "maintenance_cost": total_maintenance_cost
    }