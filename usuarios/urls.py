from django.urls import path 
from .views import listar_usuarios,perfil_usuario, buscar_restaurante, criar_usuario, login_com_email, listar_restaurante, mudar_cargo_para_cozinheiro, criar_restaurante, atualizar_restaurante
urlpatterns = [
    path('usuarios/', listar_usuarios, name='listar_usuarios'),
    path('usuarios/registrar/', criar_usuario, name='criar_usuario'),
    path('usuarios/login/', login_com_email, name='login_email'),
    path('restaurantes/visualizar/',listar_restaurante,name='listar_restaurante'),
    path('usuarios/alterar_cargo/',mudar_cargo_para_cozinheiro,name='mudar_cargo_para_cozinheiro'),
    path('restaurantes/criar/',criar_restaurante,name='criar_restaurante'),
    path('restaurantes/atualizar/',atualizar_restaurante,name='atualizar_restaurante'),
    path('restaurantes/buscar/<int:codigo>/',buscar_restaurante,name='buscar_restaurante'),
    path('/me',perfil_usuario,name='perfil_usuario')
]


