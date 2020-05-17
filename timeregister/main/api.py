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

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return DetailsReportSerializer
        else:
            return ReportSerializer

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
    
    def create(self, serializer):
        serializer.is_valid(raise_exception=True)
        new_report = serializer.save()
        return Response(new_report)

    def destroy(self, request, pk):
        serializer = ReportSerializer
        deleted_register = serializer.destroy(serializer, id=pk)
        return Response("", status=status.HTTP_204_NO_CONTENT)

    def retrieve(self, request, pk):
        obj_details_report = d02DetailsReport.objects.filter(report_id=pk)
        return Response(obj_details_report)


""" # Data Report Viewset
class DataReportViewSet(viewsets.ViewSet):
    #permission_classes = [
    #    permissions.IsAuthenticated
    #]
    serializer = DetailsReportSerializer

    def list(self, request, pk):
        print("teste3")
        obj_details_report = d02DetailsReport.objects.filter(report=pk)
        return obj_details_report

    # Allow us to save the owner when we create a time
    #def perform_create(self, serializer):
    #    serializer.save(owner=self.request.user) """
