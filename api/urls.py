from django.contrib import admin
from django.urls import path , include
from .views import RoomView,CreateRoomView,GetRoom,JoinRoom,UserInRoom,LeaveRoom,UpdateView
urlpatterns = [
    path("room/" , RoomView.as_view() , name="room"),
    path("create-room/" , CreateRoomView.as_view() , name="room_view"),
    path("get-room/" , GetRoom.as_view()),
    path("join-room/" , JoinRoom.as_view()),
    path("user-in-room/" , UserInRoom.as_view()),
    path("leave-room/" , LeaveRoom.as_view()),
    path("update-room/" , UpdateView.as_view()),
]
