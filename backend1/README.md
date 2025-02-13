# About
Get papers from the API and filter using SciBERT using more specifications.
## Features
* Semantic Scholar Integration
* SciBERT

## Instructions
1. **Use python virtual environment:** ```python -m venv env```
2. **Activate virtual environment**
    * Linux: ```source env/bin/activate```
    * Windows, in the directory of where main.py is: ```activate```
3. **Install Dependencies:** ```python3 install -r requirements.txt```
4. **Run Application:**
    * Run development mode using uvicorn: ```uvicorn main:app --reload```
    * Run development mode using fastapi: ```fastapi dev main.py```
    * Run production: ```fastapi run```