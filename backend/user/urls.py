from django.urls import path
from .views import RegisterView, LoginView, LogoutView, DeleteView, ProfileView, AuthCheckView

urlpatterns = [
    path("register/", RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('delete/', DeleteView.as_view(), name='delete'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('is-auth/', AuthCheckView.as_view(), name='is-auth')
]