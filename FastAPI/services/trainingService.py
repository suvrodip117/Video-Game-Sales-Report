from db import loadDatabase
from datacleaning.datacleaning import cleanDataFrame
from featureengineering.featureEngineer import featureEngineer
from datacleaning.encoding import encodeTrainingData
from jsonConfig.modelMetricsConfig import configureMetrics, generateMetricsJsonData

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from joblib import dump
from sklearn.metrics import r2_score
import os
from dotenv import load_dotenv
import numpy as np
import matplotlib.pyplot as plt
import io
import base64
from scipy.stats import linregress

load_dotenv()
RESPONSE_FILE=os.getenv("RESPONSE_FILE")
MODEL_DIR = os.getenv("MODEL_DIR")

class TrainingService():
    def __init__(self, regressionModel):
        self.regressionModel=regressionModel

    def trainModel(self):
        #Loading database into data frame
        df=loadDatabase()

        #Cleaning the data frame, checking for missing values etc.
        df=cleanDataFrame(df)
        
        #feature engineering
        #Encoding categorical features
        if "Platform_Group" in df.columns:
            df=encodeTrainingData(df,'Platform_Group')

        #Plotting regression model and storing it in models dir
        regressionPlots = self.plotBestFitLine(df)

        featureColumns = ['Game_Year','NA_Sales','EU_Sales','JP_Sales','Other_Sales']
        df=featureEngineer(df,featureColumns,'Global_Sales')
        #print(df['Global_Sales'].head(3))   
        
        #training the dataset
        X = df.drop('Global_Sales', axis=1)
        y=df['Global_Sales']

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        #model = LinearRegression()
        self.regressionModel.fit(X_train, y_train)
        y_pred = self.regressionModel.predict(X_test)

        #Metrics configuration and generation of metrics json 
        mse, mae, rmse, r2, adjR2 = configureMetrics(X_test, y_test,y_pred)
        generateMetricsJsonData("LinearRegression", mse, mae, rmse, r2, adjR2)
        print('r2',r2*100)
        print('y_pred',y_pred) 

        dump(self.regressionModel, os.path.join(MODEL_DIR, "LinearRegressionModel1.joblib"))

        return {
            "status": "Model Training Complete",
            "plots": regressionPlots
        }
    
    def plotBestFitLine(self,df):
        print("plotting best fit line called")
        features=['NA_Sales','EU_Sales','JP_Sales','Other_Sales']
        regressionPlots={}
        for col in features:
            fig, ax = plt.subplots(figsize=(8,5))
            ax.scatter(df[col].values, df["Global_Sales"].values,color="skyblue",label="Data point")
            linear_regressor = linregress(df[col].values, df["Global_Sales"].values)
            slope=linear_regressor.slope
            intercept=linear_regressor.intercept
            bestFitLine=slope*df[col].values+intercept
            ax.plot(df[col].values, bestFitLine,label="Best fit line", color="red")
            ax.set_title(f"{col} vs Global Sales best fit line")
            ax.set_xlabel(col)
            ax.set_ylabel("Global Sales")
            ax.legend()
            
            buffer = io.BytesIO()
            fig.savefig(buffer, format="png")
            regressionPlots[col] = base64.b64encode(buffer.getvalue()).decode()
            plt.close(fig)
        return regressionPlots

