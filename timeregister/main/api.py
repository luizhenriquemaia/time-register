from datetime import datetime
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import b01Schedule, b02TypeContract, b03FunctionEmployee, c01Employee, d01Report, d02TimesReport
from .serializers import ScheduleSerializer, TypeContractSerializer, FunctionEmployeeSerializer, EmployeeSerializer, ReportSerializer, ReportRetrieveSerializer, TimesReportSerializer


# Schedule Viewset
class ScheduleViewSet(viewsets.ModelViewSet):
    serializer_class = ScheduleSerializer

    def get_queryset(self):
        return b01Schedule.objects.all()


# TypeContract Viewset
class TypeContractViewSet(viewsets.ModelViewSet):
    serializer_class = TypeContractSerializer

    def get_queryset(self):
        return b02TypeContract.objects.all()


# Function Employee Viewset
class FunctionEmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = FunctionEmployeeSerializer

    def get_queryset(self):
        return b03FunctionEmployee.objects.all()


# Employee Viewset
class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        return c01Employee.objects.all()


# Report Viewset
class ReportViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = d01Report.objects.all()
        serializer = ReportSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = ReportSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_report = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        serializer = ReportSerializer
        deleted_register = serializer.destroy(serializer, id=pk)
        return Response("", status=status.HTTP_204_NO_CONTENT)

    def retrieve(self, request, pk):
        report = d01Report.retrieve(d01Report, id=pk)
        serializer = ReportRetrieveSerializer(data=report)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


# Time's Report Viewset
class TimesReportViewSet(viewsets.ViewSet):
    #permission_classes = [
    #    permissions.IsAuthenticated
    #]
    serializer = TimesReportSerializer

    def list(self, request):
        queryset = d02TimesReport.objects.all()
        serializer = TimesReportSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        for data in request.data:
            print(f"\n\n\nSepareted data: {data} \n\n\n")
            serializer = TimesReportSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                new_report = serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Allow us to save the owner when we create a time
    #def perform_create(self, serializer):
    #    serializer.save(owner=self.request.user)
