import numpy as np
from sklearn.preprocessing import FunctionTransformer
from joblib import dump

def logTransform(df,featureColumns,targetColumn):
    df = df.copy()
    feature_transformer = FunctionTransformer(np.log1p, inverse_func=np.expm1, validate=False)
    df[featureColumns] = feature_transformer.fit_transform(df[featureColumns])
    dump(feature_transformer, "models/FeatureLogTransformer.joblib")
    if targetColumn is not None:
        target_transformer = FunctionTransformer(np.log1p, inverse_func=np.expm1, validate=False)
        df[[targetColumn]] = target_transformer.fit_transform(df[[targetColumn]])
        dump(target_transformer, "models/TargetLogTransformer.joblib")
    return df

def sqrtTransform(df,featureColumns,targetColumn):
    transformer = FunctionTransformer(np.sqrt)
    df[featureColumns] = transformer.fit_transform(df[featureColumns])
    if targetColumn is not None:
        df[[targetColumn]]=transformer.fit_transform(df[[targetColumn]])
    return df