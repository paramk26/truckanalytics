from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.database.dependencies import get_db

from app.models.user import User

from app.schemas.user import (
    UserCreate,
    UserLogin,
    UserResponse
)

from app.auth.security import (
    hash_password,
    verify_password
)

from app.auth.auth import (
    create_access_token
)
from app.auth.dependencies import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post(
    "/register",
    response_model=UserResponse
)
def register_user(
        user: UserCreate,
        db: Session = Depends(get_db)
):
    db_user = User(
        username=user.username,
        password_hash=hash_password(
            user.password
        ),
        role=user.role
    )

    db.add(db_user)

    db.commit()

    db.refresh(db_user)

    return db_user

@router.post("/login")
def login(
        form_data: OAuth2PasswordRequestForm = Depends(),
        db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.username == form_data.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
            form_data.password,
            user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {
            "sub": user.username,
            "role": user.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role
    }
@router.get("/me")
def get_me(
        current_user=Depends(get_current_user)
):
    return current_user
