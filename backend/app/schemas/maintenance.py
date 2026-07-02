from pydantic import BaseModel
from datetime import date


class MaintenanceCreate(BaseModel):
    tanker_id: int

    maintenance_date: date

    maintenance_type: str

    cost: float

    garage_name: str | None = None

    description: str | None = None

    next_service_due: date | None = None


class MaintenanceResponse(MaintenanceCreate):
    id: int

    class Config:
        from_attributes = True