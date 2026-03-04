import json
import os
from dotenv import load_dotenv
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
import numpy as np

load_dotenv()
MODEL_METRICS_PATH=os.getenv("MODEL_METRICS_PATH")

def configureDict(modelName, mse, mae, rmse, r2, adjR2):
    metricsDict={
        "modelName":modelName,
        "metrics":{
            "mse":float(mse),
            "mae":float(mae),
            "rmse":float(rmse),
            "r2":float(r2),
            "adjR2":float(adjR2)
        }
    }
    return metricsDict

def generateMetricsJsonData(modelName, mse, mae, rmse, r2, adjR2):
    if not MODEL_METRICS_PATH:
        raise RuntimeError("Model Metrics Path is not defined/set up")
    metricsDict=configureDict(modelName, mse, mae, rmse, r2, adjR2)
    with open(MODEL_METRICS_PATH,"w") as metricsFile:
        json.dump(metricsDict, metricsFile, indent=4)   
    

def configureMetrics(X_test, y_test,y_pred):
    n=X_test.shape[0]
    p=X_test.shape[1]
    mse=mean_squared_error(y_test,y_pred)
    mae=mean_absolute_error(y_test,y_pred)
    rmse=np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)
    adjR2 = 1-((1-r2)*(n-1)/(n-p-1))
    return mse, mae, rmse,r2, adjR2