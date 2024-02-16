from django.contrib import admin
from .models import UserDiscord, Server, Channel

# Register your models here.
admin.site.register(UserDiscord)
admin.site.register(Server)
admin.site.register(Channel)
