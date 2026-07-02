from sqlalchemy import Column, Integer, Float, String, Date, ForeignKey

from app.database.base import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)

    invoice_id = Column(
        Integer,
        ForeignKey("invoices.id"),
        nullable=False
    )

    payment_date = Column(
        Date,
        nullable=False
    )

    amount_received = Column(
        Float,
        nullable=False
    )

    payment_method = Column(
        String,
        nullable=False
    )

    reference_number = Column(String)

    remarks = Column(String)