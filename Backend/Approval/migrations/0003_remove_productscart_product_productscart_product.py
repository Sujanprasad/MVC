# Generated by Django 5.1.1 on 2024-09-19 15:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Approval', '0002_productscart'),
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productscart',
            name='product',
        ),
        migrations.AddField(
            model_name='productscart',
            name='Product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='myapp.product'),
        ),
    ]
