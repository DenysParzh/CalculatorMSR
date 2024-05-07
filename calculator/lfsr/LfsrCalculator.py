from .utils import convert8to2, convert10to2


class LfsrCalculator:
    def calculate(self, n, poly, seed=1):
        output_data = {}
        n = int(n)
        j, g8, _ = map(int, poly.split(' '))
        bin_poly = convert8to2(g8)[1:]
        seed = convert10to2(seed, len(bin_poly))
        struct_matrix = self.get_structure_matrix(bin_poly)
        sequence, generator_states = self.calculate_sequence(seed, struct_matrix)

        output_data['struct_matrix'] = struct_matrix
        output_data['sequence'] = sequence
        output_data['gen_states'] = generator_states

        return output_data

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
