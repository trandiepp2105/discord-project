from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

friendship_viewset = views.FriendshipViewSet.as_view({
    'get': 'list',
    'post': 'create',
    'patch': 'partial_update',
    'delete': 'destroy',
    'accept': 'accept_friend_request',
    'pending': 'list_pending_friends',
    'all': 'list_all_friends',
    'blocked': 'list_blocked_friends',
})

router = DefaultRouter()
router.register(r'users', views.UserDiscordViewSet)
router.register(r'friendships', views.FriendshipViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('signup/', views.SignUp.as_view(), name='signup'),
    path('login/', views.Login.as_view() , name='login'),
    path('verify-login/', views.VerifyLogin.as_view(), name='verify_login'),
    path('verify/<uidb64>/<token>/', views.Verify.as_view() , name='verify'),
    path('servers/', views.ServerViewSet.as_view() , name='servers'),
    # path('csrf/', views.csrf.as_view() , name='csrf'),
    # path('friend_chat/', include('friend_chat.urls')),
    path('friendships/block/<str:username>/', views.FriendshipViewSet.as_view({'post': 'block_friend'})),
    # path('friendships/pending/', views.FriendshipViewSet.as_view({'get': 'list_pending_requests'}), name='friendship-pending-requests'),
    path('friendships/blocked/', views.FriendshipViewSet.as_view({'get': 'list_blocked_friends'}), name='friendship-blocked-friends'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)