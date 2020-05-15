from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import b01Schedule, b02TypeContract, b03FunctionEmployee, c01Employee, d01Report, d02DetailsReport
from .serializers import ScheduleSerializer, TypeContractSerializer, FunctionEmployeeSerializer, EmployeeSerializer, ReportSerializer, DetailsReportSerializer


# Schedule Viewset
class ScheduleViewSet(viewsets.ModelViewSet):
    #permission_classes = [
    #    permissions.IsAuthenticated
    #]
    serializer_class = ScheduleSerializer

    def get_queryset(self):
        return b01Schedule.objects.all()

    # Allow us to save the owner when we create a time
    #def perform_create(self, serializer):
    #    serializer.save(owner=self.request.user)

# TypeContract Viewset
class TypeContractViewSet(viewsets.ModelViewSet):
    #permission_classes = [
    #    permissions.IsAuthenticated
    #]
    serializer_class = TypeContractSerializer

    def get_queryset(self):
        return b02TypeContract.objects.all()

    # Allow us to save the owner when we create a time
    #def perform_create(self, serializer):
    #    serializer.save(owner=self.request.user)


# Function Employee Viewset
class FunctionEmployeeViewSet(viewsets.ModelViewSet):
    #permission_classes = [
    #    permissions.IsAuthenticated
    #]
    serializer_class = FunctionEmployeeSerializer

    def get_queryset(self):
        return b03FunctionEmployee.objects.all()

    # Allow us to save the owner when we create a time
    #def perform_create(self, serializer):
    #    serializer.save(owner=self.request.user)


# Employee Viewset
class EmployeeViewSet(viewsets.ModelViewSet):
    #permission_classes = [
    #    permissions.IsAuthenticated
    #]
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        return c01Employee.objects.all()

    # Allow us to save the owner when we create a time
    #def perform_create(self, serializer):
    #    serializer.save(owner=self.request.user)


# Report Viewset
class ReportViewSet(viewsets.ViewSet):
    #permission_classes = [
    #    permissions.IsAuthenticated
    #]
    serializer = ReportSerializer

    def list(self, request):
        obj_reports = d01Report.objects.all()
        reports = []
        for report in obj_reports:
            dic_report = {
                "id": report.id,
                "initialDate": report.initialDate,
                "finalDate": report.finalDate,
                "employee": c01Employee.objects.get(id=report.employee.id).name,
                "typeContract": b02TypeContract.objects.get(id=report.typeContract.id).description
            }
            reports.append(dic_report)
        return Response(reports)

    def destroy(self, request, pk):
        obj_report = d01Report.objects.get(id=pk)
        obj_report.delete()
        return Response("", status=status.HTTP_200_OK)

    def retrive(self, request, pk):
        obj_details_report = d02DetailsReport.objects.filter(report=pk)
        return obj_details_report


    # Allow us to save the owner when we create a time
    #def perform_create(self, serializer):
    #    serializer.save(owner=self.request.user)


# Details Report Viewset
class DetailsReportViewSet(viewsets.ViewSet):
    #permission_classes = [
    #    permissions.IsAuthenticated
    #]
    serializer = DetailsReportSerializer

    def retrive(self, request, pk):
        obj_details_report = d02DetailsReport.objects.filter(report=pk)
        return obj_details_report

    # Allow us to save the owner when we create a time
    #def perform_create(self, serializer):
    #    serializer.save(owner=self.request.user)
