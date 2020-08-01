from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from knox.models import AuthToken
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response

from .serializers import LoginSerializer, UserSerializer


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token = AuthToken.objects.create(user)[1]
        return Response({
            "user": UserSerializer(user, 
            context=self.get_serializer_context()).data,
            "token": token
        })


# get the token and retrieve the user
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user