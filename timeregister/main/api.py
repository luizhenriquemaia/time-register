from .models import b01Schedule, c01Register, d01Time
from rest_framework import viewsets, permissions
from .serializers import ScheduleSerializer, RegisterSerializer, TimeSerializer


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


# Register Viewset
class RegisterViewSet(viewsets.ModelViewSet):
    #permission_classes = [
    #    permissions.IsAuthenticated
    #]
    serializer_class = RegisterSerializer

    def get_queryset(self):
        return c01Register.objects.all()

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
