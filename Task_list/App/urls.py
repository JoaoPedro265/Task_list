from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.get_userAll,name='get_users'),
    path('register/',views.register,name='get_user'),
    path('login/',views.login,name='login'),
]  