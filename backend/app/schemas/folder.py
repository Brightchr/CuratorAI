# app/schemas/folder.py
from pydantic import BaseModel
from datetime import datetime

class FolderCreate(BaseModel):
    name: str

class FolderOut(BaseModel):
    id: int
    name: str
    created_at: datetime

    class Config:
        orm_mode = True


class FolderUpdate(BaseModel):
  name: str
