from rest_framework import routers
from .api import TypeContractViewSet, EmployeeViewSet, ReportViewSet, TimesReportViewSet


router = routers.DefaultRouter()
router.register('api/report', ReportViewSet, 'report')
router.register('api/time-report', TimesReportViewSet, 'time-report')
router.register('api/employee', EmployeeViewSet, 'employee')
router.register('api/type-contract', TypeContractViewSet, 'type-contract')



urlpatterns = router.urls
