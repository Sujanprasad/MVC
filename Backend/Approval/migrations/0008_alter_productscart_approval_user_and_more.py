# Generated by Django 5.1.1 on 2024-09-21 09:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Approval', '0007_rename_approval_user_id_productscart_approval_user_and_more'),
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productscart',
            name='Approval_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Approval.approval_user'),
        ),
        migrations.AlterField(
            model_name='productscart',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.product'),
        ),
    ]
