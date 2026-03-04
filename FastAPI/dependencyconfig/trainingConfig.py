from fastapi import *
from sklearn.linear_model import LinearRegression

from services.trainingService import TrainingService
from controllers.trainingController import TrainingController
from repository.baseModelML import RegressionModel

def getRegressionModel():
    return LinearRegression()

def getTrainingService(regressionModel:RegressionModel=Depends(getRegressionModel) ):
    return TrainingService(regressionModel)


def getTrainingController(trainingService: TrainingService=Depends(getTrainingService)):
    return TrainingController(trainingService)
