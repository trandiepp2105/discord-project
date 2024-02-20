from rest_framework import serializers
from .models import Friendship
from discord.serializers import UserDiscordSerializer

class FriendshipSerializer(serializers.ModelSerializer):
    from_friend = UserDiscordSerializer(read_only=True)
    to_friend = UserDiscordSerializer(read_only=True)

    class Meta:
        model = Friendship
        fields = ('id', 'from_friend', 'to_friend', 'status', 'date_added')