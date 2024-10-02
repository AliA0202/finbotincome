from django.urls import path
from .views import SignupView
from rest_framework.authtoken.views import obtain_auth_token
from .views import LogoutView, EditProfileView, ReferralsUser, CreateReferral

urlpatterns = [
    path('signup/', SignupView, name='signup'),
    path('login/', obtain_auth_token, name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('edit-profile/', EditProfileView.as_view(), name='edit-profile'),
    path('referrals-user/', ReferralsUser.as_view(), name="referrals-user"),
    path('referrals-user/create/', CreateReferral.as_view(), name="referrals-user-create"),
]