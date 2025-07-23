from fastapi import Depends, Header, HTTPException
from sqlalchemy.orm import Session
from firebase_admin import auth as firebase_auth

from app.db.database import SessionLocal
from app.models.user import User

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_current_user(
    authorization: str = Header(...),
    db: Session = Depends(get_db)
) -> User:
    try:
        token = authorization.replace("Bearer ", "")
        decoded_token = firebase_auth.verify_id_token(token)
        email = decoded_token.get("email")

        if not email:
            raise HTTPException(status_code=400, detail="Email not found in token")

        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return user

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Unauthorized: {str(e)}")
