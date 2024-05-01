from django.db import models

from .utils import t_choices


class Polynomial(models.Model):
    degree = models.IntegerField()
    j = models.IntegerField()
    G8 = models.IntegerField()
    t = models.CharField(max_length=1, choices=t_choices)

    def __str__(self):
        return f"D{self.degree} <{self.j} {self.G8}{self.t}>"
