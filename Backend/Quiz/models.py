from django.db import models

# Create your models here.
class Quiz_questions(models.Model):
    Question=models.CharField(max_length=250)
    Answer=models.CharField(max_length=50)
    Option1=models.CharField(max_length=50)
    Option2=models.CharField(max_length=50)
    Option3=models.CharField(max_length=50)
    Option4=models.CharField(max_length=50)
    
    def __str__(self):
        return f'{self.Question}'   