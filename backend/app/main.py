from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import generate  # assumes api/generate.py contains `router = APIRouter()`

app = FastAPI()

# Allow all origins for development (customize this for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Register the generate route module under /api
app.include_router(generate.router, prefix="/api")
