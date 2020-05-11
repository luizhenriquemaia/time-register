from .models import b01Schedule, b02TypeContract, c01Employee, d01Time
from rest_framework import viewsets, permissions
from .serializers import ScheduleSerializer, TypeContractSerializer, EmployeeSerializer, TimeSerializer


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



# Time Viewset
class TimeViewSet(viewsets.ModelViewSet):
    #permission_classes = [
    #    permissions.IsAuthenticated
    #]
    serializer_class = TimeSerializer

    def get_queryset(self):
        return d01Time.objects.all()

    # Allow us to save the owner when we create a time
    #def perform_create(self, serializer):
    #    serializer.save(owner=self.request.user)
