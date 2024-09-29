from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime
from django.core.validators import RegexValidator
from django.conf import settings
import os

Phone_Validator = RegexValidator(r'^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|9[0-4]|98)\d{7}$', 'شماره وارد شده مناسب نمی‌باشد')


class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('V', 'ویژه'),
        ('N', 'عادی'),
    )

    phone = models.CharField(max_length=11, blank=True, null=True, validators=[Phone_Validator])
    image = models.ImageField(upload_to="accounts/UserProfile/", blank=True, null=True, default="accounts/UserProfile/user-vector-id1138452882-1314286458.jpeg")
    user_type = models.CharField(max_length=1, choices=USER_TYPE_CHOICES, default="N")
    email = models.EmailField(blank=True, null=True)
    referral_code = models.CharField(max_length=55, blank=True, null=True)
    score = models.IntegerField(default=0, blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.username}"
    


    def save(self, *args, **kwargs):
        url = None

        def set_url():
            if settings.DEBUG:
                return "https://finbotincome.com/referral/"
            else:
                return "http://localhost/referral/"

        try:
            url = settings.ALLOWED_HOST[0]
            if (url == "*"):
                url = set_url()
        except:
            url = set_url()

        self.referral_code = f"{url}/{self.id}/"
        return super().save(*args, **kwargs)
    
    class Meta:
        verbose_name = 'کاربران'
        verbose_name_plural = 'کاربران'


class Referrals(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    sub = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="Subset")

    def __str__(self) -> str:
        return f"{self.user.first_name} {self.user.last_name}"

    class Meta:
        verbose_name = 'دوستان'
        verbose_name_plural = 'دوستان'
