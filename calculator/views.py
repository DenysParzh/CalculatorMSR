from django.shortcuts import render
from django.http import JsonResponse

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
