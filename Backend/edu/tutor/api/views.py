from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from django.db import IntegrityError
from smtplib import SMTPException
import logging
from .serializers import TutorSerializer, TutorApprovalSerializer
from tutor.models import Tutor, TutorApprovalLog
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny

logger = logging.getLogger(__name__)

class TutorViewSet(viewsets.ModelViewSet):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer

   
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def signup(self, request):
        print("tryingg...........")
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create tutor profile
            tutor = serializer.save(status='pending')
            
            # Send email confirmation
            self._send_signup_confirmation_email(tutor)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except IntegrityError:
            return Response(
                {"error": "Username or email already exists."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except SMTPException as e:
            logger.error(f"Email sending failed: {str(e)}")
            # Still create the user but notify about email failure
            return Response({
                "data": serializer.data,
                "warning": "Account created but confirmation email could not be sent."
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error during tutor creation: {str(e)}")
            return Response(
                {"error": "An unexpected error occurred during signup."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['post'])
    def approve_or_decline(self, request, pk=None):
        tutor = self.get_object()
        new_status = request.data.get('status')
        
        if new_status not in ['approved', 'declined']:
            return Response(
                {"error": "Invalid status. Must be 'approved' or 'declined'."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Update tutor status
            tutor.status = new_status
            tutor.save()

            # Create approval log
            TutorApprovalLog.objects.create(
                tutor=tutor,
                admin_username=request.user.username,
                status=new_status,
                comments=request.data.get('comments', '')
            )

            # Send status update email
            self._send_status_change_email(tutor)

            return Response({
                "message": f"Tutor application {new_status} successfully.",
                "tutor": TutorSerializer(tutor).data
            })

        except Exception as e:
            logger.error(f"Error updating tutor status: {str(e)}")
            return Response(
                {"error": "Failed to update tutor status."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def _send_signup_confirmation_email(self, tutor):
        try:
            email = EmailMessage(
                subject='Tutor Signup Received',
                body=f'''
                Hello {tutor.username},

                Your tutor signup has been received and is pending approval. 
                You will be notified once the admin reviews your application.

                Best regards,
                Tutor Platform
                ''',
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[tutor.email],
                reply_to=[settings.DEFAULT_FROM_EMAIL],
                headers={'Message-ID': 'tutor-signup-confirmation'}
            )
            email.send(fail_silently=False)
        except Exception as e:
            logger.error(f"Email sending failed: {str(e)}")
            raise SMTPException(f"Failed to send signup confirmation email: {str(e)}")

    def _send_status_change_email(self, tutor):
        try:
            email = EmailMessage(
                subject='Tutor Application Status Update',
                body=f'''
                Hello {tutor.username},

                Your tutor application status has been updated to: {tutor.get_status_display()}.
                
                {'Congratulations! You can now login to your account.' if tutor.status == 'approved' 
                 else 'Please contact support for more information.'}

                Best regards,
                Tutor Platform
                ''',
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[tutor.email],
                reply_to=[settings.DEFAULT_FROM_EMAIL],
                headers={'Message-ID': 'tutor-status-update'}
            )
            email.send(fail_silently=False)
        except Exception as e:
            logger.error(f"Status change email failed: {str(e)}")
            # Log but don't raise to prevent interrupting the approval flow
            logger.warning("Status change notification email could not be sent")