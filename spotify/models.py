from django.db import models

# Create your models here.

class SpotifyToken(models.Model):
    user = models.CharField(max_length=255 , unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    access_token = models.CharField(max_length=255)
    token_type = models.CharField(max_length=255)
    refresh_token = models.CharField(max_length=255)
    expires_in = models.DateTimeField()
