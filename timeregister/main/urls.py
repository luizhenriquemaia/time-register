from rest_framework import routers
from .api import ScheduleViewSet, TypeContractViewSet, FunctionEmployeeViewSet, EmployeeViewSet, ReportViewSet, TimesReportViewSet


router = routers.DefaultRouter()
router.register('api/report', ReportViewSet, 'report')
router.register('api/time-report', TimesReportViewSet, 'time-report')
router.register('api/employee', EmployeeViewSet, 'employee')
router.register('api/function-employee', FunctionEmployeeViewSet, 'function-employee')
router.register('api/type-contract', TypeContractViewSet, 'type-contract')
router.register('api/schedule', ScheduleViewSet, 'schedule')



urlpatterns = router.urls
