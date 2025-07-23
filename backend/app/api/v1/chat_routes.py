from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from typing import List
from app.db.database import get_db
from app.models import Chat, User
from app.schemas.chat import ChatCreate, ChatOut, ChatUpdate, MessageCreate
from app.dependencies import get_current_user

router = APIRouter()

@router.post("/chats", response_model=ChatOut)
def create_chat(chat: ChatCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    new_chat = Chat(title=chat.title, user_id=user.id, folder_id=chat.folder_id)
    db.add(new_chat)
    db.commit()
    db.refresh(new_chat)
    return new_chat

@router.get("/chats", response_model=List[ChatOut])
def get_chats(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.query(Chat).filter(Chat.user_id == user.id).order_by(Chat.updated_at.desc()).all()


@router.put("/chats/{chat_id}", response_model=ChatOut)
def update_chat(
    chat_id: int,
    update: ChatUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    chat = db.query(Chat).filter(Chat.id == chat_id, Chat.user_id == user.id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    chat.title = update.title
    db.commit()
    db.refresh(chat)
    return chat


@router.delete("/chats/{chat_id}", response_model=ChatOut)
def soft_delete_chat(
    chat_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    chat = db.query(Chat).filter(
        Chat.id == chat_id, Chat.user_id == user.id
    ).first()

    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    chat.is_deleted = True
    db.commit()
    db.refresh(chat)
    return chat

