from django.urls import path
from .views import *

urlpatterns = [
    path('hello-world/',hello_world, name='hello_world'),
    path('create/',USER_create,name='create_user'),
    path('data/',Users_view,name='Users_view'),
    path('Register/',users_create,name='register_user'),
    path('users/',users_view,name='users_view'),
    
    # path('todos/',todo_list, name='todo-list'),
    # path('todos/<int:pk>/',todo_detail, name='todo-detail'),

    # path('todos/', TodoListCreateView.as_view(), name='todo-list-create'),
    # path('todos/<int:pk>/',TodoRetrieveUpdateDestroyView.as_view(), name='todo-detail'),

    
    path('todos/',TodoItemView.as_view(), name='todo-list-create'),
    path('todos/<int:pk>/',TodoItemDetailView.as_view(), name='todo-detail'),

    path('Users/',UsersRetriveCreate.as_view(), name='Users'),

    path('adminlogin/',AdminLoginView.as_view(),name="adminlogin"),
    path('students/',StudentretriveView.as_view(),name="students"),

    path('Usercreation/',product_users,name='Usercreation'),
    path('Admincreation/',product_admins,name='Usercreation'),

    path('Productlogin/',ProductLoginView.as_view(),name="adminlogin"),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify_otp'),

    path('Products/',Products_view.as_view(), name='product-list-create'),
    path('Products/<int:pk>/',ProductRetrieveUpdateDestroyView.as_view(), name='product-detail'),
    path('Products-purchace/<int:id>/',ProductUpdateview.as_view(), name='product-detail'),


    path('upload/', ImageUploadView.as_view(), name='image-upload'),
]



