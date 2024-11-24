from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import User_Login,Task_List#models
from .serializer import TaskSerializer,UserSerializer#serializer
import json

#hashecar,check_password/verificar senha hasheada
from django.contrib.auth.hashers import make_password,check_password

@api_view(['GET'])
def get_userAll(request):
    if request.method=="GET":
        try:
            user=User_Login.objects.all()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer=UserSerializer(user,many=True)
        return Response(serializer.data)


@api_view(['GET','POST'])
def get_user(request):
    if request.method=='GET':
        try:   
            if request.GET['user']:
                user_id=request.GET['user']
                try:
                    user=User_Login.objects.get(pk=user_id)
                except:
                    return Response(f'usuario nao existe',status=status.HTTP_404_NOT_FOUND)#usuario nao existe
                serializer=UserSerializer(user)
                return Response(serializer.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
    if request.method=="POST":
        try: # Obter dados da requisição
            user_email=request.data.get('email')
            user_password=request.data.get('password')
            
            # Verificar se o email já existe
            user_extist=User_Login.objects.filter(email=user_email)
            if user_extist:
                return Response("ERRO: Usuário com este email já existe.",status=status.HTTP_400_BAD_REQUEST)
            
            # Hashear a senha e substituir na requisição
            hash_password=make_password(user_password)
            request.data['password']=hash_password

            # Serializar os dados e salvar o novo usuário
            serializer=UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
