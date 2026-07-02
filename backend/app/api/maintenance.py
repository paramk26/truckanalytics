from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.maintenance import Maintenance

from app.schemas.maintenance import (
    MaintenanceCreate,
    MaintenanceResponse
)

router = APIRouter(
    prefix="/maintenance",
    tags=["Maintenance"]
)


@router.post(
    "/",
    response_model=MaintenanceResponse
)
def create_maintenance(
        maintenance: MaintenanceCreate,
        db: Session = Depends(get_db)
):
    db_maintenance = Maintenance(
        **maintenance.model_dump()
    )

    db.add(db_maintenance)
    db.commit()
    db.refresh(db_maintenance)

    return db_maintenance


@router.get(
    "/",
    response_model=list[MaintenanceResponse]
)
def get_maintenance_records(
        db: Session = Depends(get_db)
):
    return db.query(
        Maintenance
    ).all()


@router.get(
    "/{maintenance_id}",
    response_model=MaintenanceResponse
)
def get_maintenance_record(
        maintenance_id: int,
        db: Session = Depends(get_db)
):
    return db.query(
        Maintenance
    ).filter(
        Maintenance.id == maintenance_id
    ).first()