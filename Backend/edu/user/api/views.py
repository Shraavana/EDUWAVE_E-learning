from rest_framework.views import APIView
from .serializers import *
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status 
from django.utils.timezone import now, timedelta
from rest_framework_simplejwt.tokens import RefreshToken ,AccessToken
from django.contrib.auth import authenticate

from rest_framework.permissions import AllowAny

class RegisterView(APIView):
    permission_classes = [AllowAny]  # This is crucial - allows unauthenticated access
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            otp = user.generate_otp()
            print(otp)
            try:
                send_mail(
                    "Your OTP for Registration",
                    f'OTP is {otp}',
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email],
                    fail_silently=True,
                )
            except Exception as e:
                print(f"Error sending OTP email: {e}")
            response_data = {
                'email': user.email,
                'message': "User registered. OTP sent to email.",
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class VerifyOTPView(APIView):
    permission_classes = [AllowAny]  # This is crucial - allows unauthenticated access
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        
        if not email or not otp:
            return Response(
                {'error': 'Email and OTP are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        print('The calling of the function')
            
        try:
            user = Users.objects.get(email=email)
            if not user.otp or not user.otp_created_at:
                return Response(
                    {'error': 'OTP not generated or expired'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            if (user.otp == otp and 
                user.otp_created_at and 
                now() - user.otp_created_at < timedelta(minutes=10)):
                
                user.is_email_verified = True
                user.otp = None
                user.otp_created_at = None
                user.save()
                
                refresh = RefreshToken.for_user(user)
                return Response({
                    'message': 'Email verified successfully',
                    'refresh_token': str(refresh),
                    'access_token': str(refresh.access_token)
                })
                
            return Response(
                {'error': 'Invalid or expired OTP'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        except Users.DoesNotExist:
            return Response(
                {'error': 'User not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        
class LoginView(APIView): 
    def post(self,request):
        email = request.data.get('email')
        password = request.data.get ('password')
        user = authenticate(email=email,password =password)
        if user:
            if not user.is_email_verified:
                return Response({
                    'message':'Please verify the email'
                },status=status.HTTP_403_FORBIDDEN )
            refresh_token = RefreshToken.for_user(user)
            return Response({
                'userid':user.id,
                'username' : user.username,
                'is_tutor' : user.is_tutor,
                'access_token' : str(refresh_token.access_token),
                'refresh_token' :str(refresh_token)
                               },status=status.HTTP_200_OK)
        return Response({
            'message' :'Invalid credentials'
        },status=status.HTTP_401_UNAUTHORISED)
    

    