import pandas as pd
import numpy as np

def cleanDataFrame(df):
    #Dropping unncecessary columns
    droppingColumnsArr={'Name', 'id', 'Genre', 'Publisher','Game_Rank'}
    df=df.drop(droppingColumnsArr, axis=1, errors="ignore")

    #Checking for missing entries
    missingCount=df.isnull().sum().sum()
    if missingCount>0:
        df.dropna(inplace=True)
        
    #check for duplicates
    duplicateCount=df.duplicated().sum()
    if duplicateCount>0:
        df=df.drop_duplicates()
    
    #Dropping Platform since many categories are there and may cause curse of dimensionality during encoding.
    if "Platform" in df.columns:
        df=df.drop("Platform",axis=1)
    
    return df
    