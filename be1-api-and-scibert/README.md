# About

Search papers using Semantic Scholar API using PICO input from user and screen using SciBert for similarity text and LLMs for more specific filterings.
By: Kyle Huang

## Features

* Semantic Scholar Integration
* SciBERT

## Instructions (Linux)

1. **Use python virtual environment:** ``python -m venv venv``
2. **Activate virtual environment:** ``source venv/bin/activate``
3. **Install Dependencies:** ``pip install -r requirements.txt``
4. **Run Application:**

   * Run development mode using uvicorn: ``uvicorn main:app --reload``
   * Run production: uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
     * `--host 0.0.0.0`: Allows external access (use `127.0.0.1` for local-only access).
     * `--port 8000`: Runs on port 8000 (change if needed).
     * `--workers 4`: Runs multiple worker processes (adjust based on CPU cores).
   * Check out gunicorn for a more robust production setup: ``gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:8000``

## Set Production with Docker

1. Create Docker File

   ```
   # Use a lightweight Python image
   FROM python:3.11

   # Set the working directory
   WORKDIR /app

   # Copy requirements and install dependencies
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt

   # Copy the FastAPI app
   COPY . .

   # Expose the port FastAPI runs on
   EXPOSE 8000

   # Command to run the app in production
   CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:8000"]

   ```
2. Build Docker Image

   * Run command: ``docker build -t my-fastapi-app .``
3. Run the Container

* `-d`: Runs in detached mode.
* `--name fastapi-container`: Names the container.
* `-p 8000:8000`: Maps container port `8000` to the host's port `8000`.

4. Run with Docker Compose (optional):

```
version: "3.8"

services:
  fastapi:
    build: .
    container_name: fastapi-container
    ports:
      - "8000:8000"
    restart: always
```

* Command: ``docker-compose up -d``
