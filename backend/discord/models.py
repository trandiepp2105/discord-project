from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from PIL import Image


class UserDiscord(AbstractUser):
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_picture = models.ImageField(upload_to='user_pictures', blank=True, null=True, default='user_pictures/avatar.jpg')
    is_verified = models.BooleanField(default=False)


    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.user_picture.path)    
        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.user_picture.path)
    
    class Meta:
        db_table = 'user'


class Server(models.Model):
    server_id = models.AutoField(primary_key=True)
    server_name = models.CharField(max_length=100)
    # server_owner = models.ForeignKey(UserDiscord, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    server_picture = models.ImageField(upload_to='server_pictures/', blank=True, null=True)
    server_description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.server_name
    
    class Meta:
        db_table = 'server'

class Member(models.Model):
    ADMIN = 'admin'
    MODERATOR = 'moderator'
    MEMBER = 'member'
    ROLES = [
        (ADMIN, 'Admin'),
        (MODERATOR, 'Moderator'),
        (MEMBER, 'Member')
    ]
    member_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(UserDiscord, on_delete=models.CASCADE)
    server_id = models.ForeignKey(Server, on_delete=models.CASCADE)
    date_joined = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=10, choices=ROLES, default=MEMBER)

    def __str__(self):
        return self.user_id.username
    
    class Meta:
        db_table = 'member'

class Channel(models.Model):
    TEXT = 'text'
    VOICE = 'voice'
    CHOOSES = [
        (TEXT, 'Text'),
        (VOICE, 'Voice')
    ]
    channel_id = models.AutoField(primary_key=True)
    channel_name = models.CharField(max_length=100)
    server_id = models.ForeignKey(Server, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    channel_type = models.CharField(max_length=5, choices=CHOOSES, default=TEXT)

    def __str__(self):
        return self.channel_name
    
    class Meta:
        db_table = 'channel'      

class Friend(models.Model):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    STATUS = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted')
    ]
    friend_id = models.AutoField(primary_key=True)
    user1_id = models.ForeignKey(UserDiscord, on_delete=models.CASCADE, related_name='user1_id')
    user2_id = models.ForeignKey(UserDiscord, on_delete=models.CASCADE, related_name='user2_id')
    date_added = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS, default=PENDING)

    def __str__(self):
        return self.user_id.username
    
    class Meta:
        db_table = 'friend' 

class FriendChat(models.Model):
    chat_id = models.AutoField(primary_key=True)
    user1_id = models.ForeignKey(UserDiscord, on_delete=models.CASCADE, related_name='user1_id_chat')
    user2_id = models.ForeignKey(UserDiscord, on_delete=models.CASCADE, related_name='user2_id_chat')

    def __str__(self):
        return self.user1_id.username + ' and ' + self.user2_id.username

    class Meta:
        db_table = 'friend_chat'

class Message(models.Model):
    message_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(UserDiscord, on_delete=models.CASCADE)
    channel_id = models.ForeignKey(Channel, on_delete=models.CASCADE, blank=True, null=True)
    friend_chat_id = models.ForeignKey(FriendChat, on_delete=models.CASCADE, blank=True, null=True)
    message = models.TextField()
    date_sent = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_id.username + ' - ' + self.message + ' - ' + str(self.date_sent)
    
    class Meta:
        db_table = 'message'

class LastSeen(models.Model):
    last_seen_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(UserDiscord, on_delete=models.CASCADE)
    channel_id = models.ForeignKey(Channel, on_delete=models.CASCADE, blank=True, null=True)
    friend_chat_id = models.ForeignKey(FriendChat, on_delete=models.CASCADE, blank=True, null=True)
    last_seen = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user_id.username + ' - ' + str(self.last_seen)
    
    class Meta:
        db_table = 'last_seen'
    

 