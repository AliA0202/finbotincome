from django.urls import path, re_path
from rest_framework.authtoken.views import obtain_auth_token
from blog.views import PostView, BlogPostListView, SavedPostsLitView, CreateSavedPost, DeleteSavedPost

urlpatterns = [
    path('posts/', BlogPostListView.as_view(), name='BlogPostSearch'),
    path('saved-posts/delete/', DeleteSavedPost.as_view(), name='DeleteSavedPost'),
    path('saved-posts/create/', CreateSavedPost.as_view(), name='CreateSavedPost'),
    path('saved-posts/', SavedPostsLitView.as_view(), name='SavedPosts'),
    re_path(r'^(?P<slug>[-\w]+)/$', PostView.as_view(), name='BlogPost'),
]