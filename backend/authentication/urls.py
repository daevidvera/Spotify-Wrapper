from django.urls import path
from .views import auth_url, AuthenticationCallbackView

urlpatterns = [
    path('url/', auth_url, name='auth_url'),
    path('callback/', AuthenticationCallbackView.as_view(), name='auth_callback'),
]