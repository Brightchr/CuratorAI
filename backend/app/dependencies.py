# app/dependencies.py

from fastapi import Depends, HTTPException, Request
from firebase_admin import auth as firebase_auth
from sqlalchemy.orm import Session
from app.models.user import User
from app.db.database import SessionLocal

# Dependency: Get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Dependency: Get current authenticated user via Firebase
def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")

    token = auth_header.split(" ")[1]

    try:
        decoded_token = firebase_auth.verify_id_token(token)
        email = decoded_token.get("email")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid Firebase token")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user
