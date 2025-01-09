from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.timezone import now 
from django.utils import timezone
import random

class MyAccountManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError('User Must Have An Email Address')
            
        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    def create_superuser(self, username, email, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
        )
        user.is_active = True
        user.is_superuser = True
        user.is_email_verified = True
        user.is_staff = True
        
        user.save(using=self._db)
        return user
            

class Users(AbstractBaseUser):
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    is_superuser = models.BooleanField(default=False)
    is_tutor = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=now)
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_created_at = models.DateTimeField(null=True, blank=True)
    is_email_verified = models.BooleanField(default=False)

    def generate_otp(self):
        """Generate a 6-digit OTP and store its creation time"""
        self.otp = str(random.randint(100000, 999999))
        self.otp_created_at = timezone.now()
        self.save()
        return self.otp

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        refresh['user_name'] = self.username
        refresh['user_email'] = self.email
        refresh['user_id'] = self.id
        refresh['isAdmin'] = self.is_superuser
        refresh['is_tutor'] = self.is_tutor
        refresh['is_active'] = self.is_active



        return {
            'RefreshToken': str(refresh),
            'AccessToken': str(refresh.access_token)
        }

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    objects = MyAccountManager()

    
    def __str__(self):
        return self.username
    
    def has_perm(self, perm, obj=None):
        return self.is_superuser
    
    def has_module_perms(self, add_label):
        return True



