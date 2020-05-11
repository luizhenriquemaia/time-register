from rest_framework import serializers
from .models import b01Schedule, b02TypeContract, c01Employee, d01Time


# Schedule Serializer
class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = b01Schedule
        fields = '__all__'

# TypeContract Serializer
class TypeContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = b02TypeContract
        fields = '__all__'


# Employee Serializer
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = c01Employee
        fields = '__all__'


# Time Serializer
class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = d01Time
        fields = '__all__'
