from rest_framework import routers
from .api import ScheduleViewSet, RegisterViewSet, TimeViewSet


router = routers.DefaultRouter()
router.register('api/time', TimeViewSet, 'time')
router.register('api/register', ScheduleViewSet, 'register')
router.register('api/schedule', RegisterViewSet, 'schedule')



urlpatterns = router.urls
