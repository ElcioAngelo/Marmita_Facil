from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from marmitas.models import Marmita
from usuarios.models import Usuario
from marmitafacil.settings import AUTH_USER_MODEL
# Create your models here.
class CargoUsuario(models.TextChoices):
    COZINHEIRO = 'cozinheiro', 'Cozinheiro'
    ADMINISTRADOR = 'admin', 'Admin'
    CLIENTE = 'cliente', 'Cliente'

class UsuarioManager(BaseUserManager):
    def create_user(self, password, email, **extra_fields):
        if not email:
            raise ValueError('O usuário deve ter um email')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None,**extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('esta_ativo', True)

        return self.create_user(email, password)

class Usuario(AbstractBaseUser, PermissionsMixin):
    nome = models.CharField(max_length=255)
    sobrenome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    cidade = models.CharField(max_length=100)
    endereco = models.CharField(max_length=255)
    numero_endereco = models.CharField(max_length=50)
    estado = models.CharField(max_length=100)
    numero_telefone = models.CharField(max_length=20)
    esta_ativo = models.BooleanField(default=True)
    role = models.CharField(max_length=20, choices=CargoUsuario.choices, default=CargoUsuario.CLIENTE)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
    'nome', 
    'sobrenome',
    'cidade', 
    'endereco',
    'estado',
    'numero_telefone', 
    'numero_endereco'
    ]

    objects = UsuarioManager()

    def __str__(self):
        return self.email

class StatusPedido(models.TextChoices):
    PENDENTE = "Pendente", "pendente"
    EM_ANDAMENTO = "Em_Andamento", "em_andamento"
    EM_ENTREGA = "Em_Entrega", "em_entrega"
    FINALIZADO = "Finalizado", "finalizado"
    CANCELADO = "Cancelado", "cancelado"
    
class Pedido(models.Model):
    usuario = models.ForeignKey(
        Usuario, 
        on_delete=models.CASCADE,
        related_name='pedidos',
    )
    marmita = models.ForeignKey(Marmita, on_delete=models.CASCADE)
    quantidade = models.PositiveIntegerField(default=1)
    data_pedido = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=StatusPedido.choices, default=StatusPedido.PENDENTE)

class DiasSemana(models.TextChoices):
    SEGUNDA_FEIRA = "Segunda Feira", "segunda feira"
    TERCA_FEIRA = "Terça Feira", "terça feira"
    QUARTA_FEIRA = "Quarta Feira", "quarta feira"
    QUINTA_FEIRA = "Quinta Feira", "quinta feira"
    SEXTA_FEIRA = "Sexta Feira", "sexta feira"
    SABADO = "Sabado", "sabado"
    DOMINGO = "Domingo", "domingo"
    
class AgendamentoPedido(models.Model):
    usuario = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='agendamentos'
    )
    marmita = models.ForeignKey(Marmita, on_delete=models.CASCADE)
    dias_semana = models.CharField(max_length=30, choices=DiasSemana.choices)
    hora = models.TimeField(default="12:00")
    ativo = models.BooleanField(default=False)
    criado_em = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.usuario.nome} -> {self.marmita.nome} ({self.dias_semana})"
    