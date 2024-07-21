from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
# Create your models here.

Phone_Validator = RegexValidator(r'^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|9[0-4]|98)\d{7}$', 'شماره وارد شده مناسب نمی‌باشد')


class User(AbstractUser):
    USER_TYPE_CHOICES = [
        ('VIP', 'VIP'),
        ('Simple', 'Simple'),
    ]

    phone = models.CharField(blank=True, null=True,validators=[Phone_Validator])
    image = models.ImageField(upload_to='media/profile/%y/%m/%d/', blank=True, null=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='Simple')

    def str(self):
        return self.username
