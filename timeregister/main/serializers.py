from rest_framework import serializers
from .models import b01Schedule, b02TypeContract, b03FunctionEmployee, c01Employee, d01Report, d02DetailsReport


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

# Function Employee Serializer
class FunctionEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = b03FunctionEmployee
        fields = '__all__'


# Employee Serializer
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = c01Employee
        fields = '__all__'

# Report Serializer
class ReportSerializer(serializers.Serializer):
    initialDate = serializers.DateField()
    finalDate = serializers.DateField()
    employee = serializers.IntegerField()
    typeContract = serializers.IntegerField()

    def create(self, validated_data):
        return d01Report(**validated_data)
    
    def destroy(self, id):
        return d01Report.destroy(d01Report, id)


#    class Meta:
#        model = d01Report
#        fields = '__all__'


# Data Report Serializer
class DetailsReportSerializer(serializers.Serializer):
    dateRegister = serializers.DateField()
    schedule = serializers.IntegerField()
    timeRegister = serializers.TimeField()
    report = serializers.IntegerField()

    def create(self, validated_data):
        return d02DetailsReport(**validated_data)

    """ class Meta:
        model = d02DetailsReport
        fields = '__all__' """
