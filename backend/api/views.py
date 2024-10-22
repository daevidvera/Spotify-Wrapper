from rest_framework.decorators import api_view
from rest_framework.response import Response
import secrets
from django.conf import settings
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import redirect
import urllib.parse
import base64
import requests

# Create your views here.

# Helper function used to print error messages
def printError(msg):
    print(f'!\n{msg}\n!')

# Generates Spotify auth link
@api_view(['GET'])
def auth_url(request):

    # Generate random string for OAuth security (see RFC-6749)
    oauth_state = secrets.token_urlsafe(32)

    response =  Response({'message': 'Redirecting to Spotify login...'})

    # Store state securely in cookie
    response.set_cookie(
        'spotify_auth_state',
        oauth_state,
        httponly=True,
        secure=settings.USING_HTTPS,
        samesite='None', # Has to go to different website (accounts.spotify.com)
        max_age=300 # 5 minutes
    )

    # Create auth URL (see https://developer.spotify.com/documentation/web-api/tutorials/code-flow)
    params = {
        'response_type': 'code',
        'client_id': settings.SPOTIFY_CLIENT_ID,
        # Define scope here!!!
        'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
        'state': oauth_state
    }

    response.data = {'auth_url' : f'https://accounts.spotify.com/authorize?{urllib.parse.urlencode(params)}'}

    return response


# Handles Spotify authorization callback
class AuthorizationCallbackView(APIView):

    def get(self, request):
        error = request.GET.get('error') # Can be None
        code = request.GET.get('code')
        state = request.GET.get('state')

        # If error exists, handle it
        if error:
            printError(f'Error occurred in auth callback: {error}')
            return Response({'error': 'Error in auth callback'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if state matches state in cookies
        oauth_state = request.COOKIES.get('spotify_auth_state')

        if oauth_state and state and oauth_state != state:
            printError(f'Error occurred in auth callback: OAuth states do not match!')
            return Response({'error': 'OAuth state invalid'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get access tokens using auth code (see https://developer.spotify.com/documentation/web-api/tutorials/code-flow)
        payload = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': settings.SPOTIFY_REDIRECT_URI
        }

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + base64.b64encode(f"{settings.SPOTIFY_CLIENT_ID}:{settings.SPOTIFY_SECRET}".encode()).decode()
        }

        response = requests.post('https://accounts.spotify.com/api/token', data=payload, headers=headers)

        # Check if access token request failed
        if response.status_code != 200:
            printError(f'Error occurred in auth callback: token exchange failed:\n{response.text}')
            return Response({'error': 'Token exchange failed'}, status=status.HTTP_400_BAD_REQUEST)
        
        response = response.json()
        access_token = response.get('access_token')
        refresh_token = response.get('refresh_token')

        # Check if user's id is registered in database. If not, register the user

        headers = {
            'Authorization': f'Bearer {access_token}'
        }

        response = requests.get('https://api.spotify.com/v1/me', headers=headers)

        if response.status_code != 200:
            printError(f'Error occurred in auth callback: failed to get user profile:\n{response.text}')
            return Response({'error': 'Failed to retrieve user'}, status=status.HTTP_400_BAD_REQUEST)
        
        response = response.json()
        uid = response.get('id')

        print(uid)
        print(response.get('display_name'))
        return Response({'message': f'Retrieved user :{uid}'}, status=status.HTTP_200_OK)


