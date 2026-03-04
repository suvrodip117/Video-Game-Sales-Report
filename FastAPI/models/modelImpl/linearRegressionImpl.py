from joblib import load
import numpy as np

from repository.baseModelML import RegressionModel

class LinearRegressionImpl(RegressionModel):
    def __init__(self, model_path="models/LinearRegressionModel1.joblib"):
        self.model_path = model_path
        self.modelType = None

    def load(self):
        if self.modelType is None:
            self.modelType = load(self.model_path)

    def modelPrediction(self, df):
        self.load()
        print("Predict intercept:", self.modelType.intercept_)
        print("Predict max coef:", np.max(np.abs(self.modelType.coef_)))
        a=self.modelType.predict(df)
        return a
