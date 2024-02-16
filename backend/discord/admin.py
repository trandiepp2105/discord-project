from django.contrib import admin
from .models import UserDiscord, Server, Channel, Member, Friend, FriendChat, Message

# Register your models here.
admin.site.register(UserDiscord)
admin.site.register(Server)
admin.site.register(Channel)
admin.site.register(Member)
admin.site.register(Friend)
admin.site.register(FriendChat)
