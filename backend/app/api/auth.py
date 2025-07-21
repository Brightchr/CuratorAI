# backend/api/auth.py

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from firebase_admin import auth as firebase_auth
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.models.user import User
from app.models.login_event import LoginEvent

import app.services.firebase_init  # Ensures Firebase is initialized
from fastapi import Request #grab user ip


router = APIRouter()

class FirebaseToken(BaseModel):
    idToken: str

@router.post("/firebase")
async def verify_firebase_token(
    request: Request,
    data: FirebaseToken,
    db: Session = Depends(get_db)
):
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
            user = User(
                email=email,
                password="firebase",
                firstName=first_name,
                lastName=last_name,
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        # Log successful login
        login_event = LoginEvent(email=email, status="success", ip_address=request.client.host)
        db.add(login_event)
        db.commit()

        return {
            "id": user.id,
            "email": user.email,
            "firstName": user.firstName,
            "lastName": user.lastName
        }

    except Exception as e:
        db.rollback()  # clear failed state first

        # Safe fallback log
        login_event = LoginEvent(
            email="unknown",
            status="failure",
            reason=str(e),
            ip_address=request.client.host
        )
        try:
            db.add(login_event)
            db.commit()
        except:
            db.rollback()  # safeguard in case logging also fails

        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")


