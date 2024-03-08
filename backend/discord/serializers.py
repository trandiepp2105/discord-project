from rest_framework import serializers
from .models import UserDiscord, Server, Channel, Member, FriendChatRoom, Friendship

class UserDiscordSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDiscord
        fields = ['username', 'email', 'password', 'is_verified', 'display_name', 'date_of_birth']
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
    username = serializers.CharField()
    password = serializers.CharField()

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
        fields = ['user_id', 'server_id', 'role']

    def create(self, validated_data):
        member = Member.objects.create(**validated_data)
        return member
