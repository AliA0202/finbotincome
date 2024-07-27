from django.urls import path
from .views import BotVerifyPayment, VerifyPayment, GetAuthority
urlpatterns = [
    path('telegram/verify/', BotVerifyPayment.as_view(), name="bot_verify_payment"),
    path('verify/', VerifyPayment.as_view(), name="verify_payment"),
    path('authority/', GetAuthority.as_view(), name="authority"),
]
