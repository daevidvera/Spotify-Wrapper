# Generated by Django 5.1.1 on 2024-11-30 07:59

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_alter_user_access_token_alter_user_refresh_token_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SavedWrap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pdf_file', models.FileField(upload_to='user_wraps/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='saved_wraps', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
