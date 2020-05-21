from rest_framework import serializers
from .models import b01Schedule, b02TypeContract, b03FunctionEmployee, c01Employee, d01Report, d02TimesReport


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
class ReportSerializer(serializers.ModelSerializer):
    # Changing to modelserializer again because of nested fields
    employee = EmployeeSerializer()
    typeContract = TypeContractSerializer()
    class Meta:
        model = d01Report
        fields = ['id', 'initialDate', 'finalDate',
                  'employee', 'typeContract']

    def create(self, validated_data):        
        return d01Report.create(d01Report, **validated_data)
    
    def destroy(self, id):
        return d01Report.destroy(d01Report, id)
    
    # def retrieve(self, id):
    #     return d01Report.retrieve(d01Report, id)
    
    


# Time's Report Serializer
class TimesReportSerializer(serializers.Serializer):
    dateRegister = serializers.DateField()
    schedule = serializers.IntegerField()
    timeRegister = serializers.TimeField()
    report = serializers.IntegerField()

    def create(self, validated_data):
        return d02TimesReport(**validated_data)

    """ class Meta:
        model = d02DetailsReport
        fields = '__all__' """
