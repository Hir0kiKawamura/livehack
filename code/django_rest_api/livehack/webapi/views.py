from django.shortcuts import render

# Create your views here.

from webapi.models import Profile
from webapi.serializers import ProfileSerializer
from rest_framework import generics
class ProfileListCreate(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
