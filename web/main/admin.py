from django.contrib import admin
from .models import CTA
# Register your models here.



@admin.register(CTA)
class CTAAdmin(admin.ModelAdmin):
    list_display = ['phone', 'status']
    fields = ['phone', 'status']