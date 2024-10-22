from django.urls import path
from .views import auth_url, AuthorizationCallbackView

urlpatterns = [
    path('auth/url/', auth_url, name='auth_url'),
    path('callback/', AuthorizationCallbackView.as_view(), name='auth_callback'), # WHOOPS, gotta change to auth/callback/ 
]