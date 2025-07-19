from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

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

    