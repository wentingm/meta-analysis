"""
Semantic Scholar Integration

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

POST /api/screen
- Submit paper for screening
- Receive screening results
- Confidence scores

GET /api/analysis
- Retrieve analysis results
- Forest plot data
- Basic statistics

POST /api/extract
- Submit paper for data extraction
- Receive extracted data
- Validation results
"""
from fastapi import APIRouter, Query
from fastapi.responses import Response, PlainTextResponse
import requests
from urllib.parse import urlparse, parse_qs, quote_plus


router = APIRouter()

@router.get("/papers/search")
def search_papers(input: str = Query(..., description="Search query for papers")):
    encoded_input = quote_plus(input)
    fields = "title,authors,year,abstract"
    api_url = f"https://api.semanticscholar.org/graph/v1/paper/search?query={encoded_input}&fields={fields}"
    print("Requesting:", api_url)  # Debugging output
    
    response = requests.get(api_url)  # No need for `params`
    
    if response.status_code == 200:
        return response.json()  # Return the actual response from Semantic Scholar API
    else:
        return {"error": "Failed to fetch papers", "status_code": response.status_code}