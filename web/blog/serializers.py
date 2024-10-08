from blog.models import BlogCategory, BlogPost, BlogComments, PostImages, PostVideos
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.reverse import reverse
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ('title', 'image')

class BlogPostSerializer(serializers.ModelSerializer):
    absolute_url = serializers.SerializerMethodField()
    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'slug', "banner", 'caption', 'content',
                  'category', 'published_at','is_promoted', 'is_free', 'tag', 'absolute_url')
    def get_absolute_url(self, obj):
        return reverse('BlogPost',args=(obj.slug,))

class PostImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImages
        fields = ('post' ,'image',)

class PostVideosSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostVideos
        fields = ('post' ,'video',)

class BlogCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogComments
        fields = ('user', 'caption', 'written_at', 'post')


class PostSerializer(serializers.ModelSerializer):
    images = PostImagesSerializer(many=True, read_only=True)
    videos = PostVideosSerializer(many=True, read_only=True)
    comments = BlogCommentsSerializer(many=True)

    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'slug', 'caption', 'content','category', 'published_at',
                  "banner", 'is_promoted', 'is_free', 'tag', 'videos','images', 'comments')