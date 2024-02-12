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

class UserDiscordViewSet(viewsets.ModelViewSet):
    queryset = UserDiscord.objects.all()
    serializer_class = UserDiscordSerializer

def SignUp(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_verified = False
            user.save()
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            email = f'Hi, {user.username}! Please click the link to verify your email: http://{request.get_host()}/verify/{uid}/{token}'
            send_mail('Verify your email', email, settings.EMAIL_HOST_USER, [user.email], fail_silently=False)
            return Response('Please check your email to verify your account', status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Invalid form'}, status=status.HTTP_400_BAD_REQUEST)

def Verify(request, uidb64, token):
    try:
        uid = force_bytes(urlsafe_base64_decode(uidb64))
        user = UserDiscord.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, UserDiscord.DoesNotExist):
        user = None
    if user is not None and default_token_generator.check_token(user, token):
        user.is_verified = True
        user.save()
        return Response('Your email has been verified', status=status.HTTP_200_OK)
    else:
        return Response('Invalid link', status=status.HTTP_400_BAD_REQUEST)

def Login(request):
    if request.user.is_authenticated:
        return Response('You are already logged in!', status=status.HTTP_200_OK)
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                return Response({'refresh': refresh_token, 'access': access_token}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            form = LoginForm()
            return Response({'error': 'Invalid form'}, status=status.HTTP_400_BAD_REQUEST)
    
def Logout(request):
    permission_classes = (IsAuthenticated,)
    if request.method == 'POST':
        token = request.data['refresh']
        try:
            token = RefreshToken(token)
            token.blacklist()
            return Response('You have been logged out', status=status.HTTP_200_OK)
        except:
            return Response('Invalid token', status=status.HTTP_400_BAD_REQUEST)
