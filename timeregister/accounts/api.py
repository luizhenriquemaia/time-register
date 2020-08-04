from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response

from .serializer import UserSerializer, RegisterSerializer


class RegisterAPI(viewsets.ViewSet):
    def create(self, request):
        if User.objects.filter(username=request.data['username']).exists():
            return Response({
                "data": "",
                "message": "this username is already taken"
            }, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=request.data['email']).exists():
            return Response({
                "data": "",
                "message": "this email is already registred"
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response({
                "data": serializer.data,
                "message": "registered user"
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                "data": serializer.errors,
                "message": "error registring user"
            }, status=status.HTTP_400_BAD_REQUEST)


# get the token and retrieve the user
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
