from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from blog.serializers import CategorySerializer
from rest_framework import generics
from blog.models import BlogCategory, BlogPost, BlogComments
from blog.serializers import CategorySerializer, PostSerializer


class PostView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'
