from django.shortcuts import render
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Backend working"})


# Create your views here.
