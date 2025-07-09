# backend/api/auth.py
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from firebase_admin import auth as firebase_auth
import app.services.firebase_init


router = APIRouter()

class FirebaseToken(BaseModel):
    idToken: str

@router.post("/auth/firebase")
async def verify_firebase_token(data: FirebaseToken):
    decoded_token = firebase_auth.verify_id_token(data.idToken)
    uid = decoded_token["uid"]

