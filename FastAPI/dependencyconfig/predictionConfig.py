from fastapi import *

from controllers.predictionController import PredictionController
from services.predictionService import PredictionService
from models.modelImpl.linearRegressionImpl import LinearRegressionImpl
from repository.baseModelML import RegressionModel

def getRegressionModel():
    return LinearRegressionImpl()

def getPredictionService(regressionModel: RegressionModel=Depends(getRegressionModel)):
    return PredictionService(regressionModel)

def getPredictionController(predictionService:PredictionService=Depends(getPredictionService)):
    return PredictionController(predictionService)