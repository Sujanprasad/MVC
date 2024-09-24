# Generated by Django 5.1.1 on 2024-09-17 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Approval_user',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('phone', models.IntegerField()),
                ('email', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=60)),
                ('status', models.BooleanField(max_length=10, null=True)),
            ],
        ),
    ]
