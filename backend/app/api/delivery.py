from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.delivery import Delivery

from app.schemas.delivery import (
    DeliveryCreate,
    DeliveryResponse
)
from app.auth.dependencies import admin_required
router = APIRouter(
    prefix="/deliveries",
    tags=["Deliveries"]
)


@router.post(
    "/",
    response_model=DeliveryResponse
)
def create_delivery(
        delivery: DeliveryCreate,
        db: Session = Depends(get_db),
        current_user=Depends(admin_required)
):
    db_delivery = Delivery(
        **delivery.model_dump()
    )

    db.add(db_delivery)

    db.commit()

    db.refresh(db_delivery)

    return db_delivery

@router.get(
    "/",
    response_model=list[DeliveryResponse]
)
def get_deliveries(
        db: Session = Depends(get_db)
):
    return db.query(
        Delivery
    ).all()


@router.get(
    "/{delivery_id}",
    response_model=DeliveryResponse
)
def get_delivery(
        delivery_id: int,
        db: Session = Depends(get_db)
):
    return db.query(
        Delivery
    ).filter(
        Delivery.id == delivery_id
    ).first()