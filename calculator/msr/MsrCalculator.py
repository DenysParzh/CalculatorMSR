import numpy as np

from .. import utils
from polynomial import IrredPolynom


class MsrCalculator:

    def calculate(self, n: str, m: str,
                  a_poly: str, b_poly: str,
                  i: str, j: str, r: str) -> dict:

        output = {}

        i = int(i)
        j = int(j)
        r = int(r)
        a_power = int(n)
        b_power = int(m)

        a_poly = IrredPolynom(a_power, a_poly)
        b_poly = IrredPolynom(b_power, b_poly)

        matrix_a = self._get_matrix_a(a_poly)
        matrix_b = self._get_matrix_b(b_poly)
        matrix_s = self._generate_matrix_s(r, a_power, b_power)

        sequence, states = self._calculate_sequence(matrix_a, matrix_b, matrix_s, i, j)
        bin_sequence = utils.sequence_to_bin(sequence)

        theoretical_hamming_weight = self._get_hamming_weight(r, a_power, b_power)
        real_hamming_weight = utils.calculate_hamming_weight(sequence)

        a_poly_period = a_poly.get_t_period()
        b_poly_period = b_poly.get_t_period()

        theoretical_period = a_poly_period * b_poly_period
        real_period = len(sequence)

        output['a_poly'] = str(a_poly)
        output['b_poly'] = str(b_poly)
        output['a_period'] = a_poly_period
        output['b_period'] = b_poly_period
        output['matrix_a'] = matrix_a
        output['matrix_b'] = matrix_b
        output['sequence'] = sequence
        output['bin_sequence'] = bin_sequence
        output['states'] = states
        output['real_hamming_weight'] = real_hamming_weight
        output['theoretical_hamming_weight'] = theoretical_hamming_weight
        output['theoretical_period'] = theoretical_period
        output['real_period'] = real_period

        return output

    @staticmethod
    def _get_matrix_a(polynomial: IrredPolynom):
        matrix = [polynomial.get_coefficient()]

        for i in range(polynomial.power - 1):
            additional_vector = [0] * polynomial.power
            additional_vector[i] = 1
            matrix.append(additional_vector)

        return matrix

    @staticmethod
    def _get_matrix_b(polynomial: IrredPolynom):
        matrix = [[0] * polynomial.power for _ in range(polynomial.power)]
        poly_coefs = polynomial.get_coefficient()

        for i in range(polynomial.power):
            matrix[i][0] = poly_coefs[i]

        for i in range(1, polynomial.power):
            matrix[i - 1][i] = 1

        return matrix

    @staticmethod
    def _get_hamming_weight(r: int, a_power: int, b_power: int):
        return (2 ** r - 1) * (2 ** (a_power + b_power - r - 1))

    @staticmethod
    def _generate_matrix_s(r, a_power: int, b_power: int):
        matrix_s = [[0] * b_power for _ in range(a_power)]

        for i in range(r):
            matrix_s[i][i] = 1

        return matrix_s

    @staticmethod
    def _calculate_sequence(matrix_a, matrix_b, matrix_s, i: int, j: int):
        matrix_a = np.array(matrix_a)
        matrix_b = np.array(matrix_b)
        matrix_s = np.array(matrix_s)

        limit = matrix_s.copy()
        sequence = []
        states = [matrix_s.tolist()]

        while True:

            matrix_s = np.matmul(np.matmul(matrix_a, matrix_s) % 2, matrix_b) % 2
            sequence.append(int(matrix_s[i, j]))
            states.append(matrix_s.tolist())

            if np.all(matrix_s == limit):
                return sequence, states
