from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.invoice import Invoice

from app.schemas.invoice import (
    InvoiceCreate,
    InvoiceResponse
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
        raise HTTPException(status_code=404, detail="Invoice not found")

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
    db_invoice = db.query(Invoice).filter(Invoice.id == invoice_id).first()

    if not db_invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")

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
    db_invoice = db.query(Invoice).filter(Invoice.id == invoice_id).first()

    if not db_invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")

    db.delete(db_invoice)
    db.commit()

    return {"message": "Invoice deleted successfully"}
