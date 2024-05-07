from django.urls import path
from . import views

urlpatterns = [
    path('', views.TweetList.as_view()),
    path('<int:pk>/', views.TweetDetail.as_view()),
    path('like/<int:pk>/', views.like),
    path('retweet/<int:pk>/', views.retweet),
    path('my-tweets/<str:username>/', views.get_user_tweets),
    path('likes/<str:username>/', views.get_user_likes),
    path('retweets/<str:username>/', views.get_user_retweets),
]