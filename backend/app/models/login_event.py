from pyasn1.compat import integer
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.models.base import Base

class LoginEvent(Base):
  __tablename__ = 'login_events'

  id = Column(Integer, primary_key=True)
  email = Column(String, nullable=True)
  timestamp = Column(DateTime, default=datetime.utcnow)
  status = Column(String)
  reason = Column(String)
  ip_address = Column(String)
