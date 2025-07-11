from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL") #load the db  URL from env

# Create engine that SQLAlchemy uses to communicate with the db
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit =False, autoflush=False, bind=engine)


def get_db():
  db: Session = SessionLocal()
  try:
    yield db
  finally:
    db.close()
