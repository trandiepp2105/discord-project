from django.db import models
from django.contrib.auth.models import AbstractUser
from PIL import Image


class UserDiscord(AbstractUser):
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_picture = models.ImageField(upload_to='user_pictures', blank=True, null=True, default='user_pictures/default.jpg')
    is_verified = models.BooleanField(default=False)
    display_name = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

    def __str__(self):
        # return self.user.username
        return self.username

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.user_picture.path)
        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.user_picture.path)

    class Meta:
        db_table = 'user'

class Friendship(models.Model):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    BLOCKED = 'blocked'
    STATUS = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (BLOCKED, 'Blocked')
    ]
    from_friend = models.ForeignKey(
        UserDiscord,
        on_delete=models.CASCADE,
        related_name="friendships_as_from_friend",
    )
    to_friend = models.ForeignKey(
        UserDiscord,
        on_delete=models.CASCADE,
        related_name="friendships_as_to_friend",
    )

    blocker = models.ForeignKey(UserDiscord, on_delete=models.CASCADE,
        related_name="blocker", null = True, blank = True, default=None)

    date_added = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS, default=PENDING)

    def __str__(self):
        return f"{self.from_friend.username} is friends with {self.to_friend.username}"

    class Meta:
        unique_together = ("from_friend", "to_friend")
        db_table = 'friendship'

class Server(models.Model):
    server_name = models.CharField(max_length=100)
    owner = models.ForeignKey(UserDiscord, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    server_picture = models.ImageField(upload_to='server_pictures/', blank=True, null=True, default='server_pictures/default.jpg')
    members = models.ManyToManyField(UserDiscord,
                                     related_name='servers')
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
    user = models.OneToOneField(UserDiscord, on_delete=models.CASCADE, primary_key=True)
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=10, choices=ROLES, default=MEMBER)
    server_permissions = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.user.username

    class Meta:
        db_table = 'member'

class ChannelCategory(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

    class Meta:
        db_table = 'channel_category'

class Channel(models.Model):
    TEXT = 'text'
    VOICE = 'voice'
    CHOOSES = [
        (TEXT, 'Text'),
        (VOICE, 'Voice')
    ]
    name = models.CharField(max_length=100)
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    members = models.ForeignKey(Member, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    channel_type = models.CharField(max_length=5, choices=CHOOSES, default=TEXT)
    last_message = models.ForeignKey("Message", on_delete=models.CASCADE, related_name='last_message')
    channel_category = models.ForeignKey("ChannelCategory", on_delete=models.CASCADE, related_name='channel_category')
    topic = models.CharField(max_length=100)
    def __str__(self):
        return self.name

    class Meta:
        db_table = 'channel'


class FriendChatRoom(models.Model):
    user1 = models.ForeignKey(UserDiscord, on_delete=models.CASCADE, related_name='user1_id_chat')
    user2 = models.ForeignKey(UserDiscord, on_delete=models.CASCADE, related_name='user2_id_chat')

    def __str__(self):
        return self.user1.username + ' and ' + self.user2.username

    class Meta:
        db_table = 'friend_chat'
class Attachment(models.Model):
    content_type = models.CharField(max_length=256)
    duration_secs = models.DurationField(null=True, blank=True)
    height = models.FloatField(blank=True, null=True)
    width = models.FloatField(blank=True, null=True)
    file_name = models.CharField(max_length=2048, default='file')
    url = models.URLField()
    def __str__(self):
        return self.url

    class Meta:
        db_table = 'attachment'
class Message(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, blank=True, null=True)
    room = models.ForeignKey(FriendChatRoom, on_delete=models.CASCADE, blank=True, null=True)
    author = models.ForeignKey(UserDiscord, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    pinned = models.BooleanField(default=False)
    attachments  = models.ManyToManyField(Attachment, blank=True)
    mention_everyone = models.BooleanField(default=False)
    mentions = models.ManyToManyField('UserDiscord', related_name="mentioned_in", blank=True)
    def __str__(self):
        return self.author.username + ' - ' + self.message + ' - ' + str(self.created_at)

    class Meta:
        db_table = 'message'



class Reaction(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE)
    emoji = models.ForeignKey("Emoji", on_delete=models.CASCADE)
    count = models.IntegerField()

    def __str__(self):
        return self.count

    class Meta:
        db_table = 'reaction'


class Emoji(models.Model):
    url = models.URLField()
    name = models.CharField(max_length=100)
    animated = models.BooleanField(default = False)
    def __str__(self):
        return self.name

    class Meta:
        db_table = 'emoji'
class LastSeen(models.Model):
    user = models.ForeignKey(UserDiscord, on_delete=models.CASCADE)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, blank=True, null=True)
    room = models.ForeignKey(FriendChatRoom, on_delete=models.CASCADE, blank=True, null=True)
    # room is friend chat room

    last_seen = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username + ' - ' + str(self.last_seen)

    class Meta:
        db_table = 'last_seen'


