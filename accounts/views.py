from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from accounts.models import User
import logging
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
def SignupView(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutView(APIView):
    print("LogoutView called")
    permission_classes = [IsAuthenticated]
    for i in permission_classes:
        print(i)
    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response({'message': 'با موفقت خروج صروت گرفت'}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            print(request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
