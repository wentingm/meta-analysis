from fastapi import APIRouter
from controllers.semanticscholar import search_papers_controller, screen_papers_controller, analyze_papers_controller, extract_papers_controller

semantic_scholar_api = APIRouter()

@semantic_scholar_api.get("/testing")
def testing():
  return {"message": "success"}

@semantic_scholar_api.get("/papers")
def search_papers_route(query: str, year: str = None):
  return search_papers_controller(query, year)

@semantic_scholar_api.post("/screen")
def screen_papers_route(inclusion: list = None, exclusion: list = None):
  return screen_papers_controller(inclusion, exclusion)

@semantic_scholar_api.get("/analysis")
def analyze_papers_controller():
  return analyze_papers_controller()

@semantic_scholar_api.post("/extract")
def extract_papers_controller():
  return extract_papers_controller()