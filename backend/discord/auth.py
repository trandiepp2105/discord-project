from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

class EmailOrUsernameModelBackend(ModelBackend):

    def authenticate(self,request, username=None, password=None):
        User = get_user_model()     
        try:
            if '@' in username:
                user = User.objects.get(email=username)
                if user.check_password(password):
                    return user
            else:
                user = User.objects.get(username=username)
                if user.check_password(password):
                    return user
        except User.DoesNotExist:
            return None