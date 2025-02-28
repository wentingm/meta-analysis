from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import Response, PlainTextResponse
from services.semanticscholar import search_papers
from utils.standard import build_semantic_scholar_url # manually creates search query
from services.openai import build_semantic_scholar_url_ai # AI-created search query


"""
Search using Scholarly Semantic API based on PICO, year, and additional keywords
Parameters
    pop, inter, comp, outcome: Population Intervention Comparison Outcome (PICO)
    year: date range of the papers searched
    add_keywords: additional keywords
"""
def search_papers_controller(pop, inter, comp, outcome, add_keywords = None, year: str = None):
    api_url = build_semantic_scholar_url(pop, inter, comp, outcome, add_keywords, year)

    if not api_url:
        raise HTTPException(status_code=400, detail="Invalid input. Expected JSON or string.")        

    try:
        return search_papers(api_url)
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
    
    # result = screen_papers_model(criteria)
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