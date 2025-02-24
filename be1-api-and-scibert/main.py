import uvicorn # Running server
from fastapi import FastAPI # Web framework
from routes.bert import bert_api
from routes.semanticscholar import semantic_scholar_api
from dotenv import load_dotenv
import os

load_dotenv() # load env variables
app = FastAPI() # Web Framework for building APIs

# Include routes
app.include_router(bert_api, prefix="/api")
app.include_router(semantic_scholar_api, prefix="/api")

# Test server if it's running
@app.get("/")
def is_server_running():
    return { "status": True, "message": "The server is currently running." }

# Server Configuration and Launch
if __name__ == "__main__":
    # env variables
    local_ip = os.getenv("SERV_LOCAL_IP", "127.0.0.1")
    public_ip = os.getenv("SERV_PUBLIC_IP")
    python_env = os.getenv("PYTHON_ENV", "development")
    serv_port = int(os.getenv("SERV_PORT", 8000))

    domain = public_ip if python_env == "production" else local_ip
    reload_status = python_env == "production"
    uvicorn.run("main:app", host=domain, port=serv_port, reload=reload_status)