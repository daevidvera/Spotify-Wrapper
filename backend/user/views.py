import request

from django.shortcuts import render
from rest_framework.views import APIView
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

from authentication.views import printError
from user.models import User


# Create your views here.

## Need a view for creating a user (have functionality to check if user exists)

class UserView(APIView):
    def post(self, request):
        code = request.GET.get('code')

        # make sure data is formatted correct
        data = request.GET.get('data')


        username = data.get('username')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        id = data.get('id')

        # check if user exists using the user ID
        user = User.objects.filter(id=id)
        if user:
            pass
        else:
            user = User.objects.create(username=username, first_name=first_name, last_name=last_name, id=id)

            if not user:
                return Response({'error': 'User could not be created'}, status=400)

            user.save()
            pass

        return Response({'message': 'User created successfully'}, status=200)



