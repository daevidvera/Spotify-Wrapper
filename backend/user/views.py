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
# Create your views here.

## Need a view for creating a user (have functionality to check if user exists)