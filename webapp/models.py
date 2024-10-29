from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    language = models.CharField(max_length=50)
    

    # Add additional fields here

    def __str__(self):
        return self.user.username


from django.db import models

class Song(models.Model):
    song_name = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    poster = models.ImageField(upload_to='static/images/songs_img/')
    audio_file = models.FileField(upload_to='static/audio/')

    def __str__(self):
        return self.song_name
