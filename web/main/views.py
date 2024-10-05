from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CTASerializer
class CTACreate(APIView):
    def post(self, request):
        serializer = CTASerializer(data={"phone" : request.data['phone']})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response({"error" : "درخواست نامعتبر"}, status=406)