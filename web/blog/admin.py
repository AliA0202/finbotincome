from django.contrib import admin
from blog.models import BlogCategory, BlogPost, BlogComments, PostImages, PostVideos


class BlogCategoryAdmin(admin.ModelAdmin):
    model = BlogPost
    list_display = ['title', 'image']


class PostVideoInline(admin.TabularInline):
    model = PostVideos
    extra = 1

    
class PostImageInline(admin.TabularInline):
    model = PostImages
    extra = 1

class BlogPostAdmin(admin.ModelAdmin):
    model = BlogPost
    list_display = ['title', 'caption', 'category', 'tag', 'is_promoted']

    inlines = [
        PostVideoInline,
        PostImageInline
    ]

class BlogCommentsAdmin(admin.ModelAdmin):
    model = BlogComments
    list_display = ['user', 'caption', 'written_at', 'post']

admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(BlogCategory, BlogCategoryAdmin)
admin.site.register(BlogComments, BlogCommentsAdmin)
admin.site.register(PostImages)
admin.site.register(PostVideos)