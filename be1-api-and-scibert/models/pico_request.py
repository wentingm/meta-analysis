# models/pico_request.py
from pydantic import BaseModel
from typing import List, Union

class PICORequest(BaseModel):
    pico_dict: dict
    paper_data: Union[dict, str]
    THRESHOLD: float = 0.65  # Default value for threshold

class PICORequest2(BaseModel):
    pico_dict: dict
    data_list: List[Union[dict, str]]  # List of papers (dict or str)
    THRESHOLD: float = 0.65
