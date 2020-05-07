from rest_framework import routers
from .api import ScheduleViewSet, RegisterViewSet, TimeViewSet


router = routers.DefaultRouter()
router.register('api/time', TimeViewSet, 'time')
router.register('api/register', RegisterViewSet, 'register')
router.register('api/schedule', ScheduleViewSet, 'schedule')



urlpatterns = router.urls
