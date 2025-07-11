# backend/api/auth.py

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from firebase_admin import auth as firebase_auth
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.models.user import User
import app.services.firebase_init  # Ensures Firebase is initialized

router = APIRouter()

class FirebaseToken(BaseModel):
    idToken: str

@router.post("/auth/firebase")
async def verify_firebase_token(data: FirebaseToken, db: Session = Depends(get_db)):
    try:
        # Verify token
        decoded_token = firebase_auth.verify_id_token(data.idToken)
        email = decoded_token.get("email")
        name = decoded_token.get("name", "")
        first_name, last_name = name.split(" ", 1) if " " in name else (name, "")

        if not email:
            raise HTTPException(status_code=400, detail="Email not found in token")

        # Check if user exists
        user = db.query(User).filter(User.email == email).first()

        if not user:
            # Create new user
            user = User(
                email=email,
                password="firebase",
                firstName=first_name,
                lastName=last_name,
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        return {
            "id": user.id,
            "email": user.email,
            "firstName": user.firstName,
            "lastName": user.lastName
        }

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
