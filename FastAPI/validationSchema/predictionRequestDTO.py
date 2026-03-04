from pydantic import BaseModel, Field

class PredictionRequestDto(BaseModel):
    gameRank: int=Field(alias="gameRank")
    name: str=Field(alias="name")
    platform: str=Field(alias="platform")
    platformGroup: str=Field(alias="platformGroup")
    gameYear: int=Field(alias="gameYear")
    genre: str=Field(alias="genre")
    publisher: str=Field(alias="publisher")
    naSales: float=Field(alias="naSales")
    euSales: float=Field(alias="euSales")
    jpSales: float=Field(alias="jpSales")
    otherSales: float=Field(alias="otherSales")