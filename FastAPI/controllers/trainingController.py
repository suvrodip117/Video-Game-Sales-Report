
class TrainingController():
    def __init__(self, trainingService):
        self.trainingService=trainingService
    
    def train(self,):
        trainingResponse=self.trainingService.trainModel()
        return trainingResponse 