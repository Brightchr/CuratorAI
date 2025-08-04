from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, generate
from app.db.database import engine
from app.models import Base
from app.api.v1 import chat_routes, message_routes, folder_routes

app = FastAPI()

# CORS must explicitly list your origin when allow_credentials=True
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Explicit origin required
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(generate.router, prefix="/api")
app.include_router(auth.router, prefix="/api/auth")

app.include_router(chat_routes.router, prefix="/api/chat", tags=["chat"])
app.include_router(message_routes.router, prefix="/api/chat", tags=["messages"])
app.include_router(folder_routes.router, prefix="/api/chat", tags=["folder"])




Base.metadata.create_all(bind=engine)



