from django.contrib import admin
from blog.models import BlogCategory, BlogPost, BlogComments


class BlogCategoryAdmin(admin.ModelAdmin):
    model = BlogPost
    list_display = ['title', 'image']


class BlogPostAdmin(admin.ModelAdmin):
    model = BlogPost
    list_display = ['title', 'image', 'caption', 'category', 'tag', 'is_promoted']

class BlogCommentsAdmin(admin.ModelAdmin):
    model = BlogComments
    list_display = ['user', 'caption', 'written_at', 'post']

admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(BlogCategory, BlogCategoryAdmin)
admin.site.register(BlogComments, BlogCommentsAdmin)