from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import AdminLoginSerializer
from user.models import Users
from rest_framework.permissions import IsAdminUser
from rest_framework.pagination import PageNumberPagination
from django.core.paginator import Paginator
import logging
from .serializers import *
from django.core.mail import EmailMessage
from django.conf import settings
from django.db.models import Q
from rest_framework.exceptions import ValidationError  
from .permissions import IsAdminUserWithToken
from rest_framework.exceptions import ValidationError

class UserPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'items_per_page'



class AdminLoginView(APIView):
    permission_classes = []  # Remove permission check for login
    
    def post(self, request):
        try:
            serializer = AdminLoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            validated_data = serializer.validated_data
            
            # Verify admin status
            user = validated_data['user']
            if not user.is_superuser:
                return Response({
                    'error': 'User is not an admin'
                }, status=status.HTTP_403_FORBIDDEN)
            
            return Response({
                'message': 'Login successful',
                'tokens': validated_data['tokens'],
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'is_superuser': user.is_superuser
                }
            }, status=status.HTTP_200_OK)
            
        except ValidationError as e:
            error_message = str(e.detail[0]) if isinstance(e.detail, list) else str(e.detail)
            return Response({
                'error': error_message
            }, status=status.HTTP_401_UNAUTHORIZED)


logger = logging.getLogger(__name__)

class UserListView(APIView):
    permission_classes = [IsAdminUserWithToken]
    
    def get(self, request, *args, **kwargs):
        logger.info("Entering UserListView.get()")  # Debug log
        
        try:
            # Log request parameters
            logger.info(f"Request parameters: {request.GET}")
            
            # Get and validate page parameter
            try:
                page = int(request.GET.get('page', 1))
                logger.info(f"Page number: {page}")
            except ValueError:
                logger.error("Invalid page number provided")
                return Response({
                    'error': 'Invalid page number format'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Get search parameter
            search_query = request.GET.get('search', '')
            logger.info(f"Search query: {search_query}")
            
            # Build queryset
            queryset = Users.objects.all().order_by('-date_joined')
            logger.info(f"Initial queryset count: {queryset.count()}")
            
            # Apply search filter if provided
            if search_query:
                queryset = queryset.filter(
                    Q(username__icontains=search_query) | 
                    Q(email__icontains=search_query)
                )
                logger.info(f"Filtered queryset count: {queryset.count()}")
            
            # Apply pagination
            page_size = 10  # Move this to settings if needed
            paginator = Paginator(queryset, page_size)
            
            try:
                paginated_users = paginator.page(page)
                logger.info(f"Successfully paginated. Total pages: {paginator.num_pages}")
            except Exception as e:
                logger.error(f"Pagination error: {str(e)}")
                return Response({
                    'error': 'Invalid page number'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Serialize the data
            serializer = UserListSerializer(paginated_users, many=True)
            logger.info("Data serialized successfully")
            
            response_data = {
                'users': serializer.data,
                'total_pages': paginator.num_pages,
                'current_page': page,
                'total_users': paginator.count
            }
            
            logger.info("Returning successful response")
            return Response(response_data, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Unexpected error in UserListView.get(): {str(e)}")
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, user_id):
        """
        Toggle user block status
        """
        try:
            user = Users.objects.get(id=user_id)
            action = request.data.get('action')

            if action not in ['block', 'unblock']:
                return Response({
                    'error': 'Invalid action. Use "block" or "unblock".'
                }, status=status.HTTP_400_BAD_REQUEST)

            user.is_active = action == 'unblock'
            user.save()

            return Response({
                'message': f'User successfully {"unblocked" if user.is_active else "blocked"}',
                'is_active': user.is_active
            }, status=status.HTTP_200_OK)

        except Users.DoesNotExist:
            return Response({
                'error': 'User not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class AdminTutorListView(ListAPIView):
    # permission_classes = [IsAdminUser]
    
    def get(self, request):
        try:
            # Add debug logging
            print("Fetching tutors...")
            
            page = int(request.GET.get('page', 1))
            items_per_page = int(request.GET.get('items_per_page', 10))
            search_query = request.GET.get('search', '')
            
            # Modify the query to use Q objects for better filtering
            from django.db.models import Q
            tutors = Tutor.objects.filter(
                Q(username__icontains=search_query) |
                Q(email__icontains=search_query)
            ).order_by('-date_joined')
            
            # Debug print
            print(f"Total tutors found: {tutors.count()}")
            
            # Paginate results
            paginator = Paginator(tutors, items_per_page)
            try:
                paginated_tutors = paginator.page(page)
            except:
                return Response({
                    'error': 'Invalid page number'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            serializer = AdminTutorSerializer(paginated_tutors, many=True)
            
            # Debug print
            print(f"Serialized data: {serializer.data}")
            
            return Response({
                'tutors': serializer.data,
                'total_pages': paginator.num_pages,
                'current_page': page,
                'total_tutors': paginator.count
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(f"Error in AdminTutorListView: {str(e)}")
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class AdminTutorStatusView(APIView):
    permission_classes = [IsAdminUser]
    
    def patch(self, request, tutor_id):
        try:
            tutor = Tutor.objects.get(id=tutor_id)
            new_status = request.data.get('status')
            
            if new_status not in ['approved', 'rejected', 'blocked', 'pending']:
                return Response({
                    'error': 'Invalid status'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            old_status = tutor.status
            tutor.status = new_status
            tutor.save()
            
            # Send email notification based on status change
            if new_status == 'approved' and old_status != 'approved':
                self._send_approval_email(tutor)
            elif new_status == 'rejected' and old_status != 'rejected':
                self._send_rejection_email(tutor)
            
            return Response({
                'message': f'Tutor status updated to {new_status}'
            }, status=status.HTTP_200_OK)
            
        except Tutor.DoesNotExist:
            return Response({
                'error': 'Tutor not found'
            }, status=status.HTTP_404_NOT_FOUND)
    
    def _send_approval_email(self, tutor):
        try:
            login_url = f"{settings.FRONTEND_URL}/tutor/login"  # Configure this in settings
            email = EmailMessage(
                subject='Your Tutor Application has been Approved!',
                body=f'''
                Dear {tutor.username},

                Congratulations! Your application to become a tutor has been approved.
                You can now login to your account using your registered email and password at:
                {login_url}

                Welcome aboard!

                Best regards,
                The Education Platform Team
                ''',
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[tutor.email]
            )
            email.send(fail_silently=False)
        except Exception as e:
            # Log the error but don't stop the approval process
            print(f"Error sending approval email: {str(e)}")
    
    def _send_rejection_email(self, tutor):
        try:
            email = EmailMessage(
                subject='Update on Your Tutor Application',
                body=f'''
                Dear {tutor.username},

                We have reviewed your application to become a tutor on our platform.
                Unfortunately, we are unable to approve your application at this time.

                If you believe this was a mistake or would like to provide additional information,
                please contact our support team.

                Best regards,
                The Education Platform Team
                ''',
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[tutor.email]
            )
            email.send(fail_silently=False)
        except Exception as e:
            # Log the error but don't stop the rejection process
            print(f"Error sending rejection email: {str(e)}")


class AdminProfileView(APIView):
    permission_classes = [IsAdminUserWithToken]  

    def get(self, request):
        user = request.user  
        data = {
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "is_superuser": user.is_superuser,
        }
        return Response(data, status=status.HTTP_200_OK)

