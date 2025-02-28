from fastapi import APIRouter, Query
from controllers.semanticscholar import search_papers_controller, screen_papers_controller, analyze_papers_controller, extract_papers_controller

semantic_scholar_api = APIRouter()

# Search for papers using PICO
@semantic_scholar_api.get("/papers")
def search_papers_route(
    pop: str = Query(..., description="Population (PICO)"),
    inter: str = Query(..., description="Intervention (PICO)"),
    comp: str = Query(..., description="Comparison (PICO)"),
    outcome: str = Query(..., description="Outcome (PICO)"),
    year: str = Query(None, description="Year range (optional)"),
    add_keywords: str = Query(None, description="Additional keywords (optional)"),
):
  return search_papers_controller(pop, inter, comp, outcome, year, add_keywords)

@semantic_scholar_api.post("/screen")
def screen_papers_route(inclusion: list = None, exclusion: list = None):
  return screen_papers_controller(criteria)

@semantic_scholar_api.get("/analysis")
def analyze_papers_controller():
  return analyze_papers_controller()

@semantic_scholar_api.post("/extract")
def extract_papers_controller():
  return extract_papers_controller()