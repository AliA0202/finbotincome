from django.urls import path, re_path
from rest_framework.authtoken.views import obtain_auth_token
from blog.views import PostView, BlogPostListView

urlpatterns = [
    path('posts/', BlogPostListView.as_view(), name='BlogPostSearch'),
    re_path(r'^(?P<slug>[-\w]+)/$', PostView.as_view(), name='BlogPost'),
]