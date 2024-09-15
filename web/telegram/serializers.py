from rest_framework import serializers
from .models import TelegramTicket, TelegramTicketAnswer


class TicketsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramTicket
        fields = ['title', 'text', 'created', 'user']


class TicketAnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramTicketAnswer
        fields = ['ticket', 'text', 'created']