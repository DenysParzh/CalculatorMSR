import numpy as np
import math

from .. import utils
from .polynomial import IrredPolynom


class MsrCalculator:
    def calculate(self, n: str, m: str,
                  a_poly: str, b_poly: str,
                  i: str, j: str, r: str) -> dict:

        """
            Perform a series of computations based on the provided irreducible
            polynomials and parameters to generate a sequence and various properties related to these polynomials.

            :param n: Degree of the first irreducible polynomial. Example: "4"
            :param m: Degree of the second irreducible polynomial. Example: "6"
            :param a_poly: String representation of the first irreducible polynomial. Example: "3 37 D"
            :param b_poly: String representation of the second irreducible polynomial. Example: "3 127 B"
            :param i: Initial state index for the sequence calculation. Example: "1"
            :param j: Secondary state index for the sequence calculation. Example: "2"
            :param r: Parameter for the generation of matrix `s`. Example: "3"

            :return: Dictionary containing the following keys and their corresponding computed values:
                1. a_poly: str - String representation of the first irreducible polynomial.
                2. b_poly: str - String representation of the second irreducible polynomial.
                3. a_period: int - Period of the first irreducible polynomial.
                4. b_period: int - Period of the second irreducible polynomial.
                5. matrix_a: list[list[int]] - Matrix representation of the first irreducible polynomial.
                6. matrix_b: list[list[int]] - Matrix representation of the second irreducible polynomial.
                7. inv_matrix_a: list[list[int]] - Inverse of `matrix_a`.
                8. inv_matrix_b: list[list[int]] - Inverse of `matrix_b`.
                9. sequence: list[int] - Generated sequence based on the matrix computations.
                10. states: list[list[int]] - States used in the sequence calculation.
                11. bin_sequence: list[int] - Binary representation of the generated sequence.
                12. real_hamming_weight: int - Hamming weight of the generated sequence.
                13. theoretical_hamming_weight: int - Theoretical Hamming weight.
                14. theoretical_period: int - Theoretical period derived from the irreducible polynomials.
                15. real_period: int - Actual period of the generated sequence.
                16. acf: list[float]
                17. error flag: bool
                18. message: str => example: "Data successful", "Seed are not valid"
            """

        output = {}

        i = int(i)
        j = int(j)
        r = int(r)
        a_power = int(n)
        b_power = int(m)

        a_poly = IrredPolynom(a_power, a_poly)
        b_poly = IrredPolynom(b_power, b_poly)

        error_flag, message = self._validate_input(a_poly.j, b_poly.j, a_power, b_power)
        output["error_flag"] = error_flag
        output["message"] = message

        if error_flag:
            return output

        matrix_a = self._get_matrix_a(a_poly)
        matrix_b = self._get_matrix_b(b_poly)
        matrix_s = self._generate_matrix_s(r, a_power, b_power)

        inv_matrix_a = utils.get_inv_struct_matrix(matrix_a)
        inv_matrix_b = utils.get_inv_struct_matrix(matrix_b)

        sequence, states = self._calculate_sequence(matrix_a, matrix_b, matrix_s, i, j)
        bin_sequence = utils.sequence_to_bin(sequence)

        theoretical_hamming_weight = self._get_hamming_weight(r, a_power, b_power)
        real_hamming_weight = utils.calculate_hamming_weight(sequence)

        a_poly_period = a_poly.get_t_period()
        b_poly_period = b_poly.get_t_period()

        theoretical_period = math.lcm(a_poly_period, b_poly_period)
        real_period = len(sequence)

        acf = utils.calculate_acf(real_period, bin_sequence)

        output['a_poly'] = str(a_poly)
        output['b_poly'] = str(b_poly)
        output['a_period'] = a_poly_period
        output['b_period'] = b_poly_period
        output['matrix_a'] = matrix_a
        output['matrix_b'] = matrix_b
        output['inv_matrix_a'] = inv_matrix_a
        output['inv_matrix_b'] = inv_matrix_b
        output['sequence'] = sequence
        output['states'] = states
        output['bin_sequence'] = bin_sequence
        output['real_hamming_weight'] = real_hamming_weight
        output['theoretical_hamming_weight'] = theoretical_hamming_weight
        output['theoretical_period'] = theoretical_period
        output['real_period'] = real_period
        output['acf'] = acf

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

    @staticmethod
    def _validate_input(j_a, j_b, degree_a, degree_b):
        if degree_a > degree_b:
            return True, "Degree A is greater than Degree B"

        is_valid_poly_a = utils.validation_polynomial(degree_a, j_a)
        is_valid_poly_b = utils.validation_polynomial(degree_b, j_b)

        if not is_valid_poly_a:
            return True, "Polynomial A is not valid"

        if not is_valid_poly_b:
            return True, "Polynomial B is not valid"

        return False, "Data successful"