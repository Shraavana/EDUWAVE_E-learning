from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from django.db import IntegrityError
from smtplib import SMTPException
import logging
from .serializers import *
from tutor.models import *

logger = logging.getLogger(__name__)

class TutorViewSet(viewsets.ModelViewSet):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            # Create tutor profile
            tutor = serializer.save(status='pending')
            
            # Send email with more robust error handling
            self._send_signup_confirmation_email(tutor)
        except IntegrityError:
            return Response({"error": "Username or email already exists."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error during tutor creation: {str(e)}")
            return Response({"error": "An unexpected error occurred during signup."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def _send_signup_confirmation_email(self, tutor):
        try:
            # Use EmailMessage for more control
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
                # Optional: add reply-to and headers
                reply_to=[settings.DEFAULT_FROM_EMAIL],
                headers={'Message-ID': 'tutor-signup-confirmation'}
            )
            
            # Send the email
            email.send(fail_silently=False)
        except Exception as e:
            logger.error(f"Email sending failed: {str(e)}")
            # Optionally, you can choose to re-raise the exception or handle it differently
            raise SMTPException(f"Failed to send signup confirmation email: {str(e)}")

    def _send_status_change_email(self, tutor):
        try:
            email = EmailMessage(
                subject='Tutor Application Status Update',
                body=f'''
                Hello {tutor.username},

                Your tutor application status has been updated to: {tutor.get_status_display()}.
                
                {'Congratulations! You can now login to your account.' if tutor.status == 'approved' else 'Please contact support for more information.'}

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
            # Log the error but don't interrupt the workflow
            # You might want to implement a backup notification method