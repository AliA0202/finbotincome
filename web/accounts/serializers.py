from accounts.models import User, Referrals
from rest_framework import serializers
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'image', 'first_name', 'last_name', 'phone','password', 'user_type', 'referral_code', 'score']
        extra_kwargs = {'password': {'write_only': True}, 'user_type': {'read_only' : True}, 'referral_code' : {'read_only' : True}, 'score' : {'read_only' : True}}

    def create(self, validated_data):

        user = User(
            **validated_data
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'image', 'first_name', 'last_name']


class MiniUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'score']

    
class ReferralsUserSerializer(serializers.ModelSerializer):
    sub = MiniUserSerializer()
    class Meta:
        model = Referrals
        fields = ['sub']
        depth = 1

class CreateReferralSerializer(serializers.ModelSerializer):
    class Meta:
        model = Referrals
        fields = ['user', 'sub']
