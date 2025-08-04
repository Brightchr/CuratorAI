from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from typing import List
from app.db.database import get_db
from app.models import Chat, Message, User
from app.schemas.chat import MessageCreate, MessageOut
from app.dependencies import get_current_user

router = APIRouter()

@router.post("/messages")
def save_message(msg: MessageCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    chat = db.query(Chat).filter(Chat.id == msg.chat_id, Chat.user_id == user.id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    message = Message(content=msg.content, role=msg.role, chat_id=chat.id)
    chat.updated_at = func.now()
    db.add(message)
    db.commit()
    return {
        "id": message.id,
        "content": message.content,
        "role": message.role,
        "created_at": message.created_at,
        "chat_id": message.chat_id
    }

@router.get("/messages/{chat_id}", response_model=List[MessageOut])
def get_messages(chat_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    chat = db.query(Chat).filter(Chat.id == chat_id, Chat.user_id == user.id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    return db.query(Message).filter(Message.chat_id == chat_id).order_by(Message.created_at).all()
