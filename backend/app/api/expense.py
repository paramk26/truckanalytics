from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.expense import Expense

from app.schemas.expense import (
    ExpenseCreate,
    ExpenseResponse
)
from app.auth.dependencies import admin_required

router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"]
)


@router.post(
    "/",
    response_model=ExpenseResponse
)
def create_expense(
        expense: ExpenseCreate,
        db: Session = Depends(get_db),
        current_user=Depends(admin_required)
):
    db_expense = Expense(
        **expense.model_dump()
    )

    db.add(db_expense)

    db.commit()

    db.refresh(db_expense)

    return db_expense


@router.get(
    "/",
    response_model=list[ExpenseResponse]
)
def get_expenses(
        db: Session = Depends(get_db)
):
    return db.query(
        Expense
    ).all()