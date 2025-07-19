from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsCozinheiro(BasePermission):
    """
        Permite acesso apenas se o usuário for um cozinheiro.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'cozinheiro'


class isCozinheiroOrReadOnly(BasePermission):
    """
        Somente o cozinheiro pode editar, outros usuários podem ler.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True 
        return request.user == obj.chef
        