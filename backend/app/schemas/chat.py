# app/schemas/chat_routes.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ChatCreate(BaseModel):
    title: str
    folder_id: Optional[int] = None

class MessageCreate(BaseModel):
    chat_id: int
    content: str
    role: str  # 'user' or 'assistant'

class MessageOut(BaseModel):
    id: int
    content: str
    role: str
    created_at: datetime

    class Config:
        from_attributes = True

class ChatOut(BaseModel):
    id: int
    title: str
    folder_id: Optional[int]
    is_archived: bool

    class Config:
        orm_mode = True

class ChatUpdate(BaseModel):
    title: str

class PromptRequest(BaseModel):
    prompt: str

