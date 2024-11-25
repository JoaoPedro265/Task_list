from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Task_List#models
from .serializer import TaskSerializer,UserSerializer#serializer
import json
from django.contrib.auth.models import User

#hashecar,check_password/verificar senha hasheada
from django.contrib.auth.hashers import make_password,check_password
from django.contrib.auth import authenticate

@api_view(['GET'])
def get_userAll(request):
    if request.method=="GET":
        try:
            user=User.objects.all()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer=UserSerializer(user,many=True)
        return Response(serializer.data)



@api_view(['GET','POST'])
#apenas exibir as tabelas/ REFORMAR
def register(request):
    if request.method=='GET':
        try:   
            if request.GET['user']:
                user_id=request.GET['user']
                try:
                    user=User.objects.get(pk=user_id)
                except:
                    return Response(f'usuario nao existe',status=status.HTTP_404_NOT_FOUND)#usuario nao existe
                serializer=UserSerializer(user)
                return Response(serializer.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        #REGISTER ADD
    if request.method=="POST":
        try: # Obter dados da requisição
            user_name=request.data.get('username')
            user_email=request.data.get('email')
            user_password=request.data.get('password')
           
            # Verificar se o email/nome já existe
            if User.objects.filter(username=user_name).exists():
                return Response(f'tem um usuario com o mesmo NOME',status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(email=user_email).exists():
                return Response(f'tem um usuario com o mesmo EMAIL',status=status.HTTP_400_BAD_REQUEST)
            
            # Hashear a senha e substituir na requisição
            hash_password=make_password(user_password)
            request.data['password']=hash_password

            # Serializar os dados e salvar o novo usuário
            serializer=UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            return Response('erro ao sauvar usuario',status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

#fazer login
@api_view(['POST'])
def login(request):
    if request.method=='POST':
        user_name=request.data.get('email')
        user_password=request.data.get('password')
        if user_name and user_password:
            # Usar authenticate para verificar se as credenciais estão corretas
            user=User.objects.get(email=user_name)
            user = authenticate(request, username=user, password=user_password)

            # Se a autenticação for bem-sucedida, o usuário será retornado
            if user is not None:
                return Response(f'Login realizado com sucesso para o usuário {user.email}', status=status.HTTP_200_OK)
            else:
                # Caso a autenticação falhe
                return Response('Credenciais inválidas/usuario nao existe. Tente novamente.', status=status.HTTP_401_UNAUTHORIZED)
        else:
            # Caso algum dos parâmetros obrigatórios não seja fornecido
            return Response("Parâmetros 'username' e 'password' são obrigatórios.", status=status.HTTP_400_BAD_REQUEST)

