from rest_framework.permissions import BasePermission

class IsAdminUserWithToken(BasePermission):
    message = 'You must be an admin user to perform this action.'
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff) 
    # is_staff
