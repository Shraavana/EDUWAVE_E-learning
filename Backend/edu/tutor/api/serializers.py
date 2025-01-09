from rest_framework import serializers
from tutor.models import Tutor, TutorApprovalLog
from django.contrib.auth.hashers import make_password

class TutorSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = Tutor
        fields = [
            'id', 'username', 'email', 'password',
            'teaching_experience', 'degree', 
            'certificate', 'status'
        ]
        read_only_fields = ['status']
    
    def validate_password(self, value):
        if not value:
            raise serializers.ValidationError("Password is required")
        return make_password(value)

class TutorApprovalSerializer(serializers.ModelSerializer):
    tutor_details = TutorSerializer(source='tutor', read_only=True)
    
    class Meta:
        model = TutorApprovalLog
        fields = [
            'id', 'tutor', 'tutor_details', 
            'admin_username', 'status', 'created_at', 'comments'
        ]
