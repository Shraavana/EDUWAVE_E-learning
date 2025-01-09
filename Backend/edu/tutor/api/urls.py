from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TutorViewSet

router = DefaultRouter()
router.register(r'tutors', TutorViewSet, basename='tutor')

urlpatterns = [
    path('', include(router.urls)),
]


# To use this:

# Signup: POST to /api/tutors/signup/
# Approve/Decline: POST to /api/tutors/{id}/approve_or_decline/
# Get all tutors: GET /api/tutors/
# Get specific tutor: GET /api/tutors/{id}/