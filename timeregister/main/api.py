from datetime import datetime, date

from rest_framework import permissions, status, viewsets
from rest_framework.response import Response

from django.core.exceptions import ObjectDoesNotExist

from .models import (
    Employee, Report, Schedule, TimesReport, TypeContract)
from .serializers import (EmployeeSerializer,
                          ReportRetrieveSerializer, ReportSerializer,
                          ScheduleSerializer, TimesReportSerializer,
                          TypeContractSerializer)


class ScheduleViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ScheduleSerializer

    def get_queryset(self):
        return Schedule.objects.filter(owner=self.request.user)


class TypeContractViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    
    def list(self, request):
        queryset = TypeContract.objects.filter(owner=self.request.user)
        if len(queryset) == 0:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = TypeContractSerializer(queryset, many=True)
            return Response({
                "data": serializer.data,
                "message": ""
            }, status=status.HTTP_200_OK)
    
    def create(self, request):
        try:
            if request.data['description'] and (request.data['hoursSunday'] or request.data['hoursSunday'] == 0) and (request.data['hoursMonday'] or request.data['hoursMonday'] == 0) and (request.data['hoursTuesday'] or request.data['hoursTuesday'] == 0) and (request.data['hoursWednesday'] or request.data['hoursWednesday'] == 0) and (request.data['hoursThursday'] or request.data['hoursThursday'] == 0) and (request.data['hoursFriday'] or request.data['hoursFriday'] == 0) and (request.data['hoursSaturday'] or request.data['hoursSaturday'] == 0):
                serializer = TypeContractSerializer(data=request.data)
                if serializer.is_valid(raise_exception=True):
                    new_type_of_contract = serializer.save(owner=self.request.user)
                    return Response({
                        "data": serializer.data,
                        "message": "type of contract added"
                    }, status=status.HTTP_201_CREATED)
                return Response({
                    "data": serializer.errors,
                    "message": "error adding type of contract"
                }, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({
                    "data": "",
                    "message": "not enought data to add a new type of contract"
                }, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({
                "data": "",
                "message": "error adding type of contract"
            }, status=status.HTTP_400_BAD_REQUEST)


class EmployeeViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = Employee.objects.filter(owner=self.request.user)
        if len(queryset) == 0:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = EmployeeSerializer(queryset, many=True)
            return Response({
                "data": serializer.data,
                "message": ""
            }, status=status.HTTP_200_OK)
    
    def create(self, request):
        try:
            if request.data['name'] and request.data['function'] and request.data['description']:
                serializer = EmployeeSerializer(data=request.data)
                if serializer.is_valid(raise_exception=True):
                    new_employee = serializer.save(owner=self.request.user)
                    return Response({
                        "data": serializer.data,
                        "message": "employee added"
                    }, status=status.HTTP_201_CREATED)
                return Response({
                    "data": serializer.errors,
                    "message": "error adding employee"
                }, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({
                "data": "",
                "message": "not enougth data to add a employee"
            }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        try:
            Employee.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({
                "data": "",
                "message": "no employee founded"
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = EmployeeSerializer
        deleted_employee = serializer.destroy(serializer, id=pk)
        return Response({
            "data": "",
            "message": "employee deleted"
        }, status=status.HTTP_204_NO_CONTENT)


class ReportViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = Report.objects.filter(owner=self.request.user)
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
            new_report = serializer.save(owner=self.request.user)
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
    permission_classes = [permissions.IsAuthenticated]
    serializer = TimesReportSerializer

    def list(self, request):
        if request.GET.get("report"):
            report_request = request.GET.get("report")
            try:
                Report.objects.get(id=report_request)
            except ObjectDoesNotExist:
                return Response({
                    "data": "",
                    "message": "this report does not exists"
                }, status=status.HTTP_400_BAD_REQUEST)
            data_report_from_db = TimesReport.objects.filter(
                report_id=report_request, owner=self.request.user)
            if len(data_report_from_db) == 0:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = TimesReportSerializer(data_report_from_db, many=True)
            if serializer.data:
                return Response({
                    "data": serializer.data,
                    "message": ""
                    }, status=status.HTTP_200_OK)
        else:
            return Response({
                "data": "",
                "message": "you need to specify the report"
            }, status=status.HTTP_400_BAD_REQUEST)
        
    def create(self, request):
        times_added = []
        try:
            for data in request.data['listOfData']:
                try:
                    report_time = Report.objects.get(id=data['report_id'])
                except ObjectDoesNotExist:
                    return Response({
                        "data": "",
                        "message": "no report founded"
                    }, status=status.HTTP_400_BAD_REQUEST)
                try:
                    Schedule.objects.get(id=data['schedule_id'])
                except ObjectDoesNotExist:
                    return Response({
                        "data": "",
                        "message": "no report founded"
                    }, status=status.HTTP_400_BAD_REQUEST)
                serializer = TimesReportSerializer(data=data)
                if serializer.is_valid(raise_exception=True):
                    new_report = serializer.save(owner=self.request.user)
                    times_added.append(serializer.data)
                else:
                    return Response({
                        "data": serializer.errors,
                        "message": "bad request"
                        }, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                "data": times_added,
                "message": "times added"
            }, status=status.HTTP_201_CREATED)
        except:
            return Response({
                "data": "",
                "message": "bad request"
                }, status=status.HTTP_200_OK)
