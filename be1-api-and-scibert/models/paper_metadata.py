from pydantic import BaseModel
from typing import List, Optional

class FieldOfStudy(BaseModel):
    category: str

class PaperMetadata(BaseModel):
    title: str = ""
    abstract: str = ""
    s2FieldsOfStudy: Optional[List[FieldOfStudy]] = []
