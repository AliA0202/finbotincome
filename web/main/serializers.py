from rest_framework import serializers
from .models import CTA


class CTASerializer(serializers.ModelSerializer):

    class Meta:
        model = CTA
        fields = ["phone", "status"]
        extra_kwargs = {"status" : {"read_only" : True}}