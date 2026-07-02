from sqlalchemy import Column, Integer, Float, String, Date, ForeignKey
from app.database.base import Base


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )

    invoice_number = Column(
        String,
        unique=True,
        nullable=False
    )

    invoice_type = Column(
        String,
        nullable=False
    )

    start_date = Column(Date)
    end_date = Column(Date)

    subtotal = Column(Float, default=0)
    expense_total = Column(Float, default=0)
    gst_amount = Column(Float, default=0)
    grand_total = Column(Float, default=0)

    payment_status = Column(
        String,
        default="PENDING"
    )

    generated_date = Column(Date)

    remarks = Column(String)