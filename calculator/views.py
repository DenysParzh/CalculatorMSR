from django.http import JsonResponse
from django.shortcuts import render

from .loader import lfsr_calc, msr_calc
from .models import Polynomial


def msr_main(request):
    return render(request, 'msr.html')


def lfsr_main(request):
    return render(request, 'lfsr.html')


def update_poly(request):
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

    return JsonResponse({'error': 'Method not allowed'}, status=405)


def msr_calculate(request):
    if request.method == 'POST':
        n = request.POST.get('n_input')
        m = request.POST.get('m_input')
        a_poly = request.POST.get('a_select')
        b_poly = request.POST.get('b_select')
        i = request.POST.get('i_select')
        j = request.POST.get('j_select')
        r = request.POST.get('r_select')

        result = msr_calc.calculate(n, m, a_poly, b_poly, i, j, r)

        return JsonResponse(result)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
