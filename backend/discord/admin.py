from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(UserDiscord)
admin.site.register(Friendship)
admin.site.register(Server)
admin.site.register(Channel)
admin.site.register(Member)
admin.site.register(FriendChatRoom)
admin.site.register(ChannelCategory)
admin.site.register(Message)
admin.site.register(Attachment)
admin.site.register(Emoji)
admin.site.register(Reaction)

