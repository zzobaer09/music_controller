# Generated by Django 4.1.3 on 2022-11-24 15:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='spotifytoken',
            name='user',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
