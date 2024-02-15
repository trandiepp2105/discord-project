from rest_framework import serializers
from .models import UserDiscord

class UserDiscordSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDiscord
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserDiscord.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()