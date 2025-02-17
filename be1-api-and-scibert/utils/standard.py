import urllib.parse as url_parser
import re
from fastapi import HTTPException
from models.paper_metadata import PaperMetadata
from models.pico_dict import PicoDict
from models.paper_data import PaperData


"""
Extracts relevant text (title, abstract, keywords) from paper metadata.
Parameters:
    paper_metadata: JSON
Returns:
    string: text
"""
def extract_text_from_paper_metadata(paper_metadata: dict | PaperMetadata) -> str:
    if not paper_metadata:
        return ""
    
    # Convert dict to Pydantic model if needed
    if isinstance(paper_metadata, dict):
        try:
            paper_metadata = PaperMetadata(**paper_metadata)  # Convert to Pydantic model
        except Exception as e:
            print(f"Error converting dict to PaperMetadata: {e}")
            return ""
        
    # Ensure attributes are accessed safely
    title = paper_metadata.title or ""
    abstract = paper_metadata.abstract or ""
    
    # Handle missing s2FieldsOfStudy gracefully
    s2_fields_of_study = getattr(paper_metadata, "s2FieldsOfStudy", [])
    keywords = ", ".join(field.category for field in s2_fields_of_study if hasattr(field, 'category')) or ""
        
    return f"{title}. {abstract}. {keywords}"



"""
Form a text from PICO dict.
Parameters:
    pico_dict: Population Intervention Comparison Outcome (JSON)
Returns:
    string: text
"""
def extract_text_from_pico(pico_dict: PicoDict) -> str:
    if not pico_dict or not pico_dict["pop"] or not pico_dict["inter"] or not pico_dict["comp"] or not pico_dict["outcome"]:
        return ""
    return f"{pico_dict['pop']} {pico_dict['inter']} {pico_dict['comp']} {pico_dict['outcome']}"


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
    fields = "title,authors,year,abstract,venue,openAccessPdf,influentialCitationCount,citations,references,referenceCount,publicationTypes,publicationDate,fieldsOfStudy,s2FieldsOfStudy,isOpenAccess,corpusId"

    api_url = f"https://api.semanticscholar.org/graph/v1/paper/search?query={encoded_query}&fields={fields}"

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
def extract_paper_data(paper_data: PaperData | dict | str):
    if isinstance(paper_data, str):
        return paper_data

    paper_text = None
    if isinstance(paper_data, PaperData):  # PaperData object
        paper_text = extract_text_from_paper_metadata(paper_data)
    elif isinstance(paper_data, dict):  # Dictionary (should be converted to PaperData)
        try:
            # Use parse_obj to convert dict to PaperData model
            paper_data = PaperData.parse_obj(paper_data)
            paper_text = extract_text_from_paper_metadata(paper_data)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error converting dictionary to PaperData: {str(e)}")
    else:
        raise HTTPException(status_code=400, detail="Invalid input. Expected JSON, dictionary, or string.")

    if not paper_text:
        raise HTTPException(status_code=400, detail="No valid text found in metadata.")

    return paper_text