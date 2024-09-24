from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework import generics
from django.views import View
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.mail import send_mail



@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})

@api_view(['POST'])
def USER_create(request):
    Serializer=UserSerializer(data=request.data)
    if Serializer.is_valid():
        Serializer.save()
        return Response(Serializer.data,status=status.HTTP_201_CREATED)
    return Response(Serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def Users_view(request):
    users=user.objects.all().values()
    serializer=UserSerializer(users,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['POST'])
def users_create(request):
    Serializer=RegistrationSerializer(data=request.data)
    if Serializer.is_valid():
        Serializer.save()
        return Response(Serializer.data,status=status.HTTP_201_CREATED)
    return Response(Serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def users_view(request):
    users=Registration.objects.all().values()
    serializer=RegistrationSerializer(users,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def todo_list(request):
    if request.method == 'GET':
        todos = TodoItem.objects.all()
        serializer = TodoItemSerializer(todos, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TodoItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def todo_detail(request, pk):
    todo = get_object_or_404(TodoItem, pk=pk)
    
    if request.method == 'GET':
        serializer = TodoItemSerializer(todo)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = TodoItemSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PATCH':
        serializer = TodoItemSerializer(todo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class TodoListCreateView(generics.ListCreateAPIView):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer

class TodoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer



@method_decorator(csrf_exempt, name='dispatch')
class TodoItemView(View):
    def get(self, request, *args, **kwargs):
        todos = TodoItem.objects.all()
        serializer = TodoItemSerializer(todos, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, *args, **kwargs):
        data = JSONParser().parse(request)
        serializer = TodoItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class TodoItemDetailView(View):
    def get(self, request, *args, **kwargs):
        todo = get_object_or_404(TodoItem, pk=kwargs['pk'])
        serializer = TodoItemSerializer(todo)
        return JsonResponse(serializer.data)

    def put(self, request, *args, **kwargs):
        todo = get_object_or_404(TodoItem, pk=kwargs['pk'])
        data = JSONParser().parse(request)
        serializer = TodoItemSerializer(todo, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        todo = get_object_or_404(TodoItem, pk=kwargs['pk'])
        todo.delete()
        return JsonResponse({}, status=status.HTTP_204_NO_CONTENT)



class UsersRetriveCreate(generics.ListCreateAPIView):
    queryset = Registration.objects.all()
    serializer_class = UserRegistrationSerializer

from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication


class AdminLoginView(APIView):
    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        if serializer.is_valid():
            
            user = serializer.validated_data['user']
                
            refresh = RefreshToken.for_user(user)
            refresh['username'] = user.username 
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response({
                "access_token": access_token,
                "refresh_token": refresh_token
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class StudentretriveView(generics.ListAPIView):
    authentication_classes = [JWTAuthentication]
    queryset = user.objects.all()
    serializer_class = UserSerializer


 

@api_view(['POST'])
def product_users(request):
    Serializer=ProductUserSerializer(data=request.data)
    if Serializer.is_valid():
        Serializer.save()

        username=Serializer.validated_data['username']
        email=Serializer.validated_data['email']
        password=Serializer.validated_data['password']

        user=User(username=username,email=email)
        user.set_password(password)
        user.save()

        return Response(Serializer.data,status=status.HTTP_201_CREATED)
    return Response(Serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def product_admins(request):
    Serializer=ProductAdminSerializer(data=request.data)
    if Serializer.is_valid():
        Serializer.save()

        return Response(Serializer.data,status=status.HTTP_201_CREATED)
    return Response(Serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from .serializers import ProductLoginSerializer

class ProductLoginView(APIView):
    def post(self, request):
        serializer = ProductLoginSerializer(data=request.data)
        if serializer.is_valid():
            admin = serializer.validated_data.get('admin')  
            user = serializer.validated_data.get('user') 
            
            if admin:
                refresh = RefreshToken.for_user(admin)
                refresh['username'] = admin.username
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                username = admin.username
                usertype = "admin"
            elif user:
                refresh = RefreshToken.for_user(user)
                refresh['username'] = user.username
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                username = user.username
                usertype = "user"
            else:
                return Response({"error": "No valid user found"}, status=status.HTTP_400_BAD_REQUEST)

            otp_instance = OTP(user=admin if admin else user)
            otp_instance.save()

            try:
                send_mail(
                    'Your OTP Code',
                    f'Your OTP code is {otp_instance.otp}',
                    'sujanpanda049@gmail.com',
                    [admin.email if admin else user.email],
                    fail_silently=False,
                )
            except Exception as e:
                return Response(f'An error occurred: {str(e)}', status=500)

            return Response({
                "username": username,
                "usertype": usertype,
                "access_token": access_token,
                "refresh_token": refresh_token
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyOTPView(APIView):
    def post(self, request):
        try:
            user = User.objects.get(username=request.data.get('username'))
            otp = request.data.get('otp')
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
             OTP.objects.get(user=user, otp=otp)
        except OTP.DoesNotExist:
            return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'success': 'OTP verified'}, status=status.HTTP_200_OK)


class Products_view(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductUpdateview(APIView):
    def put(self, request, *args, **kwargs):
        product = Product.objects.get(id=kwargs['id'])
        data = JSONParser().parse(request)

        if product.quantity >= data['quantity']:
            product.quantity-=data['quantity']
            product.save()
            return Response(status=status.HTTP_200_OK)
        
        return Response({'error': 'Something Wnt wrong please try again later'},status=status.HTTP_400_BAD_REQUEST)


class ImageUploadView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        images = ImageUpload.objects.all()
        serializer = ImageUploadSerializer(images, many=True,context={'request': request})
        return Response(serializer.data)

