from rest_framework import serializers
from .models import *

class UserDiscordSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDiscord
        fields = ['id','username', 'email', 'password', 'is_verified', 'display_name', 'date_of_birth']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserDiscord.objects.create_user(**validated_data)
        return user

class FriendshipSerializer(serializers.ModelSerializer):
    from_friend = UserDiscordSerializer(read_only=True)
    to_friend = UserDiscordSerializer(read_only=True)

    class Meta:
        model = Friendship
        fields = ('id', 'from_friend', 'to_friend', 'status', 'date_added')

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(default=None)
    password = serializers.CharField()
    email = serializers.EmailField(default=None)

class ServerSerializer(serializers.Serializer):
    class Meta:
        model = UserDiscord
        fields = ['server_name', 'server_picture']

    def create(self, validated_data):
        server = Server.objects.create(**validated_data)
        return server

class CreateChannelSerializer(serializers.Serializer):

    class Meta:
        model = Server
        fields = ['channel_name', 'server_id', 'channel_type']

    def create(self, validated_data):
        channel = Channel.objects.create(**validated_data)
        return channel

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

    def create(self, validated_data):
        member = Member.objects.create(**validated_data)
        return member

class MessageSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=UserDiscord.objects.all())  # Sử dụng PrimaryKeyRelatedField để tham chiếu đến người gửi
    class Meta:
        model = Message
        fields = ['id', 'room', 'channel', 'message', 'created_at', 'pinned', 'attachments', 'mention_everyone', 'mentions', 'author']
    def to_representation(self, instance):
        # Ghi đè phương thức này để bao gồm thông tin về người gửi trong dữ liệu đầu ra
        data = super().to_representation(instance)
        author_data = UserDiscordSerializer(instance.author).data  # Sử dụng UserSerializer để serialize thông tin về người gửi
        data['author'] = author_data
        return data
class FriendChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendChatRoom
        fields = '__all__'