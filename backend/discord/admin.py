from django.contrib import admin
from .models import UserDiscord, Server, Channel, Member, FriendChatRoom, Message, Friendship

# Register your models here.
admin.site.register(UserDiscord)
admin.site.register(Friendship)
admin.site.register(Server)
admin.site.register(Channel)
admin.site.register(Member)
admin.site.register(FriendChatRoom)
