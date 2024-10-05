from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, ReferralsUserSerializer, CreateReferralSerializer
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView
from accounts.models import User, Referrals

@api_view(['POST'])
def SignupView(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        try:
            check_exist = User.objects.filter(username=request.data['username']).exists()
            if check_exist:
                return Response({"error": "این نام کاربری از قبل رزرو شده است"}, status=406)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(serializer.errors, status=500)

    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response({'message': 'با موفقت خروج صروت گرفت'}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class EditProfileView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    


class ReferralsUser(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ReferralsUserSerializer

    def get_queryset(self):
        user = self.request.user
        return Referrals.objects.filter(user=user)


class CreateReferral(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        sub = Token.objects.get(key=request.auth.key).user
        referral = ""
        
        try:
            referral = request.data['referral_code']
            user = User.objects.get(referral_code=referral)
        except:
            return Response({"error" : "کد رفرال نامعتبر"}, status=404)

        data = {"user": user.id, "sub": sub.id}
        serializer = CreateReferralSerializer(data=data)

        if serializer.is_valid():
            if Referrals.objects.filter(sub=sub).exists():
                return Response({"error" : "این کاربر قبلا با کد دیگری دعوت شده است"}, status=406)
            
            serializer.save()
            user.score += 5
            user.save()

            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
