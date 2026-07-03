from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.maintenance import Maintenance

from app.schemas.maintenance import (
    MaintenanceCreate,
    MaintenanceResponse
)

from app.auth.dependencies import admin_required

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
        db: Session = Depends(get_db),
        current_user=Depends(admin_required)
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
    maintenance = db.query(
        Maintenance
    ).filter(
        Maintenance.id == maintenance_id
    ).first()

    if not maintenance:
        raise HTTPException(status_code=404, detail="Maintenance record not found")

    return maintenance


@router.put(
    "/{maintenance_id}",
    response_model=MaintenanceResponse
)
def update_maintenance_record(
        maintenance_id: int,
        maintenance: MaintenanceCreate,
        db: Session = Depends(get_db),
        current_user=Depends(admin_required)
):
    db_maintenance = db.query(Maintenance).filter(Maintenance.id == maintenance_id).first()

    if not db_maintenance:
        raise HTTPException(status_code=404, detail="Maintenance record not found")

    for key, value in maintenance.model_dump().items():
        setattr(db_maintenance, key, value)

    db.commit()
    db.refresh(db_maintenance)

    return db_maintenance


@router.delete(
    "/{maintenance_id}"
)
def delete_maintenance_record(
        maintenance_id: int,
        db: Session = Depends(get_db),
        current_user=Depends(admin_required)
):
    db_maintenance = db.query(Maintenance).filter(Maintenance.id == maintenance_id).first()

    if not db_maintenance:
        raise HTTPException(status_code=404, detail="Maintenance record not found")

    db.delete(db_maintenance)
    db.commit()

    return {"message": "Maintenance record deleted successfully"}
