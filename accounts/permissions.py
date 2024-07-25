from rest_framework import permissions
from accounts.models import User

class IsActiveAndVIP(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_active and request.user.user_type == 'V'
    
