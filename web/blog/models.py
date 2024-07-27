from django.db import models
import datetime
from accounts.models import User
from django.core.exceptions import ValidationError
import string
from django.utils.text import slugify

class BlogCategory(models.Model):
    title = models.CharField(max_length=255, unique=True)
    image = models.ImageField(upload_to="blog/BlogCategory/", blank=True, null=True)
    
    class Meta:
        verbose_name = 'دسته‌بندی'
        verbose_name_plural = 'دسته‌بندی ها'
    
    def __str__(self):
        return self.title


def contains_illegal(s):
    for c in s:
        if c in string.whitespace:
            return True
        if c in [',', '-']:
            return True
    return False

def validate_tags(value):
    tags = value.split('_')
    for tag in tags:
        if contains_illegal(tag):
            raise ValidationError("تگ ها باید بدون فاصله وارد شده و با استفاده از ـ جدا شوند")
        
class BlogPost(models.Model):
    title = models.CharField(max_length=255, verbose_name="عنوان")
    slug = models.SlugField(max_length=255, blank=True, null=True, allow_unicode=True)
    caption = models.CharField(max_length=5000, verbose_name="توضیحات کوتاه")
    category = models.ForeignKey(BlogCategory, on_delete=models.CASCADE, verbose_name="دسته بندی")
    published_at = models.DateTimeField(auto_now_add=True, verbose_name="منتشر شده در")
    tag = models.CharField(max_length=500, null=True, validators=[validate_tags], verbose_name="تگ (با '_' جدا می شوند)")
    is_promoted = models.BooleanField(default=False, verbose_name="انتشار در صفحه اصلی")
    is_free = models.BooleanField(default=False, verbose_name="پست ویژه")
    content = models.TextField(blank=True, verbose_name="توضیحات")
    banner = models.ImageField(upload_to="blog/postBanner/", verbose_name="بنر پست")

    class Meta:
        verbose_name = 'پُست'
        verbose_name_plural = 'پُست ها'
    
    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        print(slugify(self.title))
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
            original_slug = self.slug
            counter = 1
            while BlogPost.objects.filter(slug=self.slug).exists():
                self.slug = f"{original_slug}-{counter}"
                counter += 1
        super().save(*args, **kwargs)


class BlogComments(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    caption = models.CharField(max_length=555)
    written_at = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey(BlogPost, related_name="comments",on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'نظر'
        verbose_name_plural = 'نظرات'

class PostVideos(models.Model):
    post = models.ForeignKey(BlogPost, related_name="videos", on_delete=models.CASCADE, verbose_name="پست")
    video = models.FileField(upload_to="blog/PostContent/video/", verbose_name="فایل")

    def __str__(self):
        return self.video


    class Meta:
        verbose_name = 'فایل ها'
        verbose_name_plural = 'فایل ها'


class PostImages(models.Model):
    post = models.ForeignKey(BlogPost, related_name="images", on_delete=models.CASCADE, verbose_name="پست")
    image = models.ImageField(upload_to="blog/PostContent/video/", verbose_name="تصویر")

    def __str__(self):
        return self.image
    
    class Meta:
        verbose_name = 'تصاویر'
        verbose_name_plural = 'تصاویر'
    

