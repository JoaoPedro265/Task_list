from django.contrib import admin
from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [
    path("token/",TokenObtainPairView.as_view()),
    path("token/refresh", TokenRefreshView.as_view()),
    
    path('',views.get_userAll,name='get_users'),
    path('register/',views.register,name='get_user'),
    path('login/',views.login,name='login'),
]  