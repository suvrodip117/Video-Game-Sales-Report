import pandas as pd
from joblib import load
import numpy as np
from dotenv import load_dotenv
import os
import json

load_dotenv()
MODEL_METRICS_PATH=os.getenv("MODEL_METRICS_PATH")

from datacleaning.datacleaning import cleanDataFrame
from repository.baseModelML import RegressionModel

class PredictionService:
    def __init__(self, regression_model: RegressionModel):
        self.regressionModel=regression_model


    def predictGlobalSales(self,requestDict):
        df=self.prepareDataFrame(requestDict)
        df=cleanDataFrame(df)
        #print(df.head())

        #Encoding categorical features
        df=self.encodeCategoricalData(df, ["Platform_Group"])
        #print(df.columns)

        #Scaling the test data
        #Calling Standard Scaler models
        standard_scalar_feature=load("models/FeatureStandardScalar.joblib")
        featuresStandardScalar=standard_scalar_feature.feature_names_in_
        print('featuresStandardScalar',featuresStandardScalar)
        df[featuresStandardScalar]=standard_scalar_feature.transform(df[featuresStandardScalar])

        #Model Prediction
        #print('Model Columns during Prediction',self.regressionModel.feature_names_in_)
        predictedValue=self.regressionModel.modelPrediction(df)

        #Inverse Scaling to get actual output
        standard_scalar_target=load("models/TargetStandardScalar.joblib")
        predictedValueActual = standard_scalar_target.inverse_transform(predictedValue.reshape(-1,1))
        print(predictedValueActual[0][0])

        #Loading metrics json
        if not MODEL_METRICS_PATH:
            raise RuntimeError("Model Metrics Path is not defined/set up")
        with open(MODEL_METRICS_PATH) as metricsFile:
            metricsJson =  json.load(metricsFile)
        return {"predictedValue":float(predictedValueActual[0][0]),
                "performance":metricsJson}


    def prepareDataFrame(self,requestDict):
        df=pd.DataFrame([requestDict])
        return df
    

    def encodeCategoricalData(self, df, cols):
        one_hot_encoder=load("models/onehotencoder.joblib")
        dfEncode=one_hot_encoder.transform(df[cols])
        df=pd.concat([df,dfEncode],axis=1).drop(columns=cols)
        return df 