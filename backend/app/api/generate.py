import json

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import requests
import os

router = APIRouter()
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://ollama:11434")

class PromptRequest(BaseModel):
    prompt: str

@router.post("/generate")
def generate_response(request: PromptRequest):
    try:
        response = requests.post(
            f"{OLLAMA_HOST}/api/generate",
            json={
                "model": "llama3",
                "prompt": request.prompt,
                "keep_alive": "5m"
            },
            stream=True,
            timeout=90
        )
        response.raise_for_status()

        full_response = ""
        for line in response.iter_lines():
            if line:
                try:
                    chunk = line.decode("utf-8")
                    data = json.loads(chunk)
                    full_response += data.get("response", "")
                    if data.get("done", False):
                        break
                except Exception as e:
                    print("Decode error on chunk:", line)
                    continue

        return {"response": full_response}

    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="Ollama timed out. Try a shorter prompt.")
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Ollama error: {str(e)}")

@router.post("/generate/stream")
def generate_stream_response(request: PromptRequest):
    def stream():
        try:
            response = requests.post(
                f"{OLLAMA_HOST}/api/generate",
                json={
                    "model": "llama3",
                    "prompt": request.prompt,
                    "stream": True,
                    "keep_alive": "5m"
                },
                stream=True,
                timeout=90
            )
            response.raise_for_status()

            for line in response.iter_lines():
                if line:
                    yield line.decode("utf-8") + "\n"

        except requests.exceptions.Timeout:
            yield "Ollama timed out. Try a shorter prompt.\n"
        except requests.exceptions.RequestException as e:
            yield f"Ollama error: {str(e)}\n"

    return StreamingResponse(stream(), media_type="text/plain")
