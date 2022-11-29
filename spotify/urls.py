from django.urls import path
from .views import *
urlpatterns = [
    path("get-auth-url/" , AuthURL.as_view()),
    path("redirect/" , spotify_callback),
    path("is-authenticated/" , IsAuthenticated.as_view()),
    path("current-song/" , CurrentSong.as_view()),
    path("play-song/" , PlaySong.as_view()),
    path("pause-song/" , PauseSong.as_view()),
]
