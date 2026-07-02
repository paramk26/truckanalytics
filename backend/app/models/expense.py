from sqlalchemy import Column, Integer, Float, String, Date, ForeignKey

from app.database.base import Base


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )

    delivery_id = Column(
        Integer,
        ForeignKey("deliveries.id"),
        nullable=True
    )

    amount = Column(
        Float,
        nullable=False
    )

    expense_type = Column(
        String,
        nullable=False
    )

    description = Column(String)

    expense_date = Column(
        Date,
        nullable=False
    )