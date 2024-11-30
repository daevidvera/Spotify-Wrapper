from django.urls import path
from .views import RegisterView, LoginView, LogoutView, DeleteView, ProfileView, AuthCheckView, save_wrapper, get_saved_wraps

urlpatterns = [
    path("register/", RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('delete/', DeleteView.as_view(), name='delete'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('is-auth/', AuthCheckView.as_view(), name='is-auth'),
    path('save-wrapper/', save_wrapper, name='save_wrapper'),
    path('get-saved-wraps/', get_saved_wraps, name='get_saved_wraps'),
]