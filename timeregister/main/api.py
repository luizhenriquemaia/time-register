from datetime import datetime
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import b01Schedule, b02TypeContract, b03FunctionEmployee, c01Employee, d01Report, d02TimesReport
from .serializers import ScheduleSerializer, TypeContractSerializer, FunctionEmployeeSerializer, EmployeeSerializer, ReportSerializer, TimesReportSerializer


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

    """ def get_serializer_class(self):
        if self.action == 'retrieve':
            return DetailsReportSerializer
        else:
            return ReportSerializer
 """
    def list(self, request):
        queryset = d01Report.objects.all()
        serializer = ReportSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        #### Front end deve retornar o employee_id e o typeContract_id
        serializer = ReportSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid(raise_exception=True):
            new_report = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        serializer = ReportSerializer
        deleted_register = serializer.destroy(serializer, id=pk)
        return Response("", status=status.HTTP_204_NO_CONTENT)

    # impossible to add new data in this way, have to separate the view set
    def retrieve(self, request, pk):
        report = d01Report.retrieve(d01Report, id=pk)
        #print(f"RETRIEVE {report}")
        serializer = ReportSerializer(data=report)
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
        #print(request.data)
        for data in request.data:
            data_year, data_month, data_day = (data['dateRegister']).split('-')
            data['dateRegister'] = datetime(int(data_year), int(data_month), int(data_day))
            data['schedule'] = int(data['schedule'])

            print(f"\n\n\nsepareted data: {data}\n\n\n")
            serializer = ReportSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                new_report = serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Allow us to save the owner when we create a time
    #def perform_create(self, serializer):
    #    serializer.save(owner=self.request.user)
