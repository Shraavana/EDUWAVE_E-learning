from django.urls import path
from .views import *

urlpatterns = [
    path('admin/login/', AdminLoginView.as_view(), name='admin-login'),
    path('admin/users/', UserListView.as_view(), name='admin-users-list'),
    path('admin/users/<int:user_id>/', UserListView.as_view(), name='admin-user-action'),
    path('admin/tutors/', AdminTutorListView.as_view(), name='admin-tutors-list'),
    path('admin/tutors/<int:tutor_id>/status/', AdminTutorStatusView.as_view(), name='admin-tutor-status'),
    path('admin/profile/', AdminProfileView.as_view(), name='admin-profile')
]