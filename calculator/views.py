from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from .models import Polynomial
from .loader import lfsr_calc


def msr_main(request):
    return render(request, 'msr.html')


def lfsr_main(request):
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
        n = request.POST.get('input_field')
        poly = request.POST.get('select_field')
        seed = request.POST.get('seed_field')

        print(poly, n, seed)
        result = lfsr_calc.calculate(n, poly, seed)
        return JsonResponse(result)
    return HttpResponse({'error': 'This is not POST request'}, status=400)
