from django.shortcuts import render
from rest_framework import viewsets
from .models import Marmita
from .serializers import MarmitaSerializer
from .permissions import IsCozinheiroOrReadOnly

# Create your views here.

class MarmitaViewSet(viewsets.ModelViewSet):
    serializer_class = MarmitaSerializer
    permission_classes = [IsAuthenticated, IsCozinheiroOrReadOnly]

    def get_queryset(self):
        return Marmita.objects.filter(cozinheiro=self.request.user)

    def perform_create(self,serializer):
        serializer.save(cozinheiro=self.request.user)


    