from django.urls import path
from .views import auth_url, auth_callback, top_artists

urlpatterns = [
    path('url/', auth_url, name='auth_url'),
    path('callback/', auth_callback, name='auth_callback'),
    path('top-artists/', top_artists, name='top_artists'),
]