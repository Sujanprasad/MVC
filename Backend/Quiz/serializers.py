from .models import *
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import serializers


class  QuizSerializer(serializers.Serializer):
    class Meta:
        model=Quiz_questions
        fields="__all__"