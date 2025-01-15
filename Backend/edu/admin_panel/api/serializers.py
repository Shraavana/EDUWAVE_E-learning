from rest_framework import serializers
from user.models import Users
from tutor.models import Tutor
from rest_framework_simplejwt.tokens import AccessToken,RefreshToken
from django.db.models import Q

class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        # First, try to get the user by either username or email
        user = Users.objects.filter(
            Q(username=username) | Q(email=username)
        ).first()

        if not user:
            raise serializers.ValidationError("No account found with these credentials")

        if not user.is_superuser:
            raise serializers.ValidationError("This account does not have admin privileges")

        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect password")

        # Add some debug logging
        print(f"User found: {user.username}")
        print(f"Is superuser: {user.is_superuser}")
        print(f"Is active: {user.is_active}")

        # Return both user and tokens
        return {
            'user': user,
            'tokens': {
                'access': str(AccessToken.for_user(user)),
                'refresh': str(RefreshToken.for_user(user))
            }
        }
    

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'is_active', 'is_tutor', 'date_joined', 'is_email_verified']




class AdminTutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor
        fields = ['id', 'username', 'email', 'teaching_experience', 'degree', 
                 'certificate', 'status']