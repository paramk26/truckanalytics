from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.employee import Employee

from app.schemas.employee import (
    EmployeeCreate,
    EmployeeResponse
)

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


@router.post(
    "/",
    response_model=EmployeeResponse
)
def create_employee(
        employee: EmployeeCreate,
        db: Session = Depends(get_db)
):
    db_employee = Employee(
        **employee.model_dump()
    )

    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)

    return db_employee


@router.get(
    "/",
    response_model=list[EmployeeResponse]
)
def get_employees(
        db: Session = Depends(get_db)
):
    return db.query(
        Employee
    ).all()


@router.get(
    "/{employee_id}",
    response_model=EmployeeResponse
)
def get_employee(
        employee_id: int,
        db: Session = Depends(get_db)
):
    return db.query(
        Employee
    ).filter(
        Employee.id == employee_id
    ).first()