import numpy as np
from utils import convert8to2, convert10to2
class LfsrCalculator:
    def calculate(self, n, poly, seed=1):
        n = int(n)
        j, g8, _ = map(int, poly.split(' '))
        bin_poly = convert8to2(g8)[1:]
        seed = convert10to2(seed, len(bin_poly))
