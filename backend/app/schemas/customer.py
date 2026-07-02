from pydantic import BaseModel


class CustomerCreate(BaseModel):
    company_name: str
    address: str | None = None
    gst_number: str | None = None
    contact_person: str | None = None
    phone: str | None = None


class CustomerResponse(CustomerCreate):
    id: int
    is_active: bool

    class Config:
        from_attributes = True