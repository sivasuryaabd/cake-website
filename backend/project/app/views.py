from django.shortcuts import render
from .serializers import UserSerializer,productSerializer,orderSerializer
from .models import product,order
from rest_framework import generics,permissions
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated




class RegisterView(generics.CreateAPIView):
    queryset= User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]




class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email,
            'date_joined': user.date_joined,
        })
    
class productListView(generics.ListAPIView):            #-->for public= no login needed
    queryset=product.objects.all()
    serializer_class=productSerializer
    permission_classes=[]

class productDetailView(generics.RetrieveAPIView):
    queryset=product.objects.all()
    serializer_class=productSerializer
    permission_classes=[]


class orderDetailView(generics.CreateAPIView):
    queryset=order.objects.all()
    serializer_class=orderSerializer
    permission_classes=[AllowAny]

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)