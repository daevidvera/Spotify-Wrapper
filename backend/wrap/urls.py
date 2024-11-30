from django.urls import path
from .views import top_songs, top_artists, top_genres


urlpatterns = [
    path("top-songs/", top_songs, name='top-songs'),
    path("top-artists/", top_artists, name='top-artists'),
    path("top-genres/", top_genres, name='top-genres'),

]