from sklearn.preprocessing import OneHotEncoder
import pandas as pd
from joblib import dump
import os

def encodeTrainingData(df, column):
    ohe=OneHotEncoder(handle_unknown='ignore', sparse_output=False).set_output(transform='pandas')
    dfEncode = ohe.fit_transform(df[[column]])
    df=pd.concat([df,dfEncode],axis=1).drop(columns=[column])

    save_dir = "models"
    dump(ohe, os.path.join(save_dir, "onehotencoder.joblib"))
    return df