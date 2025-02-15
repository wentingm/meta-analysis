from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import Response, PlainTextResponse
from services.semanticscholar import search_papers
# from models import screen_papers, analyze_papers, extract_papers


"""
Parameters
query: what the user wants to search
year: date range of the papers searched
"""
def search_papers_controller(query: str, year: str = None):
    # Search using Scholarly Semantic API based on query and year 
    try:
        return search_papers(query, year)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


"""
Parameters
inclusion: Inclusion criteria
exlusion: exclusion criteria
"""
def screen_papers_controller(inclusion: list = None, exclusion: list = None):
    # if not isinstance(inclusion, list) or not isinstance(exclusion, list):
    #     raise HTTPException(status_code=400, detail="Invalid input format. Must be lists.")
    
    # result = screen_papers_model(inclusion, exclusion)
    # return result
    return {"error": 500}


"""
"""

def analyze_papers_controller():
    return {"error": 500}


"""
"""
def extract_papers_controller():
    return {"error": 500}