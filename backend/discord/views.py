from rest_framework import viewsets, generics, status, views
from .models import UserDiscord
from .serializers import UserDiscordSerializer, LoginSerializer, CreateServerSerializer, CreateChannelSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from rest_framework.permissions import IsAuthenticated
from django.middleware.csrf import get_token
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import Server
from django.template.loader import render_to_string
from django.utils.html import strip_tags


class UserDiscordViewSet(viewsets.ModelViewSet):
    permission_classes = []
    queryset = UserDiscord.objects.all()
    serializer_class = UserDiscordSerializer
    def post(self, request):
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# class csrf(APIView):
#     authentication_classes = []
#     permission_classes = [AllowAny]
#     def get(self, request):
#         return Response({'csrfToken': get_token(request)})

class SignUp(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserDiscordSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(is_verified=False)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            host = '127.0.0.1:3000'
            url = f'http://{host}/verify/{uid}/{token}'
            email = f'Hi, {user.username}! Please click the link to verify your email: {url}'
            html_message = render_to_string('discord/email.html', {'url': url})
            plain_message = strip_tags(html_message)
            send_mail('Verify your email', plain_message, settings.EMAIL_HOST_USER, [user.email], html_message=html_message)
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
        serializer = LoginSerializer(data=request.data)
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
        
class CreateGroup(APIView):
    parser_classes = (IsAuthenticated,)
    def post(self, request):
        user = request.user
        serializer = CreateServerSerializer(data=request.data)
        if serializer.is_valid():
            group = serializer.save(owner_id=user)
            return Response({'message': 'Group created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateChannel(APIView):
    parser_classes = (IsAuthenticated,)
    def post(self, request):
        user = request.user
        server = Server.objects.get(server_id=request.data['server_id'])
        if user != server.owner_id:
            return Response({'error': 'You are not the owner of this group'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = CreateChannelSerializer(data=request.data)
        if serializer.is_valid():
            channel = serializer.save()
            return Response({'message': 'Channel created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)