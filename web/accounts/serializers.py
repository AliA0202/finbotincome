from accounts.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'image', 'first_name', 'last_name', 'phone','password', 'user_type']
        extra_kwargs = {'password': {'write_only': True}, 'user_type': {'read_only' : True}}

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