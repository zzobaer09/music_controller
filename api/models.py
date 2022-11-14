from django.db import models
import string
import random

# todo: Create your models here.

#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
#* generate a unique code for the room model 
def generate_unique_code():
    length = 6
    while True:
        code = "".join(random.choices(string.ascii_uppercase , k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    return code

#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
class Room(models.Model):
    code = models.CharField(max_length=8 , default=generate_unique_code , unique=True) #* room unique code
    host = models.CharField(max_length=50 , unique=True) #unique host name
    guest_can_pause = models.BooleanField(default=False , null=False) #* if True guest will able to pause the music
    votes_to_skip = models.IntegerField(null=False , default=1) #* how much vote needed to skip the song
    created_at = models.DateTimeField(auto_now_add=True) #* time of room creation

