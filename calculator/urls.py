from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.msr_main, name='main'),
    path('msr/', views.msr_main, name='msr'),
    path('lfsr/', views.lfsr_main, name='lfsr'),
    path('lfsr/calculate/', views.lfsr_calculate, name='lfsr_calculate'),
    path('msr/calculate/', views.msr_calculate, name='msr_calculate'),
    re_path(r'.*?/form_update/$', views.update_poly, name='update_poly'),
]
