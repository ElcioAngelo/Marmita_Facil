from .models import Usuario
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status 
from .serializers import UsuarioSerializer, EmailTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_usuarios(request):
    usuarios = Usuario.objects.all().values(
        'id', 'nome', 'sobrenome', 'email',
        'endereco',
        'cidade', 'estado', 'role','numero_endereco','numero_telefone'
    )
    serializer = UsuarioSerializer(usuarios, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def criar_usuario(request):
    serializer = UsuarioSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_com_email(request):
    serializer = EmailTokenObtainPairSerializer(data=request.data, context={'request': request})
    
    if serializer.is_valid():
        user = Usuario.objects.get(email=request.data['email'])
        user_data = UsuarioSerializer(user).data 
        
        token_data = serializer.validated_data
        token_data['user'] = user_data
        
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fazer_pedido(request):
    serializer = AgendamentoPedidoSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
