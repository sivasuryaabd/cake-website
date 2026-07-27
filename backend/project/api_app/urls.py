from django.urls import path
from app import views as UserViews
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from app.views import UserDetailView,productListView,productDetailView,orderDetailView


urlpatterns=[
    path('registered/',UserViews.RegisterView.as_view()),
    path('token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('user/me/', UserDetailView.as_view(), name='user_detail'),
    path('products/',productListView.as_view()),
    path('products/<int:pk>/',productDetailView.as_view()),
    path('order/',orderDetailView.as_view()),
]
