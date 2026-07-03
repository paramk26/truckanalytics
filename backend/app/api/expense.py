from fastapi import APIRouter, Depends, HTTPException
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


@router.get(
    "/{expense_id}",
    response_model=ExpenseResponse
)
def get_expense(
        expense_id: int,
        db: Session = Depends(get_db)
):
    expense = db.query(Expense).filter(Expense.id == expense_id).first()

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    return expense


@router.put(
    "/{expense_id}",
    response_model=ExpenseResponse
)
def update_expense(
        expense_id: int,
        expense: ExpenseCreate,
        db: Session = Depends(get_db),
        current_user=Depends(admin_required)
):
    db_expense = db.query(Expense).filter(Expense.id == expense_id).first()

    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    for key, value in expense.model_dump().items():
        setattr(db_expense, key, value)

    db.commit()
    db.refresh(db_expense)

    return db_expense


@router.delete(
    "/{expense_id}"
)
def delete_expense(
        expense_id: int,
        db: Session = Depends(get_db),
        current_user=Depends(admin_required)
):
    db_expense = db.query(Expense).filter(Expense.id == expense_id).first()

    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    db.delete(db_expense)
    db.commit()

    return {"message": "Expense deleted successfully"}
