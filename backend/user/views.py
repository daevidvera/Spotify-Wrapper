
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from backend.utils import print_error
from .models import User
from .serializers import UserRegisterSerializer, UserSerializer


# User registration API
# Should ONLY be called in registration page..!!
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        # Load data from session
        data = {
            **request.data,
            'access_token': request.session.get('access_token'),
            'refresh_token': request.session.get('refresh_token'),
            'last_refresh': request.session.get('last_refresh'),
            'spotify_id': request.session.get('spotify_id'),
            'spotify_profile_url': request.session.get('spotify_profile_url'),
            'profile_img': request.session.get('profile_img'),
            'display_name': request.session.get('display_name')
        }
        # Validate data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Customize headers
        headers = self.get_success_headers(serializer.data)
        return Response(
            {'message': 'User registered successfully!'},
            status=status.HTTP_201_CREATED,
            headers=headers
        )


# User login API
class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Serialize user profile data to load user context
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)


# User logout API
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    

# User delete API
class DeleteView(APIView):
    def delete(self, request, *args, **kwargs):
        user = request.user
        user_str = str(user)
        user.delete()
        return Response({'message': f"User {user_str} deleted successfully"})
    

# Gets user profile information 
class ProfileView(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    

# Checks if user is authenticated
class AuthCheckView(APIView):
    permission_classes=[AllowAny]
    def get(self, request):
        try:
            if request.user.is_authenticated:
                return Response({'authenticated': True})
        except:
            pass
        return Response({'authenticated': False})