from django.db import models
from user.models import User


class Wrap(models.Model):
    artist_ids = models.JSONField(null=False)
    album_ids = models.JSONField(null=False)
    is_duo = models.BooleanField(null=False)
    time_range = models.CharField(max_length=15, null=False)
    created_at = models.DateField(auto_now_add=True) # Automatically set on creation 

    # Creator Users
    created_by = models.ManyToManyField(User, related_name='created_wraps')

    # Users that liked this wrap
    liked_by = models.ManyToManyField(User, related_name='liked_wraps')

    def __str__(self):
        creators = [str(usr) for usr in self.created_by.all()]
        return f'{self.id} : {" & ".join(creators)} : {self.created_at} : {self.time_range}'