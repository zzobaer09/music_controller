from django.urls import path
from .views import index
app_name = "frontend"
urlpatterns = [
    path("" , index , name=""),
    path("join/" , index),
    path("join/1" , index),
    path("create/" , index),
    path("room/<str:roomCode>", index)
]
