from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.invoice import Invoice

from app.schemas.invoice import (
    InvoiceCreate,
    InvoiceResponse
)

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
    db: Session = Depends(get_db)
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
    return db.query(
        Invoice
    ).filter(
        Invoice.id == invoice_id
    ).first()