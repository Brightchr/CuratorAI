from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.base import Base

class Chat(Base):
    __tablename__ = 'chat'

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    content = Column(String)  # Optional summary
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    folder_id = Column(Integer, ForeignKey('chat_folders.id'), nullable=True)
    is_archived = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    is_deleted = Column(Boolean, default=False),

    user = relationship('User', back_populates='chats')
    messages = relationship('Message', back_populates='chat', cascade="all, delete-orphan")
    folder = relationship('ChatFolder', back_populates='chats')
