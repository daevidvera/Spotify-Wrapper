from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return HttpResponse("This is the home page")

def profile(request):
    return HttpResponse("This is the profile page")
# Create your views here.
