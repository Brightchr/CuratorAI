# main.py
import httpx
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.post("/api/generate")
async def proxy_to_ollama(request: Request):
    body = await request.json()
    try:
        # <-- timeout=30.0 applies to connect/read/write/pool all
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post("http://ollama:11434/api/generate", json=body)
        return JSONResponse(content=resp.json(), status_code=resp.status_code)

    except httpx.HTTPStatusError as e:
        return JSONResponse({"error": f"HTTP {e.response.status_code}", "details": e.response.text},
                            status_code=e.response.status_code)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
