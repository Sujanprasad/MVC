# Generated by Django 5.1.1 on 2024-09-24 04:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Quiz_questions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Question', models.CharField(max_length=250)),
                ('Answer', models.CharField(max_length=50)),
                ('Option1', models.CharField(max_length=50)),
                ('Option2', models.CharField(max_length=50)),
                ('Option3', models.CharField(max_length=50)),
                ('Option4', models.CharField(max_length=50)),
            ],
        ),
    ]
