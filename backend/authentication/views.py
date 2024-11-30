from django.utils.timezone import now, timedelta
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from spotipy import Spotify, SpotifyOAuth
from django.utils.crypto import get_random_string
from django.http import HttpResponseRedirect
from collections import Counter
from urllib.parse import urlencode
from user.models import User
from backend.utils import print_error
from django.conf import settings

# Initialize Spotify OAuth (configure scope and redirect URI)
sp_oauth = SpotifyOAuth(
    client_id=settings.SPOTIFY_CLIENT_ID,
    client_secret=settings.SPOTIFY_SECRET,
    redirect_uri=settings.SPOTIFY_REDIRECT_URI,
    scope="user-read-email user-top-read"
)

def get_valid_token(session):
    """
    Ensure the access token is valid and refresh it if expired.
    """
    access_token = session.get('access_token')
    refresh_token = session.get('refresh_token')
    last_refresh = session.get('last_refresh')

    if not access_token or not refresh_token or not last_refresh:
        return None

    # Check if the token has expired
    last_refresh_time = now() - timedelta(seconds=3600)  # Simulate token expiration
    token_info = sp_oauth.get_cached_token()

    if not token_info or now() >= last_refresh_time + timedelta(seconds=token_info['expires_in']):
        try:
            token_info = sp_oauth.refresh_access_token(refresh_token)
            session['access_token'] = token_info.get('access_token')
            session['refresh_token'] = token_info.get('refresh_token', refresh_token)
            session['last_refresh'] = now().isoformat()
        except Exception as e:
            print(f"Error refreshing token: {str(e)}")
            return None

    return session['access_token']

@api_view(['GET'])
@permission_classes([AllowAny])
def auth_url(request):
    # Generate a unique state parameter for CSRF protection
    state = get_random_string(32)
    request.session['spotify_auth_state'] = state  # Store in session for validation

    # Generate the authorization URL with the state
    auth_url = sp_oauth.get_authorize_url(state=state)
    return Response({'auth_url': auth_url})

@api_view(['GET'])
@permission_classes([AllowAny])
def auth_callback(request):
    code = request.query_params.get('code')
    state = request.query_params.get('state')

    print(f"Callback received with state: {state}")

    # Validate state
    stored_state = request.session.get('spotify_auth_state')
    if not state or state != stored_state:
        print(f"State mismatch or missing. Received: {state}, Expected: {stored_state}")
        return Response({'error': 'State mismatch'}, status=status.HTTP_400_BAD_REQUEST)

    # Clear state after validation to avoid reuse
    del request.session['spotify_auth_state']

    # Retrieve tokens
    try:
        token_info = sp_oauth.get_access_token(code)
    except Exception as e:
        print(f"Error during token exchange: {str(e)}")
        return Response({'error': 'Token exchange failed'}, status=status.HTTP_400_BAD_REQUEST)

    access_token = token_info.get("access_token")
    refresh_token = token_info.get("refresh_token")
    last_refresh = now()

    # Initialize Spotify client
    sp = Spotify(auth=access_token)

    # Retrieve user profile
    try:
        user_profile = sp.current_user()
        print(f"User profile retrieved: {user_profile}")
    except Exception as e:
        print(f"Error retrieving user profile: {str(e)}")
        return Response({'error': 'Failed to retrieve user profile'}, status=status.HTTP_400_BAD_REQUEST)

    spotify_id = user_profile.get("id")
    display_name = user_profile.get("display_name")
    spotify_profile_url = user_profile.get("external_urls", {}).get("spotify")
    profile_img = user_profile.get("images", [{}])[0].get("url", "") if user_profile.get("images") else None
    email = user_profile.get("email", "")

    # Check if user exists, redirect to login if found
    try:
        user = User.objects.get(spotify_id=spotify_id)
        if user:
            return HttpResponseRedirect(f"{settings.FRONT_END_ORIGIN}/profile")
    except User.DoesNotExist:
        pass

    # Store session data
    request.session.update({
        'access_token': access_token,
        'refresh_token': refresh_token,
        'last_refresh': last_refresh.isoformat(),
        'spotify_id': spotify_id,
        'display_name': display_name,
        'spotify_profile_url': spotify_profile_url,
        'profile_img': profile_img
    })

    # Build redirect params
    params = {
        'display_name': display_name or "",
        'spotify_profile_url': spotify_profile_url or "",
        'email': email or ""
    }
    if profile_img:
        params['profile_img'] = profile_img

    return HttpResponseRedirect(f"{settings.FRONT_END_ORIGIN}/account?{urlencode(params)}")

@api_view(['GET'])
@permission_classes([AllowAny])
def top_artists(request):
    access_token = get_valid_token(request.session)
    if not access_token:
        return Response({'error': 'Unable to retrieve a valid token'}, status=status.HTTP_401_UNAUTHORIZED)

    sp = Spotify(auth=access_token)
    try:
        top_artists = sp.current_user_top_artists(limit=5)
    except Exception as e:
        print_error(f"Error retrieving top artists: {str(e)}")
        return Response({'error': 'Failed to retrieve top artists'}, status=status.HTTP_400_BAD_REQUEST)

    artists = [artist.get("name") for artist in top_artists.get("items", [])]
    return Response(artists, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def top_genres(request):
    access_token = get_valid_token(request.session)
    if not access_token:
        return Response({'error': 'Unable to retrieve a valid token'}, status=status.HTTP_401_UNAUTHORIZED)

    sp = Spotify(auth=access_token)
    try:
        top_artists = sp.current_user_top_artists(limit=50)
    except Exception as e:
        print(f"Error retrieving top artists: {str(e)}")
        return Response({'error': 'Failed to retrieve top artists'}, status=status.HTTP_400_BAD_REQUEST)

    genres = []
    for artist in top_artists.get("items", []):
        genres.extend(artist.get("genres", []))

    genre_counts = Counter(genres)
    top_genres = [genre.capitalize() for genre, count in genre_counts.most_common(5)]

    return Response(top_genres, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def top_songs(request):
    access_token = get_valid_token(request.session)
    if not access_token:
        return Response({'error': 'Unable to retrieve a valid token'}, status=status.HTTP_401_UNAUTHORIZED)

    sp = Spotify(auth=access_token)
    try:
        top_tracks = sp.current_user_top_tracks(limit=5)
    except Exception as e:
        print(f"Error retrieving top tracks: {str(e)}")
        return Response({'error': 'Failed to retrieve top tracks'}, status=status.HTTP_400_BAD_REQUEST)

    songs = [
        {"title": track.get("name"), "artist": ", ".join(artist["name"] for artist in track.get("artists", []))}
        for track in top_tracks.get("items", [])
    ]

    return Response(songs, status=status.HTTP_200_OK)
