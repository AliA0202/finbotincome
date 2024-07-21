from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime
from django.core.validators import RegexValidator

def upload_to(instance, filename):
    date = datetime.now().strftime('%Y%m%d')
    filename = "myfiles" + "/" + date + "/" + filename
    return filename

Phone_Validator = RegexValidator(r'^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|9[0-4]|98)\d{7}$', 'شماره وارد شده مناسب نمی‌باشد')


class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('V', 'ویژه'),
        ('N', 'عادی'),
    )

    phone = models.CharField(max_length=11, blank=True, null=True, validators=[Phone_Validator])
    image = models.ImageField(upload_to=upload_to, blank=True, null=True)
    user_type = models.CharField(max_length=1, choices=USER_TYPE_CHOICES, default="N")

    def __str__(self) -> str:
        return f"{self.username}"
    
    class Meta:
        verbose_name = 'کاربران'
        verbose_name_plural = 'کاربران'
