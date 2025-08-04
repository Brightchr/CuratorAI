from ..models.base import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)

    # Link to Chat Model
    chats = relationship("Chat", back_populates="user", cascade="all, delete-orphan")
    folders = relationship('ChatFolder', back_populates='user', cascade='all, delete-orphan')


