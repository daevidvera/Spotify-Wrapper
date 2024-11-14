
from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
import secrets
from django.conf import settings
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import redirect, get_object_or_404
from django.db import DatabaseError
from backend.utils import print_error
import urllib.parse
import base64
import requests

from .models import User
from .serializers import UserSerializer, UserRegisterSerializer


# User registration API
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

    def create(self, request, *args, **kwargs):
        # Load data from session
        data = {
            **request.data,
            'access_token': request.session.get('access_token'),
            'refresh_token': request.session.get('refresh_token'),
            'last_refresh': request.session.get('last_refresh'),
            'spotify_id': request.session.get('spotify_id'),
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


# User APIs
class UserView(APIView):

    # POST/CREATE User
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        print_error(f'Error occurred in user (POST): {str(serializer.errors)}')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    # GET/READ User
    def get(self, request, id):
        user = get_object_or_404(User, pk=id)
        return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
    

    # PATCH/UPDATE User
    def patch(self, request, id):
        user = get_object_or_404(User, pk=id)
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User updated successfully'}, status=status.HTTP_200_OK)
        
        print_error(f'Error occurred in user (PATCH): {str(serializer.errors)}')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
