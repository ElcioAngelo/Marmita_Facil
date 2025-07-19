from django.urls import path 
from .views import listar_usuarios, criar_usuario, login_com_email

urlpatterns = [
    path('usuarios/', listar_usuarios, name='listar_usuarios'),
    path('usuarios/registrar/', criar_usuario),
    path('usuarios/login/', login_com_email, name='login_email'),
]

