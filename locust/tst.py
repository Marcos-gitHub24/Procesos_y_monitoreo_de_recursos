import time 
from locust import HttpUser, task

class userTest(HttpUser):
    @task
    def acces_model(self):
        self.client.get("/locust")

    def on_start(self):
        self.client.get("/locust")