import os
from dotenv import load_dotenv

load_dotenv()

class PredictionController():
    def __init__(self, predictionService):
        self.RESPONSE_FILE=os.getenv("RESPONSE_FILE")
        self.predictionService=predictionService
    
    def predict(self, gameRank, name, platform, platformGroup,
            gameYear, genre, publisher,
            naSales, euSales, jpSales, otherSales):
        requestDict=self.prepareRequestDict(gameRank, name, platform, platformGroup, gameYear, genre, publisher, naSales, euSales, jpSales, otherSales)
        predictionResponse = self.predictionService.predictGlobalSales(requestDict)
        return predictionResponse
    
    def prepareRequestDict(self, gameRank, name, platform, platformGroup,gameYear, genre, publisher,naSales, euSales, jpSales, otherSales):
        requestDict={
            "Name": name,
            "Game_Rank": gameRank,
            "Platform": platform,
            "Platform_Group": platformGroup,
            "Game_Year": gameYear,
            "Genre": genre,
            "Publisher": publisher,
            "NA_Sales": naSales,
            "EU_Sales": euSales,
            "JP_Sales": jpSales,
            "Other_Sales": otherSales
        }
        return requestDict
