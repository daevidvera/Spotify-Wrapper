from django.urls import path
from .views import auth_url, auth_callback, top_artists, top_genres, top_songs

urlpatterns = [
    path('url/', auth_url, name='auth_url'),
    path('callback/', auth_callback, name='auth_callback'),
    path('top-artists/', top_artists, name='top_artists'),
    path('top-genres/', top_genres, name='top_genres'),
    path('top-songs/', top_songs, name='top_songs'),
]