from django.urls import path
from .views import *

urlpatterns = [
    path('Quiz/',QuizView.as_view(), name='hello_world'),
]



