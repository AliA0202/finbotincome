from django.urls import path
from .views import TicketsList, CreateTicket, TicketAnswersList

urlpatterns = [
    path('tickets-list/', TicketsList.as_view(), name="tickets-list"),
    path('ticket-answers-list/', TicketAnswersList.as_view(), name="ticket-answers-list"),
    path('create-ticket/', CreateTicket.as_view(), name="create-ticket"),
]
