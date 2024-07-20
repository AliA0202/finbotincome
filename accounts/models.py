from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime

def upload_to(instance, filename):
    date = datetime.now().strftime('%Y%m%d')
    filename = "myfiles" + "/" + date + "/" + filename
    return filename

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('V', 'ویژه'),
        ('N', 'عادی'),
    )

    phone = models.CharField(max_length=11, blank=True, null=True)
    image = models.ImageField(upload_to=upload_to, blank=True, null=True)
    user_type = models.CharField(max_length=1, choices=USER_TYPE_CHOICES, default="N")

    def __str__(self) -> str:
        return f"{self.username}"
    
    class Meta:
        verbose_name = 'کاربران'
        verbose_name_plural = 'کاربران'