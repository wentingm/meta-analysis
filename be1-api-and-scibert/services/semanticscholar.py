import requests
from urllib.parse import quote_plus



"""
Semantic Scholar API

API endpoint: api.semanticscholar.org
Rate limit: 100 requests/5min
Key metadata:

Title, authors, year
Abstract
Citations
DOI


GET /api/papers
  - Search and filter papers
  - Pagination support
  - Basic sorting

Parameters
query: what the user wants to search
year: date range of the papers searched

Fields returned:


API call examples:
1. http://127.0.0.1:8000/api/search?query=deep learning
    query="deep learning"
2. http://127.0.0.1:8000/api/search?query=deep learning&years=2017-2024
    query="deep learning"
    year="2017-2024"
"""
def search_papers(api_uri, year: str = None):
    try:
        if year:
            api_uri += f"&year={year}"

        response = requests.get(api_uri, timeout=10)

        if response.status_code == 200:
            return response.json()
        elif response.status_code == 429:
            return {"error": "Rate limit exceeded. Try again later.", "status_code": 429}
        else:
            return {"error": "Failed to fetch papers", "status_code": response.status_code}
    except requests.RequestException as e:
        return {"error": "Request failed", "details": str(e)}

"""
POST /api/screen
  - Submit paper for screening
  - Receive screening results
  - Confidence scores

Paramters
inclusion: Inclusion criteria
exlusion: exclusion criteria

"""
def screen_papers(inclusion: list, exclusion: list):
    return {"error": 500}


"""
GET /api/analysis
  - Retrieve analysis results
  - Forest plot data
  - Basic statistics
"""
def analyze_papers():
    return {"error": 500}


"""
POST /api/extract
  - Submit paper for data extraction
  - Receive extracted data
  - Validation results
"""
def extract_papers():
    return {"error": 500}