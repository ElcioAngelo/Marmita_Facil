from .models import Usuario, Restaurante
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status 
from .serializers import UsuarioSerializer, EmailTokenObtainPairSerializer, RestauranteSerializer
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
    try:
        serializer = AgendamentoPedidoSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def criar_restaurante(request):
    try: 
        if request.user.role != 'cozinheiro':
            return Response({"erro": "Somente cozinheiros podem criar restaurantes."}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = RestauranteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def atualizar_restaurante(request, id):
    try:
        restaurante = Restaurante.objects.get(pk=id, usuario=request.user)
    except Restaurante.DoesNotExist:
        return Response({"erro": "Restaurante não encontrado ou acesso negado."}, status=status.HTTP_404_NOT_FOUND)

    serializer = RestauranteSerializer(restaurante, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_restaurante(request, codigo):
    try: 
        user = request.user 
        if user.role == 'Cozinheiro':
            restaurante = Restaurante.objects.get(codigo=codigo, usuario=request.user)
        else:
            restaurante = Restaurante.objects.get(codigo=codigo)
        serializer = RestauranteSerializer(restaurante)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Restaurante.DoesNotExist:
        return Response(
            {'detail': "Restaurante não encontrado."},
            status=status.HTTP_404_NOT_FOUND
        )
        


