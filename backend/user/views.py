
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from backend.utils import print_error
from .models import User, SavedWrap
from .serializers import UserRegisterSerializer, UserSerializer
from django.http import JsonResponse
from django.core.files.base import ContentFile
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO
from .models import SavedWrap


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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_wrapper(request):
    """
    Saves a user's wrapper data as a PDF.
    """
    # Ensure the request contains the necessary data
    print(request)
    wrapper_data = request.data.get('wrapper_data')
    if not wrapper_data:
        return Response({'error': 'wrapper_data is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        display_name = request.data.get('display_name')  # Automatically use the logged-in user
        genres = wrapper_data.get('genres', [])
        artists = wrapper_data.get('artists', [])
        songs = wrapper_data.get('songs', [])

        # Generate PDF from the provided data
        pdf_buffer = BytesIO()
        c = canvas.Canvas(pdf_buffer, pagesize=letter)
        c.drawString(100, 750, f"User: {display_name}")
        c.drawString(100, 730, "Top Genres:")
        for idx, genre in enumerate(genres, start=1):
            c.drawString(100, 730 - idx * 20, f"{idx}. {genre}")

        c.drawString(100, 730 - (len(genres) + 1) * 20, "Top Artists:")
        for idx, artist in enumerate(artists, start=1):
            c.drawString(100, 730 - (len(genres) + 1 + idx) * 20, f"{idx}. {artist}")

        c.drawString(100, 730 - (len(genres) + len(artists) + 2) * 20, "Top Songs:")
        for idx, song in enumerate(songs, start=1):
            c.drawString(100, 730 - (len(genres) + len(artists) + 2 + idx) * 20,
                         f"{idx}. {song['title']} - {song['artist']}")

        c.showPage()
        c.save()

        # Save the generated PDF as a new SavedWrap instance
        pdf_buffer.seek(0)
        saved_wrap = SavedWrap.objects.create(
            user=user,  # Associate wrap with current logged-in user
            pdf_file=ContentFile(pdf_buffer.read(), name='wrap.pdf')  # Store PDF
        )

        return Response({"message": "Wrapper saved successfully!"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_saved_wraps(request):
    """
    Fetches a list of all saved wraps (PDFs) for the logged-in user.
    """
    try:
        user = request.user  # Automatically get the logged-in user
        wraps = SavedWrap.objects.filter(user=user)  # Get all saved wraps for the current user

        if not wraps:
            return Response({"message": "No saved wraps found."}, status=status.HTTP_404_NOT_FOUND)

        # Return a list of saved wraps with their metadata
        wraps_data = [{"id": wrap.id, "created_at": wrap.created_at, "pdf_url": wrap.pdf_file.url} for wrap in wraps]
        return Response({"saved_wraps": wraps_data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)