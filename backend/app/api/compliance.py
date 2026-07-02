from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date, timedelta

from app.database.dependencies import get_db
from app.models.tanker import Tanker
from app.models.employee import Employee

router = APIRouter(
    prefix="/compliance",
    tags=["Compliance"]
)

@router.get("/insurance-expiring")
def insurance_expiring(
        days: int = 30,
        db: Session = Depends(get_db)
):
    limit_date = date.today() + timedelta(days=days)

    return db.query(Tanker).filter(
        Tanker.insurance_expiry <= limit_date
    ).all()

@router.get("/pollution-expiring")
def pollution_expiring(
        days: int = 30,
        db: Session = Depends(get_db)
):
    limit_date = date.today() + timedelta(days=days)

    return db.query(Tanker).filter(
        Tanker.pollution_expiry <= limit_date
    ).all()

@router.get("/tax-expiring")
def tax_expiring(
        days: int = 30,
        db: Session = Depends(get_db)
):
    limit_date = date.today() + timedelta(days=days)

    return db.query(Tanker).filter(
        Tanker.tax_expiry <= limit_date
    ).all()

@router.get("/license-expiring")
def license_expiring(
        days: int = 30,
        db: Session = Depends(get_db)
):
    limit_date = date.today() + timedelta(days=days)

    return db.query(Employee).filter(
        Employee.license_expiry <= limit_date
    ).all()