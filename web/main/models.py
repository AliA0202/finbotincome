from django.db import models


class CTA (models.Model):
    CTA_CHOICES = (
        ("C", "بررسی شده"),
        ("U", "در صف انتظار")
    )

    phone = models.CharField(max_length=11)
    status = models.CharField(max_length=1, choices=CTA_CHOICES, default="U")

    def __str__(self) -> str:
        return f"{self.phone}"
    
    class Meta:
        verbose_name = 'CTA'
        verbose_name_plural = 'CTA'