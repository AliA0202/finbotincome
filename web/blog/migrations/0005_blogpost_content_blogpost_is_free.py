# Generated by Django 5.0.7 on 2024-07-24 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_alter_postimages_post_alter_postvideos_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpost',
            name='content',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='blogpost',
            name='is_free',
            field=models.BooleanField(default=False),
        ),
    ]
