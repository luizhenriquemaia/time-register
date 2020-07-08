import json

from rest_framework import serializers

from .models import (
    Employee, FunctionEmployee, Report, Schedule, TimesReport, TypeContract)


# Schedule Serializer
class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

# TypeContract Serializer
class TypeContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeContract
        fields = '__all__'

# Function Employee Serializer
class FunctionEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FunctionEmployee
        fields = '__all__'


# Employee Serializer
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'name', 'function']


# Report Serializer
class ReportSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)
    employee_id = serializers.IntegerField()
    typeContract = TypeContractSerializer(read_only=True)
    typeContract_id = serializers.IntegerField()
    class Meta:
        model = Report
        fields = ['id', 'initialDate', 'finalDate',
                  'employee', 'employee_id', 'typeContract', 'typeContract_id']

    def create(self, validated_data):
        return Report.create(Report, **validated_data)
    
    def destroy(self, id):
        return Report.destroy(Report, id)


# Report Retrieve Serializer
class ReportRetrieveSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=False)
    employee_id = serializers.IntegerField()
    typeContract = TypeContractSerializer(read_only=False)
    typeContract_id = serializers.IntegerField()

    class Meta:
        model = Report
        fields = ['id', 'initialDate', 'finalDate',
                  'employee', 'employee_id', 'typeContract', 'typeContract_id']
    

# Time's Report Serializer
class TimesReportSerializer(serializers.ModelSerializer):
    schedule = ScheduleSerializer(read_only=True)
    schedule_id = serializers.IntegerField()
    report = ReportSerializer(read_only=True)
    report_id = serializers.IntegerField()

    class Meta:
        model = TimesReport
        fields = ['id', 'dateRegister', 'schedule', 'schedule_id',
                  'timeRegister', 'report', 'report_id']
    
    def create(self, validated_data):
        return TimesReport.create(TimesReport, **validated_data)
