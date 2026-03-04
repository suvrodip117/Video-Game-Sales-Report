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

load_dotenv()
RESPONSE_FILE=os.getenv("RESPONSE_FILE")
MODEL_DIR = os.getenv("MODEL_DIR")

def trainModel():
    #Loading database into data frame
    df=loadDatabase()

    #Cleaning the data frame, checking for missing values etc.
    df=cleanDataFrame(df)
    
    #feature engineering
     #Encoding categorical features
    if "Platform_Group" in df.columns:
        df=encodeTrainingData(df,'Platform_Group')
    featureColumns = ['Game_Year','NA_Sales','EU_Sales','JP_Sales','Other_Sales']
    df=featureEngineer(df,featureColumns,'Global_Sales')
    #print(df['Global_Sales'].head(3))   
    
    #training the dataset
    X = df.drop('Global_Sales', axis=1)
    y=df['Global_Sales']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = LinearRegression()
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    #Metrics configuration and generation of metrics json 
    mse, mae, rmse, r2, adjR2 = configureMetrics(X_test, y_test,y_pred)
    generateMetricsJsonData("LinearRegression", mse, mae, rmse, r2, adjR2)
    print('r2',r2*100)
    print('y_pred',y_pred) 

    dump(model, os.path.join(MODEL_DIR, "LinearRegressionModel1.joblib"))