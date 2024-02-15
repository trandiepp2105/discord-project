from rest_framework import viewsets, generics, status, views
from .models import UserDiscord
from .serializers import UserDiscordSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .form import SignUpForm, LoginForm
from django.core.mail import send_mail
from django.conf import settings
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from rest_framework.permissions import IsAuthenticated
from django.middleware.csrf import get_token
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny


class UserDiscordViewSet(viewsets.ModelViewSet):
    queryset = UserDiscord.objects.all()
    serializer_class = UserDiscordSerializer

class csrf(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def get(self, request):
        return Response({'csrfToken': get_token(request)})

class SignUp(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserDiscordSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(is_verified=False)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            url = f'http://{request.get_host()}/verify/{uid}/{token}'
            email = f'Hi, {user.username}! Please click the link to verify your email: {url}'
            send_mail('Verify your email', email, settings.EMAIL_HOST_USER, [user.email], fail_silently=False)
            return Response({'message': 'Please check your email to verify your account'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class Verify(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def get(self, request, uidb64, token):
        try:
            uid = force_bytes(urlsafe_base64_decode(uidb64))
            user = UserDiscord.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, UserDiscord.DoesNotExist):
            user = None
        if user is not None and default_token_generator.check_token(user, token):
            user.is_verified = True
            user.save()
            return Response({'message': 'Your email has been verified'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        
class Login(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def post(self, request):
        if request.user.is_authenticated:
            return Response({'error': 'You are already logged in'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = LoginForm(data=request.data)
        if serializer.is_valid():
            username = serializer.data['username']
            password = serializer.data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                return Response({'access': access_token, 'refresh': refresh_token}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Logout(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        token = request.data['refresh']
        try:
            token = RefreshToken(token)
            token.blacklist()
            return Response({'message': 'You have been logged out'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Can not log out'}, status=status.HTTP_400_BAD_REQUEST)