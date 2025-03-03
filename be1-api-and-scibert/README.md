# About

Get papers from the API and filter using SciBERT using more specifications.
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
   * Run development mode using fastapi: ``fastapi dev main.py``
   * Run production: ``fastapi run``
