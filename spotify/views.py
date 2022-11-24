from django.shortcuts import render
from .credentials import CLIENT_ID , CLIENT_SECRET , REDIRECT_URI
from rest_framework.views import APIView
from requests import  Request , post
from rest_framework import status
from rest_framework.response import Response

#! Create your views here.


class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = "user-read-playback-state user-modify-playback-state user-read-currently-playing"
        url = Request("GET" , "https://accounts.spotify.com/authorize" , parama={
            "scope" : scopes,
            "response_type": "code",
            "redirect_uri": REDIRECT_URI,
            "client_id": CLIENT_ID,
        }).prepare().url

        return Response({"url":url}, status=status.HTTP_200_OK)



def spotify_callback(request , format=None):
    code = request.GET.get("code")
    error = request.GET.get("error")

    response = post("https://accounts.spotify.com/api/token", data={
        "code": code,
        "grant_type":"authorization_code",
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }).json()

    access_token = response.get("access_token")
    token_type = response.get("tokne_type")
    refresh_token = response.get("refresh_token")
    expires_in = response.get("expires_in")
    error = response.get("error")


