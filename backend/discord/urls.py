from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'users', views.UserDiscordViewSet) 

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', views.SignUp.as_view(), name='signup'),
    path('login/', views.Login.as_view() , name='login'),
    path('verify/<uidb64>/<token>/', views.Verify.as_view() , name='verify'),
    path('servers/', views.ServerViewSet.as_view() , name='servers'),
    # path('csrf/', views.csrf.as_view() , name='csrf'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)