from accounts.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'email', 'password')
#         extra_kwargs = {'password': {'write_only': True}}

#         def create(self, validated_data):
#             user = User(**validated_data)
#             user.set_password(validated_data['password'])
#             user.save()
#             return user

# class LoginSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ("username", "password")
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'phone','password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            phone=validated_data['phone'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user