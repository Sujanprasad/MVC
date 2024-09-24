from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,generics
from .serializers import *
from .models import *
from django.core.mail import send_mail


class QuizView(generics.ListCreateAPIView):
    queryset = Quiz_questions.objects.all()
    serializer_class = QuizSerializer

