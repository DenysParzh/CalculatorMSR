from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from .models import Polynomial


def msr(request):
    return render(request, 'msr.html')


def lfsr(request):
    return render(request, 'lfsr.html')


def update_poly_lfsr(request):
    if request.method == 'POST':
        input_value = request.POST.get('input_field', '')
        degree = int(input_value)

        if 2 <= degree <= 15:
            data = list(Polynomial.objects.filter(degree=degree).values('id', 'j', 'G8', 't'))
        else:
            data = []

        return JsonResponse(data, safe=False)

    return JsonResponse({'error': 'This not POST request'}, status=400)


def lfsr_calculate(request):
    if request.method == 'POST':
        input_value = request.POST.get('input_field')
        select_value = request.POST.get('select_field')

        print(input_value, select_value)

    return HttpResponse(f'Выбранная опция: {select_value}')