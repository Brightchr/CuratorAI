import os
from dotenv import load_dotenv
from pathlib import Path
import firebase_admin
from firebase_admin import credentials

# Explicit path to .env (one level up from this file)
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

# Check FIREBASE_CREDENTIALS variable
cred_path = os.getenv("FIREBASE_CREDENTIALS")
print(f"Loaded FIREBASE_CREDENTIALS: {cred_path}")

# Construct full path to key file
full_path = Path(__file__).resolve().parent / cred_path
print(f"Resolved full path: {full_path}")

# Check file existence
if not full_path.exists():
    print("❌ Firebase admin key not found at:", full_path)
    exit(1)

print("✅ Firebase admin key found.")

# Try Firebase init
try:
    firebase_admin.get_app()
    print("⚠️ Firebase app already initialized.")
except ValueError:
    cred = credentials.Certificate(full_path)
    firebase_admin.initialize_app(cred)
    print("✅ Firebase app successfully initialized.")
