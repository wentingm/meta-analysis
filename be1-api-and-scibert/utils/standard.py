import urllib.parse as url_parser
import re
from fastapi import HTTPException


"""
Extracts relevant text (title, abstract, keywords) from paper metadata.
Parameters:
    paper_metadata: JSON
Returns:
    string: text
"""
def extract_text_from_paper_metadata(paper_metadata: dict) -> str:
    if not paper_metadata:
        return ""

    title = paper_metadata.get("title", "")
    abstract = paper_metadata.get("abstract", "")
    keywords = ", ".join(field.get("category", "") for field in paper_metadata.get("s2FieldsOfStudy", []))
    return f"{title}. {abstract} Keywords: {keywords}"


"""
Forms PICO into a single string.
Parameters:
    pop, inter, comp, outcome: Population Intervention Comparison Outcome (PICO)
Returns:
    string: text
"""
def extract_text_from_pico(pop: str, inter: str, comp: str, outcome: str) -> str:
    if not pop or not inter or not comp or not outcome:
        return ""
    return f"{pop} {inter} {comp} {outcome}"


"""
Function to combine PICO elements and additional keywords to create a search query
Parameters:
    pop, inter, comp, outcome: Population Intervention Comparison Outcome (PICO)
    year: date range of the papers searched
    add_keywords: additional keywords
Returns:
    string: text
"""
def build_semantic_scholar_url(pop, inter, comp, outcome, add_keywords: str = None) -> str:    
    if not pop or not inter or not comp or not outcome:
        return ""

    # Use a set to remove duplicates
    search_terms = set()

    search_terms.add(pop)
    search_terms.add(inter)
    search_terms.add(comp)
    search_terms.add(outcome)
    
    # Start building the base query
    query = ""
    if len(search_terms) == 4:
        query += f"({pop}) + ({inter} | {comp}) + ({outcome})"
    else:
        query += ") + (".join(search_terms)  # Concatenate terms with ' + ' and sort for consistency
        query = '(' + query + ')'

    if add_keywords:
        query += f"+ ({add_keywords})"

    # Clean up multiple spaces in the final query string
    encoded_query = url_parser.quote(clean_text(query))

    api_url = f"https://api.semanticscholar.org/graph/v1/paper/search?query={encoded_query}"

    return api_url


"""
Clean text by replacing commas or "or" into " | " and remove leading spaces
Parameters:
    text: text
Returns:
    string: text
"""
def clean_text(text: str) -> str:
    pattern1 = r"\b(or|[,*])\b" # Matches commas or "or"
    text = re.sub(pattern1, " | ", text)
    pattern2 = r"\s{2,}"  # Matches two or more spaces
    text = re.sub(pattern2, " ", text)
    return text.strip()


"""
Extract paper data in form of text or JSON into text
Parameters:
    paper_data: text or JSON of paper data
Returns:
    string: text
"""
def extract_paper_data(paper_data):
    paper_text = None
    if isinstance(paper_data, dict):  # Metadata JSON
        paper_text = extract_text_from_paper_metadata(paper_data)
    elif isinstance(paper_data, str):  # Plain text
        paper_text = paper_data
    else:
        raise HTTPException(status_code=400, detail="Invalid input. Expected JSON or string.")

    if not paper_text:
        raise HTTPException(status_code=400, detail="No valid text found in metadata.")

    return paper_data