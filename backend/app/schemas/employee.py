from pydantic import BaseModel
from datetime import date


class EmployeeCreate(BaseModel):
    name: str

    role: str

    phone: str | None = None
    address: str | None = None

    license_number: str | None = None
    license_expiry: date | None = None

    joining_date: date | None = None

    salary: float | None = None

    emergency_contact_name: str | None = None
    emergency_contact_phone: str | None = None


class EmployeeResponse(EmployeeCreate):
    id: int
    status: str

    class Config:
        from_attributes = True