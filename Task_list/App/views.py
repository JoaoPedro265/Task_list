from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Task_List#models
from .serializer import TaskSerializer,UserSerializer#serializer
import json
from django.contrib.auth.models import User


from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password,check_password
from django.contrib.auth import authenticate
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['GET'])
def get_userAll(request):
    if request.method=="GET":
        try:
            user=User.objects.all()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer=UserSerializer(user,many=True)
        return Response(serializer.data)


#REGISTER
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
            
            # Criar dicionario de dados/Hashear a senha e substituir na requisição
            user_data = {
            "username": user_name,
            "email": user_email,
            "password": make_password(user_password)  # Hashear senha
        }

            # Serializar os dados e salvar o novo usuário
            serializer=UserSerializer(data=user_data)
            if serializer.is_valid():
                #serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            
             # Retornar erros de validação do serializer
            return Response(f'erro{serializer.errors}',status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response(f'erro:{str(e)}',status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
        # Tratar erros inesperados
            return Response({'error': 'Ocorreu um erro ao processar a solicitação.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    #REMOVE   
    if request.method=='DELETE':
        pass


#LOGIN
@api_view(['POST'])
def login(request):
    if request.method=='POST':
 
        user_name=request.data.get('username')
        user_password=request.data.get('password')
        # Verificar se os campos obrigatórios foram fornecidos
        if not user_name or not user_password:
            return Response(
                {"error": "Parâmetros 'username' e 'password' são obrigatórios."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Usar authenticate para verificar se as credenciais estão corretas
        user = authenticate(request, username=user_name, password=user_password)

        # Se a autenticação for bem-sucedida, o usuário será retornado
        if user is not None:#add token
            # Gerar o token usando o pacote simplejwt
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                
                # Retornar o token de acesso
                return Response(
                    {"access": access_token, "refresh": str(refresh)},
                    status=status.HTTP_200_OK
                )
        else:
            # Caso a autenticação falhe
            return Response('Credenciais inválidas/usuario nao existe. Tente novamente.', status=status.HTTP_401_UNAUTHORIZED)

