from sqlalchemy import Column, Integer, String, Date, Float
from app.database.base import Base


class Tanker(Base):
    __tablename__ = "tankers"

    id = Column(Integer, primary_key=True, index=True)

    registration_number = Column(
        String,
        unique=True,
        nullable=False
    )

    capacity_kl = Column(
        Integer,
        nullable=False
    )

    make = Column(String)
    model = Column(String)

    manufacturing_year = Column(Integer)

    chassis_number = Column(String)
    engine_number = Column(String)

    assigned_plant = Column(String)

    status = Column(
        String,
        default="ACTIVE"
    )

    insurance_expiry = Column(Date)
    pollution_expiry = Column(Date)
    road_tax_expiry = Column(Date)
    fitness_expiry = Column(Date)
    permit_expiry = Column(Date)

    purchase_date = Column(Date)
    purchase_price = Column(Float)