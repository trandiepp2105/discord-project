from rest_framework import serializers
from .models import UserDiscord, Server, Channel

class UserDiscordSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDiscord
        fields = ['username', 'email', 'password', 'is_verified']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserDiscord.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class CreateServerSerializer(serializers.Serializer):
    class Meta:
        model = UserDiscord
        fields = ['server_name', 'server_picture', 'owner_id']
    
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