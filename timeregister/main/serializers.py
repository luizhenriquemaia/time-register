import json
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
        fields = ['id', 'name', 'function']


# Report Serializer
class ReportSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)
    employee_id = serializers.IntegerField()
    typeContract = TypeContractSerializer(read_only=True)
    typeContract_id = serializers.IntegerField()
    class Meta:
        model = d01Report
        fields = ['id', 'initialDate', 'finalDate',
                  'employee', 'employee_id', 'typeContract', 'typeContract_id']

    def create(self, validated_data):
        return d01Report.create(d01Report, **validated_data)
    
    def destroy(self, id):
        return d01Report.destroy(d01Report, id)


# Report Retrieve Serializer
class ReportRetrieveSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=False)
    employee_id = serializers.IntegerField()
    typeContract = TypeContractSerializer(read_only=False)
    typeContract_id = serializers.IntegerField()

    class Meta:
        model = d01Report
        fields = ['id', 'initialDate', 'finalDate',
                  'employee', 'employee_id', 'typeContract', 'typeContract_id']
    

# Time's Report Serializer
class TimesReportSerializer(serializers.ModelSerializer):
    print("\n\n\ntimes report serializer")
    schedule = ScheduleSerializer()
    report = ReportRetrieveSerializer()
    class Meta:
        model = d02TimesReport
        fields = ['dateRegister', 'schedule', 'timeRegister', 'report']
    
    def create(self, validated_data):
        print("\n\n\ntimes report serializer - create")
        return d02TimesReport.create(d02TimesReport, **validated_data)
