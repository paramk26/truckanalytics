from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class CustomerRate(Base):
    __tablename__ = "customer_rates"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )

    tanker_capacity = Column(
        Integer,
        nullable=False
    )

    plant_name = Column(
        String,
        nullable=False
    )

    rate = Column(
        Float,
        nullable=False
    )