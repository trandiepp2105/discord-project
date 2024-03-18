from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from .models import UserDiscord
class EmailOrUsernameModelBackend(ModelBackend):

    def authenticate(self, request, username=None, password=None, email=None):
        # User = get_user_model()
        if not (username or email):
            # Không có username hoặc email được cung cấp
            return None

        user = None
        if(username):
            try:
                user = UserDiscord.objects.get(username=username)
            except UserDiscord.DoesNotExist:
                return None
        elif(email):
            try:
                user = UserDiscord.objects.get(email=email)
            except UserDiscord.DoesNotExist:
                return None
        if user.check_password(password):
            if user.is_active:
                return user
        return None