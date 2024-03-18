from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_id = f'chat_{self.room_id}'

        # Tham gia nhóm kênh của phòng
        await self.channel_layer.group_add(
            self.room_group_id,
            self.channel_name
        )

        # Chấp nhận kết nối WebSocket
        await self.accept()

    async def disconnect(self, close_code):
        # Rời khỏi nhóm kênh của phòng
        await self.channel_layer.group_discard(
            self.room_group_id,
            self.channel_name
        )

    async def receive(self, text_data):
        # Xử lý tin nhắn từ WebSocket
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        print(f"Received: {message}")
        # Gửi tin nhắn tới nhóm kênh của phòng
        await self.channel_layer.group_send(
            self.room_group_id,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        # Gửi tin nhắn từ nhóm kênh của phòng tới WebSocket
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))
