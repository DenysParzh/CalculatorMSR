import math
import time

import numpy as np

from .polynomial import IrredPolynom
from .. import utils


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
                19. autocorr_per: list[list[float]]
                20. autocorr_nonper: list[list[float]]
                21. autocorr2d_seq: list[list[float]]
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

        torus = self.generate_torus(a_poly_period, b_poly_period, matrix_a, matrix_b, matrix_s)
        unpuck_torus = self.unpuck_torus(torus, a_power, b_power, a_poly_period, b_poly_period)[0]
        autocorr_per, autocorr_nonper = self.autocorr2d_calc(unpuck_torus)

        pack_sequence = self.pack_sequence(sequence, a_poly_period, b_poly_period, real_period)
        bin_pack_sequence = utils.matrix_to_bin(pack_sequence)
        autocorr2d_seq, _ = self.autocorr2d_calc(bin_pack_sequence)

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
        output['autocorr_per'] = autocorr_per
        output['autocorr_nonper'] = autocorr_nonper
        output['autocorr2d_seq'] = autocorr2d_seq

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
    def generate_torus(t_a, t_b, struct_a, struct_b, matrix_s):
        torus = []
        for i in range(t_a - 1, -1, -1):
            for j in range(t_b - 1, -1, -1):
                A = np.linalg.matrix_power(struct_a, i) % 2
                B = np.linalg.matrix_power(struct_b, j) % 2
                V = np.matmul(A, matrix_s) % 2

                state = np.matmul(V, B) % 2
                torus.append(state)
        return torus

    @staticmethod
    def unpuck_torus(torus, n, m, t_a, t_b):
        large_array = np.concatenate([arr.flatten() for arr in torus])
        large_array = np.array(utils.sequence_to_bin(large_array))
        num_matrices = len(large_array) // (t_a * n * t_b * m)
        reshaped_matrices = large_array.reshape((num_matrices, t_a * n, t_b * m))

        return reshaped_matrices

    @staticmethod
    def autocorr2d_calc(unpuck_torus):

        unpuck_torus = np.array(unpuck_torus)
        start = time.time()

        def fft_convolve2d(x, y):
            fshape = [x.shape[0] + y.shape[0] - 1, x.shape[1] + y.shape[1] - 1]
            fslice = tuple([slice(0, int(sz)) for sz in fshape])
            sp1 = np.fft.rfftn(x, fshape)
            sp2 = np.fft.rfftn(y, fshape)
            ret = np.fft.irfftn(sp1 * sp2, fshape)[fslice].copy()
            return ret

        autocorr = fft_convolve2d(unpuck_torus, unpuck_torus[::-1, ::-1])

        total_elapsed_time = time.time() - start
        print(f"Total execution took {total_elapsed_time:.2f} seconds")

        max_value = autocorr[autocorr.shape[0] // 2, autocorr.shape[1] // 2]
        autocorr_normalized = autocorr / max_value

        height, width = autocorr_normalized.shape
        autocorr_normalized_nonperiodic = autocorr_normalized[height // 2:, width // 2:]

        autocorr_normalized = np.round(autocorr_normalized, decimals=3)
        autocorr_normalized_nonperiodic = np.round(autocorr_normalized_nonperiodic, decimals=3)

        return autocorr_normalized.tolist(), autocorr_normalized_nonperiodic.tolist()

    @staticmethod
    def pack_sequence(seq, t_a, t_b, real_period):

        result_seq = [[0] * t_b for _ in range(t_a)]

        for k in range(real_period):
            i = k % t_a
            j = k % t_b
            result_seq[i][j] = seq[k]

        return result_seq

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