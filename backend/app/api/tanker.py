from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.tanker import Tanker
from app.schemas.tanker import (
    TankerCreate,
    TankerResponse
)
from app.auth.dependencies import admin_required

router = APIRouter(
    prefix="/tankers",
    tags=["Tankers"]
)


@router.post("/")
def create_tanker(
    tanker: TankerCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    db_tanker = Tanker(
        **tanker.model_dump()
    )

    db.add(db_tanker)
    db.commit()
    db.refresh(db_tanker)

    return db_tanker


@router.get(
    "/",
    response_model=list[TankerResponse]
)
def get_tankers(
        db: Session = Depends(get_db)
):
    return db.query(
        Tanker
    ).all()


@router.get(
    "/{tanker_id}",
    response_model=TankerResponse
)
def get_tanker(
        tanker_id: int,
        db: Session = Depends(get_db)
):
    return db.query(
        Tanker
    ).filter(
        Tanker.id == tanker_id
    ).first()