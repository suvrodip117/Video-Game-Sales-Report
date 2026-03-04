import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from featureengineering.transformation import logTransform
from featureengineering.scaler import standardScale

def featureEngineer(df,featureColumns,targetColumn):
    #logTransform(df,featureColumns,targetColumn)
    df = standardScale(df,featureColumns,targetColumn)
    return df