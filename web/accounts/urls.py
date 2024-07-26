from django.urls import path
from .views import SignupView
from rest_framework.authtoken.views import obtain_auth_token
from .views import LogoutView, EditProfileView

urlpatterns = [
    path('signup/', SignupView, name='signup'),
    path('login/', obtain_auth_token, name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('edit-profile/', EditProfileView.as_view(), name='edit-profile'),
]