from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.get_userAll,name='get_users'),
    path('user/',views.get_user,name='get_user'),
]  