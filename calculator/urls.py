from django.urls import path

from . import views

urlpatterns = [
    path('', views.msr, name='main'),
    path('msr/', views.msr, name='msr'),
    path('lfsr/', views.lfsr, name='lfsr'),
]
