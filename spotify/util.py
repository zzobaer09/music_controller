from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from requests import post
from .credentials import CLIENT_ID , CLIENT_SECRET , REDIRECT_URI
#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ||code here|| !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

def get_user_token(user_id):
    user = SpotifyToken.objects.filter(user=user_id)
    if user.exists():
        return user[0]
    else:
        return None


def update_or_create_user_token(user_id , access_token , token_type , refresh_token , expires_in):
    token = get_user_token(user_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)
    if token:
        token.access_token = access_token
        token.refresh_token = refresh_token
        token.expires_in = expires_in
        token.token_type = token_type
        token.save()
    else:
        token = SpotifyToken(user=user_id, access_token=access_token, refresh_token=refresh_token,token_type=token_type, expires_in=expires_in)
        token.save()
        

def is_spotify_authenticated(session_key):
    token = get_user_token(session_key)
    print(token)
    if token:
        expiry = token.expires_in
        if expiry <= timezone.now():
            refresh_token(session_key , token)
        return True
    return False



def refresh_token(session_key , token):
    refresh_token = token.refresh_token
    
    response = post("https://accounts.spotify.com/api/token", data={
        "grant_type":"refresh_token",
        "refresh_token": refresh_token,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }).json()

    access_token = response.get("access_token")
    token_type = response.get("tokne_type")
    refresh_token = response.get("refresh_token")
    expires_in = response.get("expires_in")

    update_or_create_user_token(session_key, access_token , token_type, refresh_token, expires_in)
