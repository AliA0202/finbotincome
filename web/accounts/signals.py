from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User
from django.conf import settings

@receiver(post_save, sender=User)
def set_referral(sender, instance, created, **kwargs):
    if created and not instance.referral_code:
        url = "finbotincome-referral"

        instance.referral_code = f"{url}-{instance.id}"
        instance.save()
