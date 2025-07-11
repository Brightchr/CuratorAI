import json
import os
import requests
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from app.prompts.curator import get_curator_prompt


router = APIRouter()
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://ollama:11434")


class PromptRequest(BaseModel):
    prompt: str


@router.post("/generate")
def generate_full_response(request: PromptRequest):
    """
    Fallback route: waits for full response before returning.
    """
    try:
        response = requests.post(
            f"{OLLAMA_HOST}/api/generate",
            json={
                "model": "llama3",
                "prompt": get_curator_prompt(request.prompt),
                "keep_alive": "5m"
            },
            timeout=90
        )
        response.raise_for_status()

        full_response = ""
        for line in response.iter_lines():
            if line:
                try:
                    data = json.loads(line.decode("utf-8"))
                    full_response += data.get("response", "")
                    if data.get("done"):
                        break
                except Exception as e:
                    print("Decode error:", e)
                    continue

        return {"response": full_response}

    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="Ollama timed out. Try a shorter prompt.")
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Ollama error: {str(e)}")


@router.post("/generate/stream")
async def generate_stream_response(request: PromptRequest):
    """
    Streaming route: returns response chunks as they arrive.
    """
    def stream():
        try:
            print("🛰️ Streaming request received for prompt:", request.prompt) #remove for debug
            response = requests.post(
                f"{OLLAMA_HOST}/api/generate",
                json={
                    "model": "llama3",
                    "prompt": get_curator_prompt(request.prompt),
                    "stream": True,
                    "keep_alive": "5m"
                },
                stream=True,
                timeout=90
            )
            response.raise_for_status()

            for line in response.iter_lines():
                if line:
                    try:

                        data = json.loads(line.decode("utf-8"))
                        content = data.get("response", "")
                        if content:
                            yield f'{json.dumps({"response": content})}\n'
                        if data.get("done"):
                            break
                    except Exception as e:
                        print(f"Stream decode error: {e}")
                        continue
        except requests.exceptions.Timeout:
            yield json.dumps({"error": "Ollama timed out. Try a shorter prompt."}) + "\n"
        except requests.exceptions.RequestException as e:
            yield json.dumps({"error": f"Ollama request failed: {str(e)}"}) + "\n"

    return StreamingResponse(
        stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )

