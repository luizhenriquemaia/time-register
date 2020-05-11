from rest_framework import routers
from .api import ScheduleViewSet, TypeContractViewSet, EmployeeViewSet, TimeViewSet


router = routers.DefaultRouter()
router.register('api/time', TimeViewSet, 'time')
router.register('api/employee', EmployeeViewSet, 'employee')
router.register('api/type-contract', TypeContractViewSet, 'type-contract')
router.register('api/schedule', ScheduleViewSet, 'schedule')



urlpatterns = router.urls
