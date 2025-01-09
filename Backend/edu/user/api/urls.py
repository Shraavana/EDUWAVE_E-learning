from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='register-view'),
    path('login/', LoginView.as_view(), name='login-view'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify_otp'),
]