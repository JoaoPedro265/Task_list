from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status

from .models import Task_List#models
from .serializer import TaskSerializer,UserSerializer,ViewtaskSerializer#serializer
from django.contrib.auth.models import User


from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
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

            # Verificar campos obrigatórios
            if not user_name or not user_email or not user_password:
                return Response('Campos obrigatórios estão faltando.', status=status.HTTP_400_BAD_REQUEST)
            #tratar email
            email_correct=user_email.strip().lower()

            # Preparar os dados do usuário/Criar dicionario de dados/Hashear a senha e substituir na requisição
            user_data = {
            "username": user_name,
            "email": email_correct,
            "password": make_password(user_password)  # Hashear senha
        }
            # Serializar os dados/salvar o novo usuário
            serializer=UserSerializer(data=user_data)
            if serializer.is_valid():
                try:
                    validated_data=serializer.validated_data

                    # Verificar se o email já existe
                    if User.objects.filter(email=validated_data['email']).exists():
                        return Response('Já existe um usuário com este email.', status=status.HTTP_400_BAD_REQUEST)
                        
                    # Validar formato do email (por exemplo, verificar se é do domínio "gmail.com")
                    if '@gmail.com' not in validated_data['email']:
                        return Response('O email deve ser do domínio @gmail.com.', status=status.HTTP_400_BAD_REQUEST)
                    
                    #sauvar
                    serializer.save()
                    return Response('Usuário registrado com sucesso.',status=status.HTTP_201_CREATED)
                except:
                    # Retornar erros de validação do serializer
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Capturar erros de validação
                 return Response(
                    {"error": 'este usuario/email ja existe', 
                     "refresh": serializer.errors},
                    status=status.HTTP_200_OK
                )
            
        except ValidationError as e:
            return Response(f'erro:{str(e)}',status=status.HTTP_400_BAD_REQUEST)

#LOGIN
@api_view(['POST'])
def user_login(request):
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method=="POST":
        refresh_token=request.data.get('refresh')# Pega o refresh token enviado pelo cliente
        if refresh_token:
            token=RefreshToken(refresh_token)# Cria o objeto RefreshToken com o token recebido
            token.blacklist() # Marca o token como inválido (blacklisted)
        else:
            return Response('ERRO')
        return Response(status=status.HTTP_200_OK)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
#VIEWS_ALL
def tasks(request):
    if request.method=='GET':
        #carregar as tabela
        try:
            table=Task_List.objects.filter(user=request.user)
            serializer=TaskSerializer(table, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response('ERRO')
    #ADD_TASK
    if request.method=='POST':
        text=request.data.get('text')
        user=request.user
        descrition=request.data.get('descrition')
        data={
            'user':user.id,
            'descrition':descrition,
            'text':text,
        }
        serializer=ViewtaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()  # Salvar a tarefa no banco de dados
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET','DELETE','PUT','POST'])
@permission_classes([IsAuthenticated])
def task_view(request,id):
    #TASK_VIEW_ID
    if request.method=="GET":
        try:                         #id da tabela /  id de usuario
            task=Task_List.objects.get(id=id,user=request.user)
            serializer=ViewtaskSerializer(task)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response({'message': 'Tarefa não encontrada ou não pertence ao usuário.'}, status=404)
    #DELETE_TASK
    if request.method=='DELETE':
        try:                        #id da tabela /  id de usuario
            task=Task_List.objects.get(id=id,user=request.user)
            serializer=ViewtaskSerializer(task)
            task.delete()
            return Response({
                'message':'DELETANDO...',
                'data':serializer.data,
            })
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    #EDIT_TASK/CONCLUED_TASK
    if request.method=='PUT':
        try:
            upload_task=Task_List.objects.get(pk=id,user=request.user)
            serializer=ViewtaskSerializer(upload_task,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)