from django.shortcuts import render


def msr(request):
    return render(request, 'msr.html')


def lfsr(request):
    return render(request, 'lfsr.html')
