from abc import ABC, abstractmethod
import pandas as pd

class RegressionModel(ABC):
    @abstractmethod
    def modelPrediction(self, df: pd.DataFrame):
        pass