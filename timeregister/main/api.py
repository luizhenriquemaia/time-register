from datetime import datetime

from rest_framework import permissions, status, viewsets
from rest_framework.response import Response

from django.core.exceptions import ObjectDoesNotExist

from .models import (
    Employee, FunctionEmployee, Report, Schedule, TimesReport, TypeContract)
from .serializers import (EmployeeSerializer, FunctionEmployeeSerializer,
                          ReportRetrieveSerializer, ReportSerializer,
                          ScheduleSerializer, TimesReportSerializer,
                          TypeContractSerializer)


class ScheduleViewSet(viewsets.ModelViewSet):
    serializer_class = ScheduleSerializer

    def get_queryset(self):
        return Schedule.objects.all()


class TypeContractViewSet(viewsets.ModelViewSet):
    serializer_class = TypeContractSerializer

    def get_queryset(self):
        return TypeContract.objects.all()


class FunctionEmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = FunctionEmployeeSerializer

    def get_queryset(self):
        return FunctionEmployee.objects.all()


class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        return Employee.objects.all()


class ReportViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Report.objects.all()
        if len(queryset) == 0:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = ReportSerializer(queryset, many=True)
            return Response({
                "data": serializer.data,
                "message": ""
            }, status=status.HTTP_200_OK)
    
    def create(self, request):
        try:
            Employee.objects.get(id=request.data['employee_id'])
        except ObjectDoesNotExist:
            return Response({
                "data": "",
                "message": "this employee does not exists"
            }, status=status.HTTP_400_BAD_REQUEST)
        try:
            TypeContract.objects.get(id=request.data['typeContract_id'])
        except ObjectDoesNotExist:
            return Response({
                "data": "",
                "message": "this type of contract does not exists"
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = ReportSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_report = serializer.save()
            return Response({
                "data": serializer.data,
                "message": "report added"
            }, status=status.HTTP_201_CREATED)
        return Response({
            "data": serializer.errors,
            "message": "error adding report"
        }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        try:
            Report.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({
                "data": "",
                "message": "no report founded"
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = ReportSerializer
        deleted_register = serializer.destroy(serializer, id=pk)
        return Response({
            "data": "",
            "message": "report deleted"
        }, status=status.HTTP_204_NO_CONTENT)

    def retrieve(self, request, pk):
        try:
            Report.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({
                "data": "",
                "message": "no report founded"
            }, status=status.HTTP_400_BAD_REQUEST)
        report = Report.retrieve(Report, id=pk)
        serializer = ReportRetrieveSerializer(data=report)
        if serializer.is_valid(raise_exception=True):
            return Response({
                "data": serializer.data,
                "message": ""
            }, status=status.HTTP_200_OK)
        return Response({
            "data": serializer.errors,
            "message": "error when returning report"
        }, status=status.HTTP_400_BAD_REQUEST)
        Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


class TimesReportViewSet(viewsets.ViewSet):
    serializer = TimesReportSerializer

    def list(self, request):
        if request.GET.get("report"):
            query_from_url = request.GET.get("report")
            try:
                data_report_from_db = TimesReport.objects.filter(report_id=query_from_url)
            except ObjectDoesNotExist:
                return Response("", status=status.HTTP_204_NO_CONTENT)
            serializer = TimesReportSerializer(data_report_from_db, many=True)
            if serializer.data:
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        else:    
            queryset = TimesReport.objects.all()
            serializer = TimesReportSerializer(queryset, many=True)
            return Response(serializer.data)
        
    def create(self, request):
        for data in request.data:
            serializer = TimesReportSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                new_report = serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)
