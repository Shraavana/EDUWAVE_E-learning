from rest_framework.views import APIView
from rest_framework.generics import  GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import AdminLoginSerializer
from user.models import Users
from rest_framework.permissions import  IsAuthenticated
import logging
from user.models import Users
from tutor.models import Tutor
from .serializers import *
from django.core.mail import EmailMessage
from django.conf import settings
from django.db.models import Q
from rest_framework.exceptions import ValidationError  
from .permissions import IsAdminUserWithToken
from rest_framework.exceptions import ValidationError
from .serializers import AdminTutorSerializer
from .permissions import IsAdminUserWithToken







class AdminLoginView(APIView):
    permission_classes = [] 
    
    def post(self, request):
        try:
            serializer = AdminLoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            validated_data = serializer.validated_data
            
            # Verify admin status
            user = validated_data['user']
            if not user.is_superuser:
                return Response({
                    'error': 'User is not an admin'
                }, status=status.HTTP_403_FORBIDDEN)
            
            return Response({
                'message': 'Login successful',
                'tokens': validated_data['tokens'],
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'is_superuser': user.is_superuser
                }
            }, status=status.HTTP_200_OK)
            
        except ValidationError as e:
            error_message = str(e.detail[0]) if isinstance(e.detail, list) else str(e.detail)
            return Response({
                'error': error_message
            }, status=status.HTTP_401_UNAUTHORIZED)
#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

logger = logging.getLogger(__name__)

class UserListView(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        logger.info("Fetching user list")
        try:
            queryset = Users.objects.all().order_by('-date_joined')
            serializer = UserListSerializer(queryset, many=True)
            return Response({'users': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error fetching users: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)        
class ToggleUserBlockView(APIView):
    permission_classes = []

    def post(self, request, user_id):
        """
        Toggle user block status
        """
        try:
            user = Users.objects.get(id=user_id)
            action = request.data.get('action')

            if action not in ['block', 'unblock']:
                return Response({'error': 'Invalid action. Use "block" or "unblock".'}, status=status.HTTP_400_BAD_REQUEST)

            user.is_active = action == 'unblock'
            user.save()

            return Response({
                'message': f'User successfully {"unblocked" if user.is_active else "blocked"}',
                'is_active': user.is_active
            }, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
#------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

class AdminTutorListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            tutors = Tutor.objects.all().order_by('username')
            serializer = AdminTutorSerializer(tutors, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


class AdminTutorStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, tutor_id):
        print("patch..................................")
        try:
            tutor = Tutor.objects.get(id=tutor_id)

            if tutor.status != 'pending':
                return Response({
                    'error': 'Only pending tutors can be approved'
                }, status=status.HTTP_400_BAD_REQUEST)

            tutor.status = 'approved'
            tutor.save()

            
            self._send_approval_email(tutor)
            print("email sent")
            

            return Response({
                'message': f'Tutor {tutor.username} approved successfully!'
            }, status=status.HTTP_200_OK)
        except Tutor.DoesNotExist:
            return Response({
                'error': 'Tutor not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def _send_approval_email(self, tutor):
        try:
            login_url = f"{settings.FRONTEND_URL}/tutor/login"
            email = EmailMessage(
                subject='Your Tutor Application has been Approved!',
                body=f'''
                Dear {tutor.username},

                Congratulations! Your application to become a tutor has been approved.
                You can now log in to your account using your registered email and password at:
                

                Welcome aboard!

                Best regards,
                The Education Platform Team
                ''',
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[tutor.email]
            )
            email.send(fail_silently=False)
        except Exception as e:
            print(f"Error sending approval email: {str(e)}")
#------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

class AdminProfileView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user  
        data = {
            "username": user.username,
            "email": user.email,
            "is_superuser": user.is_superuser,
        }
        return Response(data, status=status.HTTP_200_OK)

