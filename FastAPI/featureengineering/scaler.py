from sklearn.preprocessing import StandardScaler
from joblib import dump
import os

def standardScale(df,featureColumns,targetColumn):
    featureScaler=StandardScaler()
    df[featureColumns] = featureScaler.fit_transform(df[featureColumns])
    targetScaler=StandardScaler()
    df[[targetColumn]] = targetScaler.fit_transform(df[[targetColumn]])

    save_dir = "models"
    dump(featureScaler, os.path.join(save_dir, "FeatureStandardScalar.joblib"))
    dump(targetScaler, os.path.join(save_dir, "TargetStandardScalar.joblib"))

    return df