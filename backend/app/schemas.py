from pydantic import BaseModel

class SectionData(BaseModel):
    title: str
    abstract: str
    link: str
