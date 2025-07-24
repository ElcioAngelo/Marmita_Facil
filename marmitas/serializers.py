from rest_framework import serializers
from .models import Marmita


class MarmitaSerializer(serializers.ModelSerializer):
    email_cozinheiro = serializers.ReadOnlyField(source='Usuario.email')

    class Meta:
        model = Marmita
        fields = '__all__'
        read_only_fields = ['cozinheiro']
        
    def criar_marmita(self, validated_data):
        request = self.context.get('request')
        
        if request and hasattr(request, 'user'):
            validated_data['cozinheiro'] = request.user
        
        return marmita 