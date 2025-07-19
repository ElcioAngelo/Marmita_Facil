from django.db import models
from usuarios.models import Usuario
from django.conf import settings

# Create your models here.

class CategoriaMarmita(models.TextChoices):
    VEGETARIANA = 'vegetariana', 'Vegetariana'
    VEGANA = 'vegana', 'Vegana'
    TRADICIONAL = 'tradicional', 'Tradicional'
    FITNESS = 'fitness', 'Fitness'


class Marmita(models.Model):
    cozinheiro = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='marmita', 
    )
    nome = models.CharField(max_length=255)
    descricao = models.TextField(blank=True, null=True)
    ingredientes = models.TextField(max_length=255)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    disponivel = models.BooleanField(default=True)
    categoria = models.CharField(max_length=20, choices=CategoriaMarmita.choices, default=CategoriaMarmita.TRADICIONAL)
    criada_por = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='marmitas', null=True)
    disponivel = models.BooleanField(default=True)


    def __str__(self):
        return self.nome

class Avaliacao(models.Model):
    cliente = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='avaliacoes', 
    )
    prato = models.ForeignKey(
        'Marmita', on_delete=models.CASCADE,
        related_name='avaliacoes',
    )
    nota = models.PositiveSmallIntegerField()
    comentario = models.TextField(blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['cliente', 'prato']

    def __str__(self):
        return f"{self.cliente.email} avaliou {self.prato.nome} com {self.nota} estrela(s)"
        