from django.urls import path
from .views import CTACreate
urlpatterns = [
    path("cta/create/", CTACreate.as_view(), name="cta"),
]
