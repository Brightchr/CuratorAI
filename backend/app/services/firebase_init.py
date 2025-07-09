import firebase_admin
from firebase_admin import credentials
from dotenv import load_dotenv
import os
from pathlib import Path

# Explicitly point to backend/app/.env
env_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=env_path)

try:
    firebase_admin.get_app()
except ValueError:
    cred_path = os.getenv("FIREBASE_CREDENTIALS")
    if not cred_path:
        raise ValueError("Missing FIREBASE_CREDENTIALS in .env")

    full_path = os.path.join(Path(__file__).resolve().parents[1], cred_path)
    if not os.path.exists(full_path):
        raise FileNotFoundError(f"Firebase credentials not found at: {full_path}")

    cred = credentials.Certificate(full_path)
    firebase_admin.initialize_app(cred)
