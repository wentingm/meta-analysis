import uvicorn
from fastapi import FastAPI
from routes import scibert, semanticscholar

app = FastAPI()

# Include routes
app.include_router(scibert.router, prefix="/api")
app.include_router(semanticscholar.router, prefix="/api")


app.get("/")
def testing():
    return { "response": 200 }

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)