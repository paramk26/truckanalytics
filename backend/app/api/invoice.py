from datetime import datetime, date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.invoice import Invoice
from app.models.delivery import Delivery
from app.models.expense import Expense

from app.schemas.invoice import (
    InvoiceCreate,
    InvoiceResponse,
    InvoiceGenerateRequest
)

from app.auth.dependencies import admin_required

router = APIRouter(
    prefix="/invoices",
    tags=["Invoices"]
)


@router.post(
    "/",
    response_model=InvoiceResponse
)
def create_invoice(
    invoice: InvoiceCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    db_invoice = Invoice(
        **invoice.model_dump()
    )

    db.add(db_invoice)
    db.commit()
    db.refresh(db_invoice)

    return db_invoice


@router.post("/generate")
def generate_invoice(
    request: InvoiceGenerateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    deliveries = db.query(
        Delivery
    ).filter(
        Delivery.customer_id == request.customer_id,
        Delivery.delivery_date >= request.start_date,
        Delivery.delivery_date <= request.end_date
    ).all()

    expenses = db.query(
        Expense
    ).filter(
        Expense.customer_id == request.customer_id,
        Expense.expense_date >= request.start_date,
        Expense.expense_date <= request.end_date
    ).all()

    subtotal = 0

    expense_total = sum(
        expense.amount for expense in expenses
    )

    gst_amount = (subtotal + expense_total) * 0.18

    grand_total = subtotal + expense_total + gst_amount

    invoice_number = (
        f"INV-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    )

    invoice = Invoice(
        customer_id=request.customer_id,
        invoice_number=invoice_number,
        invoice_type="AUTO",
        start_date=request.start_date,
        end_date=request.end_date,
        subtotal=subtotal,
        expense_total=expense_total,
        gst_amount=gst_amount,
        grand_total=grand_total,
        payment_status="PENDING",
        generated_date=date.today(),
        remarks="Auto generated invoice"
    )

    db.add(invoice)
    db.commit()
    db.refresh(invoice)

    return {
        "invoice_id": invoice.id,
        "invoice_number": invoice.invoice_number,
        "subtotal": subtotal,
        "expense_total": expense_total,
        "gst_amount": gst_amount,
        "grand_total": grand_total,
        "deliveries_count": len(deliveries),
        "expenses_count": len(expenses)
    }


@router.get(
    "/",
    response_model=list[InvoiceResponse]
)
def get_invoices(
    db: Session = Depends(get_db)
):
    return db.query(
        Invoice
    ).all()


@router.get(
    "/{invoice_id}",
    response_model=InvoiceResponse
)
def get_invoice(
    invoice_id: int,
    db: Session = Depends(get_db)
):
    invoice = db.query(
        Invoice
    ).filter(
        Invoice.id == invoice_id
    ).first()

    if not invoice:
        raise HTTPException(
            status_code=404,
            detail="Invoice not found"
        )

    return invoice


@router.put(
    "/{invoice_id}",
    response_model=InvoiceResponse
)
def update_invoice(
    invoice_id: int,
    invoice: InvoiceCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    db_invoice = db.query(
        Invoice
    ).filter(
        Invoice.id == invoice_id
    ).first()

    if not db_invoice:
        raise HTTPException(
            status_code=404,
            detail="Invoice not found"
        )

    for key, value in invoice.model_dump().items():
        setattr(db_invoice, key, value)

    db.commit()
    db.refresh(db_invoice)

    return db_invoice


@router.delete(
    "/{invoice_id}"
)
def delete_invoice(
    invoice_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    db_invoice = db.query(
        Invoice
    ).filter(
        Invoice.id == invoice_id
    ).first()

    if not db_invoice:
        raise HTTPException(
            status_code=404,
            detail="Invoice not found"
        )

    db.delete(db_invoice)
    db.commit()

    return {
        "message": "Invoice deleted successfully"
    }