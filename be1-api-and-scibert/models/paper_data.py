from pydantic import BaseModel
from typing import List, Optional


class OpenAccessPDF(BaseModel):
    url: Optional[str] = None
    status: Optional[str] = None


class Citation(BaseModel):
    paper_id: Optional[str] = None
    title: Optional[str] = None


class Reference(BaseModel):
    paper_id: Optional[str] = None
    title: Optional[str] = None


class Author(BaseModel):
    name: Optional[str] = None
    affiliation: Optional[str] = None
    email: Optional[str] = None


class PaperData(BaseModel):
    paper_id: Optional[str] = None
    corpus_id: Optional[int] = None
    title: Optional[str] = None
    abstract: Optional[str] = None
    venue: Optional[str] = None
    year: Optional[int] = None
    reference_count: Optional[int] = None
    influential_citation_count: Optional[int] = None
    is_open_access: Optional[bool] = None
    open_access_pdf: Optional[OpenAccessPDF] = None
    fields_of_study: Optional[List[str]] = None
    s2_fields_of_study: Optional[List[dict]] = None
    publication_date: Optional[str] = None
    authors: Optional[List[Author]] = None
    citations: Optional[List[Citation]] = None
    references: Optional[List[Reference]] = None