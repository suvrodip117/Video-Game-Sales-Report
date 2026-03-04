from fastapi import *
from train import trainModel
import json
from dotenv import load_dotenv
import os

from controllers.predictionController import PredictionController
from validationSchema.predictionRequestDTO import PredictionRequestDto
from dependencyconfig.predictionConfig import getPredictionController
from controllers.trainingController import TrainingController
from dependencyconfig.trainingConfig import getTrainingController


app=FastAPI()
load_dotenv()
RESPONSE_FILE=os.getenv("RESPONSE_FILE")

@app.post("/train")
def trainModel(trainingController:TrainingController=Depends(getTrainingController)):
    print("Training started!!")
    return trainingController.train()


@app.post("/predict")
def predict(request: PredictionRequestDto, predictionController: PredictionController = Depends(getPredictionController)):
    print("Request--", request)
    return predictionController.predict(**request.model_dump())

#----------pinging to fastapi render endpoint to stop server sleep--------
@app.get("/ping")
def pingAppScript():
    print("appscript called")
    return "ping"

