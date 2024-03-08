from rest_framework import viewsets, generics, status, views, serializers
from .models import UserDiscord
from .serializers import UserDiscordSerializer, LoginSerializer, ServerSerializer, CreateChannelSerializer, MemberSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from rest_framework.permissions import IsAuthenticated
# from django.middleware.csrf import get_token
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import Server
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from datetime import date
from rest_framework.response import Response
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from .serializers import FriendshipSerializer
from .models import UserDiscord, Friendship
from rest_framework_simplejwt.authentication import JWTAuthentication
class UserDiscordViewSet(viewsets.ModelViewSet):
    permission_classes = []
    queryset = UserDiscord.objects.all()
    serializer_class = UserDiscordSerializer

class FriendshipViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]

    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer

    def create(self, request, *args, **kwargs):
        # Get the from_friend user from the request
        # from_friend = UserDiscord.objects.get(username="trandiep")
        from_friend = request.user
        data = request.data
        print("data: ", data)
        # Get the to_friend username from the request data
        to_friend_username = request.data.get('username')
        to_friend =  UserDiscord.objects.get(username=to_friend_username)
        # Create a new instance of the serializer
        serializer = self.serializer_class(data=request.data, # or request.data
                                           context={'author': from_friend})

        # Perform validation on the serializer
        if serializer.is_valid():
            if to_friend_username:
                to_friend = UserDiscord.objects.get(username=to_friend_username)
                if Friendship.objects.filter(from_friend=from_friend, to_friend=to_friend).exists() or Friendship.objects.filter(from_friend=to_friend, to_friend=from_friend).exists():
                    return Response({'message': 'Friendship request already exists.'}, status=status.HTTP_400_BAD_REQUEST)
                elif from_friend != to_friend:
                    serializer.save(from_friend=from_friend, to_friend=to_friend, status=Friendship.PENDING)
                else:
                    return Response({'message': 'You cannot send a friend request to yourself.'}, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'message': 'To friend username is required.'}, status=status.HTTP_400_BAD_REQUEST)
            message = f'Sending friend request to {to_friend_username} successfully.'
            return Response({'message': message}, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
            friendship = self.get_object()
            friendship.delete()
            return Response({"message": "Friendship deleted successfully"}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='accept')
    def accept_friend_request(self, request, pk=None):
        friendship = self.get_object()
        if friendship.status == Friendship.PENDING:
            friendship.status = Friendship.ACCEPTED
            friendship.save()
            return Response({"message": "Friend request accepted successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Friendship request not found or already accepted"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def block_friend(self, request, username):
        requester = UserDiscord.objects.get(username="user1")
        try:
            to_friend = UserDiscord.objects.get(username=username)
        except UserDiscord.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        if to_friend == requester:
            return Response({'error': 'Cannot block yourself'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            friendship = get_object_or_404(Friendship, Q(from_friend=requester, to_friend=to_friend) | Q(from_friend=to_friend, to_friend=requester))
        except Friendship.DoesNotExist:
            return Response({'error': 'Not friends with this user'}, status=status.HTTP_400_BAD_REQUEST)

        friendship.blocker = requester
        friendship.status = Friendship.BLOCKED
        friendship.save()

        return Response({'message': 'Friend blocked successfully'})

    def list(self, request, *args, **kwargs):
        user = UserDiscord.objects.get(username="user1")
        friendships = Friendship.objects.filter(from_friend=user, status=Friendship.ACCEPTED) | Friendship.objects.filter(to_friend=user, status=Friendship.ACCEPTED)
        serializer = self.get_serializer(friendships, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='pending')
    def list_pending_friends(self, request, *args, **kwargs):
        # user = UserDiscord.objects.get(username="user1")
        user = request.user
        friend_requests = Friendship.objects.filter(to_friend=user, status=Friendship.PENDING)
        user = request.user
        # friend_requests = Friendship.objects.filter(to_friend=user, status=Friendship.ACCEPTED)
        # friendships = Friendship.objects.filter(Q(from_friend=user, status=Friendship.ACCEPTED) | Q(to_friend=user, status=Friendship.ACCEPTED))
        friendships = Friendship.objects.filter(to_friend=user, status=Friendship.PENDING)
        users = []
        for friendship in friendships:
            users.append(friendship.to_friend)
        serializer = UserDiscordSerializer(users, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='all')
    def list_all_friends(self, request, *args, **kwargs):
        # user = UserDiscord.objects.get(username="user1")
        user = request.user
        # friend_requests = Friendship.objects.filter(to_friend=user, status=Friendship.ACCEPTED)
        friendships = Friendship.objects.filter(Q(from_friend=user, status=Friendship.ACCEPTED) | Q(to_friend=user, status=Friendship.ACCEPTED))
        users = []
        for friendship in friendships:
            # Nếu user là from_friend, thêm to_friend vào danh sách người dùng
            if friendship.from_friend == user:
                users.append(friendship.to_friend)
            # Nếu user là to_friend, thêm from_friend vào danh sách người dùng
            else:
                users.append(friendship.from_friend)
        # serializer = self.get_serializer(friendships, many=True)
        serializer = UserDiscordSerializer(users, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='blocked')
    def list_blocked_friends(self, request, *args, **kwargs):
        user = request.user
        # blocked_friends = Friendship.objects.filter(blocker=user, status=Friendship.BLOCKED)
        friendships = Friendship.objects.filter(blocker=user, status=Friendship.BLOCKED)
        users = []
        for friendship in friendships:
            if friendship.from_friend == user:
                users.append(friendship.to_friend)
            else:
                users.append(friendship.from_friend)
        serializer = UserDiscordSerializer(users, many=True)
        return Response(serializer.data)

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
        # day = request.data['date_of_birth'].split('/')
        # day_of_birth = date(int(day[2]), int(day[1]), int(day[0]))
        if serializer.is_valid():
            user = serializer.save(is_verified=False)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            host = '127.0.0.1:3000'
            url = f'http://{host}/verify-email/{uid}/{token}'
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
                print(f"Access Token: {access_token}")
                refresh_token = str(refresh)
                response = Response({'message':'Login_success!', "access_token": access_token, "refresh_token":refresh_token}, status=status.HTTP_200_OK)
                # response.set_cookie(key='jwt_token', value=access_token, httponly=True,  samesite='Lax',  domain='127.0.0.1', max_age=3600, path='/')
                # response.set_cookie('jwt_refresh', refresh_token, httponly=True, samesite='None',  domain='127.0.0.1', max_age=3600, path='/')
                return response

            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyLogin(APIView):
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        if request.user.is_authenticated:
            # Người dùng đã đăng nhập
            return Response({'loggedIn': True}, status=status.HTTP_200_OK)
        else:
            # Người dùng chưa đăng nhập
            return Response({'loggedIn': False}, status=status.HTTP_200_OK)

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

class ServerViewSet(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        user = request.user
        serializer = ServerSerializer(data=request.data)
        if serializer.is_valid():
            group = serializer.save()
            create_member = MemberSerializer(data={'user_id': user.id, 'server_id': group.server_id, 'role': 'admin'})
            if create_member.is_valid():
                create_member.save()
            else:
                return Response(create_member.errors, status=status.HTTP_400_BAD_REQUEST)
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