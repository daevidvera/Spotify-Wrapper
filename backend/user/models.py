from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, AbstractUser

class User(AbstractUser):
    
    # Required fields
    # username - automatically created
    # password - automatically created
    email = models.EmailField(unique=True)
    spotify_id = models.TextField( unique=True)                     # Spotify id
    display_name = models.CharField(max_length=30)                  # Spotify username
    access_token = models.TextField(unique=True)                    # Spotify auth
    refresh_token = models.TextField(unique=True)                   # Spotify auth
    last_refresh = models.DateTimeField()                           # Spotify auth

    # Extra fields
    spotify_profile_url = models.URLField(blank=True, null=True)            # Spotify profile url 
    profile_img = models.JSONField(default=dict, blank=True, null=True)     # Spotify profile pic, as a json containing url, width, & height (in px)

    # Auto generated fields
    # last_login: automatically handled by django

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return f'{self.username} ({self.email})'