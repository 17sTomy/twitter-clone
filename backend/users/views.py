from rest_framework import status
from rest_framework import generics
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated

from . models import User
from . serializers import MyTokenObtainPairSerializer, MyUserSerializer, UserSerializer, SearchSerializer
from backend.permissions import IsUserOrReadOnly

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow(request, username):
    me = request.user
    user = User.objects.get(username=username)

    if user in me.following.all():
        me.following.remove(user)
        return Response({'detail': 'Unfollowed'})
    else:
        me.following.add(user)
        return Response({'detail': 'Followed'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reco(request):
    users = User.objects.exclude(username=request.user.username)
    users = users.exclude(id__in=request.user.following.all())[:5]
    serializer = SearchSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search(request):
    query = request.query_params.get('query', None)
    if query is not None:
        users = User.objects.filter(username__icontains=query).exclude(id=request.user.id)
        serializer = SearchSerializer(users, many=True)
        return Response({'users': serializer.data})
    else:
        return Response({'users': []})

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]
    lookup_field = 'username'
    lookup_url_kwarg = 'username'

class MyTokenObtainPairSerializer(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def register(request):
    data = request.data
    try:
        user = User.objects.create(
            username=data['username'],
            name=data['name'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = MyUserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Something went wrong'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)