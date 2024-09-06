from django.contrib import admin
from blog.models import BlogCategory, BlogPost, BlogComments, SavedPosts


class BlogCategoryAdmin(admin.ModelAdmin):
    model = BlogPost
    list_display = ['title', 'image']


class BlogPostAdmin(admin.ModelAdmin):
    model = BlogPost
    list_display = ['title', 'caption', 'category', 'tag', 'is_promoted']

    fieldsets = (
        ("معرفی پست" , {
            "fields" : ['banner', 'title', 'caption']
        }),
        ("دسته و برچسب", {
            "fields" : ['category', 'tag']
        }),
        ("پیکربندی", {
            "fields" : ['is_promoted', 'is_vip']
        }),
        ("محتوای اصلی", {
            "fields" : ['content']
        })
    )


class BlogCommentsAdmin(admin.ModelAdmin):
    model = BlogComments
    list_display = ['user', 'caption', 'written_at', 'post']

class SavedPostsAdmin(admin.ModelAdmin):
    model = SavedPosts
    list_display = ['user', 'post']

admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(BlogCategory, BlogCategoryAdmin)
admin.site.register(BlogComments, BlogCommentsAdmin)
admin.site.register(SavedPosts, SavedPostsAdmin)
