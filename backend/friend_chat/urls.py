from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
router = DefaultRouter()
friendship_viewset = views.FriendshipViewSet.as_view({
    'get': 'list',
    'post': 'create',
    'patch': 'partial_update',
    'delete': 'destroy',
    'accept': 'accept_friend_request',
})
router.register(r'friendships', views.FriendshipViewSet)

urlpatterns = [
    path('', include(router.urls)),
]