from rest_framework import serializers
from .models import TelegramTicket, TelegramTicketAnswer


class TicketsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramTicket
        fields = ['id', 'title', 'text', 'created', 'user', 'status']


class TicketAnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramTicketAnswer
        fields = ['ticket', 'text', 'created']