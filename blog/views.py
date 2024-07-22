from rest_framework import generics
from blog.models import BlogPost
from blog.serializers import CategorySerializer, PostSerializer
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

class PostView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'

class BlogPostListView(generics.ListAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = PostSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['category']
    search_fields = ['title']