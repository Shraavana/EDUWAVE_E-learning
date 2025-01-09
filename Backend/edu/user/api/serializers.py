from user.models import Users
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        style={'input_type': 'password'}
    )
    confirm_password = serializers.CharField(
        write_only=True, 
        required=True, 
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = Users
        fields = [
            'id', 
            'username', 
            'email', 
            'password', 
            'confirm_password',
            'is_tutor', 
            'date_joined'
        ]
        read_only_fields = ['id', 'date_joined']
    
    def validate_username(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Username must be at least 3 characters long.")        
        return value
    
    def validate_email(self, value):
        if Users.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.") 
        return value
    
    def validate(self, data):
        password = data.get('password')
        confirm_password = data.pop('confirm_password')
        
        # Check if passwords match
        if password != confirm_password:
            raise serializers.ValidationError({
                "password": "Passwords do not match."
            })
        
        # Django password validation
        try:
            validate_password(password)
        except DjangoValidationError as e:
            raise serializers.ValidationError({
                "password": list(e.messages)
            })
        
        return data
    
    def create(self, validated_data):
        # Remove confirm_password before creating user
        validated_data.pop('confirm_password', None)
        
        # Create user
        user = Users.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        
        return user
    
    
