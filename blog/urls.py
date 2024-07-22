from django.urls import path, re_path
from rest_framework.authtoken.views import obtain_auth_token
from blog.views import PostView

urlpatterns = [
    re_path(r'^(?P<slug>[-\w]+)/$', PostView.as_view(), name='BlogPost')
]