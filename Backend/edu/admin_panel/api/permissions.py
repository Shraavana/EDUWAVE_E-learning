from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

# class IsAdminUserWithToken(BasePermission):
#     message = 'You must be an admin user with valid authentication to perform this action.'
    
#     def has_permission(self, request, view):
#         try:
#             # Check if auth header exists
#             auth_header = request.headers.get('Authorization')
#             if not auth_header or not auth_header.startswith('Bearer '):
#                 return False
                
#             # Extract and validate token
#             token = auth_header.split(' ')[1]
#             access_token = AccessToken(token)
            
#             # Get user from token and verify admin status
#             user = request.user
#             return bool(user and user.is_authenticated and user.is_staff and user.is_active)
            
#         except (InvalidToken, TokenError):
#             return False
#         except Exception:
#             return False


class IsAdminUserWithToken(BasePermission):
    message = 'You must be an admin user with valid authentication to perform this action.'
    
    def has_permission(self, request, view):
        try:
            # Check if auth header exists
            auth_header = request.headers.get('Authorization')
            if not auth_header or not auth_header.startswith('Bearer '):
                return False
                
            # Extract and validate token
            token = auth_header.split(' ')[1]
            access_token = AccessToken(token)
            
            # Get user from token
            user_id = access_token['user_id']
            User = get_user_model()
            user = User.objects.get(id=user_id)
            
            # Attach user to request
            request.user = user
            
            return bool(user and user.is_staff and user.is_active)
            
        except (InvalidToken, TokenError, User.DoesNotExist):
            return False
        except Exception:
            return False