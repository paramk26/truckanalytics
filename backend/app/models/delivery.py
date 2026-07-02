from sqlalchemy import Column, Integer, Float, String, Date, ForeignKey
from app.database.base import Base


class Delivery(Base):
    __tablename__ = "deliveries"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )

    tanker_id = Column(
        Integer,
        ForeignKey("tankers.id"),
        nullable=False
    )

    driver_id = Column(
        Integer,
        ForeignKey("employees.id"),
        nullable=False
    )

    helper_id = Column(
        Integer,
        ForeignKey("employees.id"),
        nullable=True
    )

    customer_rate_id = Column(
        Integer,
        ForeignKey("customer_rates.id"),
        nullable=False
    )

    delivery_date = Column(
        Date,
        nullable=False
    )

    trip_number = Column(
        Integer,
        default=1
    )

    source_plant = Column(String)
    destination = Column(String)

    quantity_kl = Column(Float)

    extra_expense = Column(
        Float,
        default=0
    )

    remarks = Column(String)