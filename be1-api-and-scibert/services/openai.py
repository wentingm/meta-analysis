"""
For Screening the Papers.

LLM Integration
===============
GPT-4o implementation
Core functionality:
  - Inclusion/exclusion criteria
  - Initial screening
  - Confidence scoring

Prompt templates for:
  - Paper relevance
  - Data availability
  - Study type identification

Data Extraction
===============
Table extraction focus:
  - Sample sizes
  - Effect sizes
  - Basic statistics

Validation rules:
  - Data type checking
  - Range validation
  - Required fields
"""
import os
from utils.standard import url_parser
from openai import OpenAI
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client
client = OpenAI(api_key=OPENAI_API_KEY)

def generate_semantic_scholar_query(population, intervention, comparison, outcome, additional_keywords=None):
    """
    Uses OpenAI to generate a Semantic Scholar API-compatible query based on PICO elements.
    """
    prompt = f"""
    Given the following PICO elements:
    - Population: {population}
    - Intervention: {intervention}
    - Comparison: {comparison}
    - Outcome: {outcome}
    
    Format the query using Semantic Scholar API search rules:
    - Use "+" for AND
    - Use "|" for OR
    - Use "-" for NOT
    - Use quotes ("") for exact phrases
    - Use "*" for wildcard searches
    - Use parentheses () for grouping
    
    Ensure the query is concise, relevant, and formatted correctly.
    """

    if additional_keywords:
        prompt += f" Include additional keywords: {additional_keywords}."

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are an expert in constructing academic search queries."},
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )

    query = response.choices[0].message.content.strip()
    
    return query

def build_semantic_scholar_url_ai(pop, inter, comp, outcome, keywords=None):
    """
    Generates a complete API URL for searching Semantic Scholar.
    """
    query = generate_semantic_scholar_query(pop, inter, comp, outcome, keywords)
    encoded_query = url_parser.quote(query)

    api_url = f"https://api.semanticscholar.org/graph/v1/paper/search?query={encoded_query}"
    return api_url


# # Example Usage
# if __name__ == "__main__":
#     pop = "K-12 students"
#     inter = "Intelligent Tutoring Systems"
#     comp = "Traditional Teaching Methods"
#     outcome = "Improvement in post-test or exam results"
#     keywords = "adaptive learning, education technology"

#     api_url = build_semantic_scholar_url(pop, inter, comp, outcome, keywords)
#     print("Semantic Scholar API URL:", api_url)