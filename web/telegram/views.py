from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import TicketsSerializer, TicketAnswersSerializer
from .models import TelegramTicket, TelegramTicketAnswer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


# Create your views here.
class TicketsList(generics.ListAPIView):
    serializer_class = TicketsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return TelegramTicket.objects.filter(user=user)
    

# Create your views here.
class TicketAnswersList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TicketAnswersSerializer

    def get_queryset(self):
        try:
            ticket = TelegramTicket.objects.get(id=self.request.data['ticket'])
            return TelegramTicketAnswer.objects.filter(ticket=ticket)
        except:
            return Response(status=404)
    


class CreateTicket(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = Token.objects.get(key=request.auth.key).user
        data = {"user": user.id, "title": request.data["title"], "text" : request.data['text']}
        serializer = TicketsSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
