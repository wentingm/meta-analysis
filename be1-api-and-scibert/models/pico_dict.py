from pydantic import BaseModel

class PicoDict(BaseModel):
    pop: str
    inter: str
    comp: str
    outcome: str