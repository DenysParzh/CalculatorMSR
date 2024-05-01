from django.core.management.base import BaseCommand

from calculator.models import Polynomial
from utils.polymons import polynomials


class Command(BaseCommand):
    help = 'Load polynomials into the database'

    def handle(self, *args, **kwargs):
        for degree, coefficients in polynomials.items():
            for coefficient in coefficients:
                j, G8, t = coefficient
                polynomial = Polynomial.objects.create(
                    degree=int(degree),
                    j=j,
                    G8=G8,
                    t=t
                )
                polynomial.save()

        self.stdout.write(self.style.SUCCESS('Successfully loaded polynomials'))
