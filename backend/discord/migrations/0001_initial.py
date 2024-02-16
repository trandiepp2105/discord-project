# Generated by Django 4.0.10 on 2024-02-16 04:12

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserDiscord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('user_picture', models.ImageField(blank=True, default='user_pictures/default.jpg', null=True, upload_to='user_pictures')),
                ('is_verified', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'db_table': 'user',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('channel_id', models.AutoField(primary_key=True, serialize=False)),
                ('channel_name', models.CharField(max_length=100)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('channel_type', models.CharField(choices=[('text', 'Text'), ('voice', 'Voice')], default='text', max_length=5)),
            ],
            options={
                'db_table': 'channel',
            },
        ),
        migrations.CreateModel(
            name='FriendChat',
            fields=[
                ('chat_id', models.AutoField(primary_key=True, serialize=False)),
                ('user1_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user1_id_chat', to=settings.AUTH_USER_MODEL)),
                ('user2_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user2_id_chat', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'friend_chat',
            },
        ),
        migrations.CreateModel(
            name='Server',
            fields=[
                ('server_id', models.AutoField(primary_key=True, serialize=False)),
                ('server_name', models.CharField(max_length=100)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('server_picture', models.ImageField(blank=True, default='server_pictures/default.jpg', null=True, upload_to='server_pictures/')),
            ],
            options={
                'db_table': 'server',
            },
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('message_id', models.AutoField(primary_key=True, serialize=False)),
                ('message', models.TextField()),
                ('date_sent', models.DateTimeField(auto_now_add=True)),
                ('channel_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='discord.channel')),
                ('friend_chat_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='discord.friendchat')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'message',
            },
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('member_id', models.AutoField(primary_key=True, serialize=False)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('role', models.CharField(choices=[('admin', 'Admin'), ('moderator', 'Moderator'), ('member', 'Member')], default='member', max_length=10)),
                ('server_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='discord.server')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'member',
            },
        ),
        migrations.CreateModel(
            name='LastSeen',
            fields=[
                ('last_seen_id', models.AutoField(primary_key=True, serialize=False)),
                ('last_seen', models.DateTimeField(auto_now=True)),
                ('channel_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='discord.channel')),
                ('friend_chat_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='discord.friendchat')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'last_seen',
            },
        ),
        migrations.CreateModel(
            name='Friend',
            fields=[
                ('friend_id', models.AutoField(primary_key=True, serialize=False)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('accepted', 'Accepted')], default='pending', max_length=10)),
                ('user1_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user1_id', to=settings.AUTH_USER_MODEL)),
                ('user2_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user2_id', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'friend',
            },
        ),
        migrations.AddField(
            model_name='channel',
            name='server_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='discord.server'),
        ),
    ]
