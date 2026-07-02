from sqlalchemy import Column, Integer, String, Date, Float
from app.database.base import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    role = Column(
        String,
        nullable=False
    )

    phone = Column(String)

    address = Column(String)

    license_number = Column(String)
    license_expiry = Column(Date)

    joining_date = Column(Date)

    salary = Column(Float)

    emergency_contact_name = Column(String)
    emergency_contact_phone = Column(String)

    status = Column(
        String,
        default="ACTIVE"
    )