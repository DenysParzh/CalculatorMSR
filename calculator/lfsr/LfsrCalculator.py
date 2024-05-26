import math

from ..utils import (convert8to2, convert10to2,
                     get_inv_struct_matrix, sequence_to_bin,
                     validation_polynomial)


class LfsrCalculator:
    def calculate(self, n, poly, seed=1):

        '''
        :param n: str => example: "6"
        :param poly: str => example: "1 127 B"
        :param seed: str => example: "1"
        :return: dict =>
            1. struct_matrix: list[list[int]]
            2. inv_struct_matrix: list[list[int]]
            3. gen_states: list[list[int]]
            4. sequence: list[int]
            5  bin_sequence: list[int]
            6. hamming_weight: int
            7. real_period: int
            8. theoretical_period: int
            9. polynomial: str
            10. error flag: bool
            11. message: str => example: "Data successful", "Seed are not valid"
        '''

        output_data = {}
        n = int(n)
        j, g8, _ = poly.split(' ')
        j = int(j)
        g8 = int(g8)
        seed = int(seed)

        error_flag, message = self._validate_input(j, n, seed)
        output_data["error_flag"] = error_flag
        output_data["message"] = message

        if error_flag:
            return output_data

        bin_poly = convert8to2(g8)[1:]
        seed = convert10to2(seed, len(bin_poly))
        struct_matrix = self.get_structure_matrix(bin_poly)
        sequence, generator_states = self.calculate_sequence(seed, struct_matrix)
        binary_sequence = sequence_to_bin(sequence)
        inv_struct_matrix = get_inv_struct_matrix(struct_matrix)
        str_poly = self._get_str_poly(bin_poly)

        output_data['polynomial'] = str_poly
        output_data['struct_matrix'] = struct_matrix
        output_data['inv_struct_matrix'] = inv_struct_matrix
        output_data['sequence'] = sequence
        output_data['bin_sequence'] = binary_sequence
        output_data['gen_states'] = generator_states
        output_data['hamming_weight'] = len(list(filter(lambda x: x, sequence)))
        output_data['real_period'] = len(generator_states)
        output_data['theoretical_period'] = (2 ** n - 1) // math.gcd(2 ** n - 1, j)

        return output_data

    @staticmethod
    def _get_str_poly(poly):
        power = len(poly) - 1
        result = ""

        for elem in poly:
            if elem:
                result += f"x^{power} + "

            power -= 1

        return result[:-3]

    @staticmethod
    def get_structure_matrix(bin_poly: list[int]):
        matrix = [bin_poly]
        for i in range(1, len(bin_poly)):
            row = [0] * len(bin_poly)
            row[i - 1] = 1
            matrix.append(row)
        return matrix

    @staticmethod
    def calculate_sequence(seed: list[int], struct_matrix):
        state = seed.copy()
        sequence = []
        generator_states = []

        while True:
            sequence.append(state[-1])
            generator_states.append(state)

            result_array = []
            for row in struct_matrix:
                result = sum([x * y for x, y in zip(row, state)]) % 2
                result_array.append(result)

            state = result_array
            if state == seed:
                break

        return sequence, generator_states

    @staticmethod
    def _validate_input(j, degree, seed):
        # is_poly_valid = validation_polynomial(degree, j)
        is_seed_valid = seed <= (2 ** degree - 1)

        # if not is_poly_valid:
        #     return False, "Polynomial and degree are not valid"

        if not is_seed_valid:
            return True, "Seed are not valid"

        return False, "Data successful"
