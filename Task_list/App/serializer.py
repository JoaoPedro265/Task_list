from rest_framework import serializers
from .models import User_Login,Task_List

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Login
        fields = '__all__'  # Inclui todos os campos do modelo
        # Ou liste os campos específicos que você quer serializar
        # fields = ['user', 'description', 'completed']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task_List
        fields = '__all__'