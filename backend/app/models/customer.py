from sqlalchemy import Column, Integer, String, Boolean
from app.database.base import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)

    company_name = Column(String, nullable=False)
    address = Column(String)

    gst_number = Column(String)
    contact_person = Column(String)
    phone = Column(String)

    is_active = Column(Boolean, default=True)