from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.base import Base


class Chat(Base):
  __tablename__ = 'chat'

  id = Column(Integer, primary_key=True)
  title = Column(String)
  content = Column(String)
  user_id = Column(Integer, ForeignKey('user.id'), nullable=False)

  user = relationship('User', back_populates='chats')