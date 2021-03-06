import json

from rest_framework import serializers

from .models import (
    Employee, Report, TimesReport, TypeContract)


# TypeContract Serializer
class TypeContractSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = TypeContract
        fields = ['id', 'description', 'hoursSunday', 'hoursMonday', 'hoursTuesday',
            'hoursWednesday', 'hoursThursday', 'hoursFriday', 'hoursSaturday',
            'owner']
    
    def destroy(self, id):
        return TypeContract.destroy(TypeContract, id)


# Employee Serializer
class EmployeeSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Employee
        fields = ['id', 'name', 'function', 'description', 'active', 'owner']
    
    def destroy(self, id):
        return Employee.destroy(Employee, id)


# Report Serializer
class ReportSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    employee = EmployeeSerializer(read_only=True)
    employee_id = serializers.IntegerField()
    typeContract = TypeContractSerializer(read_only=True)
    typeContract_id = serializers.IntegerField()
    class Meta:
        model = Report
        fields = ['id', 'initialDate', 'finalDate',
                  'employee', 'employee_id', 'typeContract', 'typeContract_id', 'owner']
    
    def destroy(self, id):
        return Report.destroy(Report, id)


# Report Retrieve Serializer
class ReportRetrieveSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    employee = EmployeeSerializer(read_only=False)
    employee_id = serializers.IntegerField()
    typeContract = TypeContractSerializer(read_only=False)
    typeContract_id = serializers.IntegerField()

    class Meta:
        model = Report
        fields = ['id', 'initialDate', 'finalDate',
                  'employee', 'employee_id', 'typeContract', 'typeContract_id', 'owner']
    

# Time's Report Serializer
class TimesReportSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    report = ReportSerializer(read_only=True)
    report_id = serializers.IntegerField()

    class Meta:
        model = TimesReport
        fields = ['id', 'dateRegister', 'schedule',
                  'timeRegister', 'report', 'report_id', 'owner']
    
    def create(self, validated_data):
        return TimesReport.create(TimesReport, **validated_data)
