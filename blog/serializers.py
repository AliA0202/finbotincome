from blog.models import BlogCategory, BlogPost, BlogComments
from rest_framework import serializers
from django.contrib.auth import authenticate
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ('title', 'image')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'slug', 'image', 'caption', 'category', 'published_at', 'tag')