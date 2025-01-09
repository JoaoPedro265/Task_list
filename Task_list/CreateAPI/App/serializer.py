from rest_framework import serializers
from .models import Task_List
from django.contrib.auth.models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  # Inclui todos os campos do modelo
        # Ou liste os campos específicos que você quer serializar
        # fields = ['user', 'description', 'completed']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task_List
        fields = ['taskName','data','completed','id']

class ViewtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task_List
        fields = '__all__'