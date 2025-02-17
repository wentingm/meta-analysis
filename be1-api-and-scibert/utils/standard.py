import urllib.parse as url_parser
import re


"""
Extracts relevant text (title, abstract, keywords) from metadata.
Parameters:
    data: JSON
Returns:
    text
"""
def extract_text_from_dict(obj: dict) -> str:
    paper_data = obj.get("data", [])
    if not paper_data or not isinstance(paper_data, list):
        return ""

    text_list = []
    for paper in paper_data:
        title = paper.get("title", "")
        abstract = paper.get("abstract", "")
        keywords = ", ".join(field.get("category", "") for field in paper.get("s2FieldsOfStudy", []))
        text_list.append(f"{title}. {abstract} Keywords: {keywords}")

    return " ".join(text_list).strip()


"""
Function to combine PICO elements and additional keywords to create a search query
Parameters:
    pop, inter, comp, outcome: Population Intervention Comparison Outcome (PICO)
    year: date range of the papers searched
    add_keywords: additional keywords
Returns:
    text
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


def clean_text(text: str) -> str:
    pattern1 = r"\b(or|[,*])\b" # Matches commas or "or"
    text = re.sub(pattern1, " | ", text)
    pattern2 = r"\s{2,}"  # Matches two or more spaces
    text = re.sub(pattern2, " ", text)
    return text.strip()