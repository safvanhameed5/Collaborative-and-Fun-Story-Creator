from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes, api_view
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Story, Contribution
from .serializers import StorySerializer, ContributionSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

# Register User
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email)
    login(request, user)
    return Response({'message': 'Registered Successfully'}, status=status.HTTP_201_CREATED)


# Login User
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
            'email': user.email
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_contribution(request, story_id):
    try:
        story = Story.objects.get(pk=story_id)
    except Story.DoesNotExist:
        return Response({"error": "Story not found."}, status=status.HTTP_404_NOT_FOUND)

    if story.contributions.count() >= 4:
        return Response({"error": "This story is already completed."}, status=status.HTTP_400_BAD_REQUEST)

    data = request.data.copy()  # Copy the request data so we can add extra fields
    data['story'] = story.id  # Add the story ID to the contribution data
    data['author'] = request.user.id  # Add the user ID as the author of the contribution

    serializer = ContributionSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        # Check if the story has reached 4 contributions
        if story.contributions.count() == 4:
            story.completed = True
            story.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
