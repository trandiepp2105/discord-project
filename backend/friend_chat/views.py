from rest_framework import viewsets, serializers, status
from rest_framework.response import Response

from rest_framework.decorators import action
from .models import Friendship
from .serializers import FriendshipSerializer
from discord.models import UserDiscord
# View for friendship database
class FriendshipViewSet(viewsets.ModelViewSet):
    permission_classes = []

    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer

    def create(self, request, *args, **kwargs):
        # Get the from_friend user from the request
        from_friend = UserDiscord.objects.get(username="trandiep")

        # Get the to_friend username from the request data
        to_friend_username = request.data.get('to_friend')
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


    # def perform_create(self, serializer):
        # from_friend = self.request.user
        from_friend = UserDiscord.objects.get(username="trandiep")
        to_friend_username = self.request.data.get('to_friend')
        if to_friend_username:
            try:
                to_friend = UserDiscord.objects.get(username=to_friend_username)
                if from_friend != to_friend:
                    serializer.save(from_friend=from_friend, to_friend=to_friend, status=Friendship.PENDING)
                else:
                    raise serializers.ValidationError({'message': 'You cannot send a friend request to yourself.'})
            except UserDiscord.DoesNotExist:
                raise serializers.ValidationError({'message': 'User not found.'})
        else:
            raise serializers.ValidationError({'message': 'To friend username is required.'})



    # @action(detail=True, methods=['post'])
    # def accept_friend_request(self, request, pk=None):
    #     user = self.get_object()
    #     friend_id = request.data.get('friend_id')
    #     if friend_id:
    #         try:
    #             friend = UserDiscord.objects.get(pk=friend_id)
    #             friendship = Friendship.objects.get(from_friend=friend, to_friend=user, status=Friendship.PENDING)
    #             friendship.status = Friendship.ACCEPTED
    #             friendship.save()
    #             return Response({"message": "Friend request accepted successfully"})
    #         except Friendship.DoesNotExist:
    #             return Response({"message": "Friendship request not found"}, status=404)
    #         except UserDiscord.DoesNotExist:
    #             return Response({"message": "User not found"}, status=404)