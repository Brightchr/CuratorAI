from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models import ChatFolder, User
from app.schemas.folder import FolderCreate, FolderOut
from app.dependencies import get_current_user
from app.schemas.folder import FolderUpdate


router = APIRouter()

@router.post("/folders", response_model=FolderOut)
def create_folder(folder: FolderCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    new_folder = ChatFolder(name=folder.name, user_id=user.id)
    db.add(new_folder)
    db.commit()
    db.refresh(new_folder)
    return new_folder

@router.get("/folders", response_model=List[FolderOut])
def get_folders(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.query(ChatFolder).filter(ChatFolder.user_id == user.id).all()

@router.put("/folders/{folder_id}", response_model=FolderOut)
def update_folder(folder_id: int, update: FolderUpdate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    folder = db.query(ChatFolder).filter(ChatFolder.id == folder_id, ChatFolder.user_id == user.id).first()
    if not folder:
        raise HTTPException(status_code=404, detail="Folder not found")
    folder.name = update.name
    db.commit()
    db.refresh(folder)
    return folder

@router.delete("/folders/{folder_id}")
def delete_folder(folder_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    folder = db.query(ChatFolder).filter(ChatFolder.id == folder_id, ChatFolder.user_id == user.id).first()
    if not folder:
        raise HTTPException(status_code=404, detail="Folder not found")
    db.delete(folder)
    db.commit()
    return {"detail": "Folder deleted"}
