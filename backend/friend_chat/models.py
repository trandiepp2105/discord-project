from django.db import models
from discord.models import UserDiscord
# Create your models here.
class Friendship(models.Model):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    STATUS = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted')
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

    date_added = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS, default=PENDING)

    def __str__(self):
        return f"{self.from_friend.username} is friends with {self.to_friend.username}"

    class Meta:
        unique_together = ("from_friend", "to_friend")
        db_table = 'friendship'