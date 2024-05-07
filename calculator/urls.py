from django.urls import path

from . import views

urlpatterns = [
    path('', views.msr_main, name='main'),
    path('msr/', views.msr_main, name='msr'),
    path('lfsr/', views.lfsr_main, name='lfsr'),
    path('lfsr/form_update/', views.update_poly_lfsr, name='lfsr_update_poly'),
    path('lfsr/calculate/', views.lfsr_calculate, name='lfsr_calculate'),
]
