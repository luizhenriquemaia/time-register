from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

from .api import UserAPI, RegisterAPI

urlpatterns = [
    path('api/auth/token/', jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/auth/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_verify'),
]

router = routers.DefaultRouter()
router.register('api/auth/register', RegisterAPI, 'register'),


urlpatterns += router.urls
