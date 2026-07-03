from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import app.models
from app.api.analytics import router as analytics_router
from app.api.auth import router as auth_router
from app.api.compliance import router as compliance_router
from app.api.customer import router as customer_router
from app.api.customer_rate import router as customer_rate_router
from app.api.dashboard import router as dashboard_router
from app.api.delivery import router as delivery_router
from app.api.employee import router as employee_router
from app.api.expense import router as expense_router
from app.api.invoice import router as invoice_router
from app.api.maintenance import router as maintenance_router
from app.api.payment import router as payment_router
from app.api.tanker import router as tanker_router
from app.database.base import Base
from app.database.connection import engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="SWS Invoice System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(customer_router)
app.include_router(tanker_router)
app.include_router(employee_router)
app.include_router(customer_rate_router)
app.include_router(delivery_router)
app.include_router(expense_router)
app.include_router(invoice_router)
app.include_router(payment_router)
app.include_router(maintenance_router)
app.include_router(compliance_router)
app.include_router(analytics_router)
app.include_router(auth_router)
app.include_router(dashboard_router)


@app.get("/")
def root():
    return {"message": "API running successfully"}


@app.get("/test")
def test():
    return {"message": "Test route working"}
