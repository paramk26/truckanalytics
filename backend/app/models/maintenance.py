from sqlalchemy import Column, Integer, Float, String, Date, ForeignKey

from app.database.base import Base


class Maintenance(Base):
    __tablename__ = "maintenance_records"

    id = Column(Integer, primary_key=True, index=True)

    tanker_id = Column(
        Integer,
        ForeignKey("tankers.id"),
        nullable=False
    )

    maintenance_date = Column(
        Date,
        nullable=False
    )

    maintenance_type = Column(
        String,
        nullable=False
    )

    cost = Column(
        Float,
        nullable=False
    )

    garage_name = Column(String)

    description = Column(String)

    next_service_due = Column(Date)