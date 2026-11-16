from django.contrib.auth.models import User
from rest_framework import serializers
from .models import product
from .models import order

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['username','email','password']

    def create(self, validated_data):                           #build in function in rest framework
        # User.object.create= save the password in a plain text
        # "          ".create_user=automatically hash the password
        # user=User.objects.create_user(**validated_data)
        user=User.objects.create_user(validated_data['username'],
        validated_data['email'],
        validated_data['password']
        )
        return user

class productSerializer(serializers.ModelSerializer):
    class Meta:
        model=product
        fields='__all__'

class orderSerializer(serializers.ModelSerializer):
    class Meta:
        model=order
        fields=['fullName','phone','address','city','notes']

    def create(self, validated_data):
        return order.objects.create(**validated_data)
