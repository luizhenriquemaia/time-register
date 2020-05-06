from rest_framework import serializers
from .models import b01Schedule, c01Register, d01Time


# Schedule Serializer
class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = b01Schedule
        fields = '__all__'


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = c01Register
        fields = '__all__'


# Time Serializer
class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = d01Time
        fields = '__all__'
