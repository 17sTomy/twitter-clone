from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from . models import Tweet, Comment
from users.models import User
from . serializers import TweetSerializer, CommentSerializer
from .permissions import IsUserOrReadOnly
from backend.pagination import CustomPagination

class CommentDelete(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]

class CommentListCreate(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        tweet = Tweet.objects.get(pk=pk)
        return tweet
    
    def create(self, request, pk):
        tweet = self.get_object(pk)
        data = request.data
        comment = Comment(user=request.user, body=data['body'], tweet=tweet)
        comment.save()
        serializer = CommentSerializer(comment, many=False)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like(request, pk):
    tweet = Tweet.objects.get(pk=pk)
    if request.user in tweet.liked.all():
        tweet.liked.remove(request.user)
    else:
        tweet.liked.add(request.user)
    return Response({ 'status': 'ok' });

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def retweet(request, pk):
    tweet = Tweet.objects.get(pk=pk)
    if request.user in tweet.retweeted.all():
        tweet.retweeted.remove(request.user)
    else:
        tweet.retweeted.add(request.user)
    return Response({ 'status': 'ok' });

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_retweets(request, username):
    user = User.objects.get(username=username)
    tweets = Tweet.objects.filter(retweeted=user)
    serializer = TweetSerializer(tweets, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_likes(request, username):
    user = User.objects.get(username=username)
    tweets = Tweet.objects.filter(liked=user)
    serializer = TweetSerializer(tweets, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_tweets(request, username):
    user = User.objects.get(username=username)
    tweets = Tweet.objects.filter(user=user)
    serializer = TweetSerializer(tweets, many=True, context={'request': request})
    return Response(serializer.data)

class TweetList(generics.ListCreateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TweetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]