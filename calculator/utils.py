t_choices = [
    ('A', 'A'),
    ('B', 'B'),
    ('C', 'C'),
    ('D', 'D'),
    ('E', 'E'),
    ('F', 'F'),
    ('G', 'G'),
    ('H', 'H'),
]


def convert8to2(num):
    decimal_number = int(str(num), 8)
    binary_string = bin(decimal_number)[2:]
    binary_array = [int(bit) for bit in binary_string]
    return binary_array


def convert10to2(num, length=None):
    binary_string = bin(num)[2:]
    binary_array = [int(bit) for bit in binary_string]
    if length:
        while len(binary_array) < length:
            binary_array.insert(0, 0)
    return binary_array


def calculate_hamming_weight(sequence):
    return len(list(filter(lambda x: x, sequence)))


def sequence_to_bin(sequence):
    return [-1 if elem else 1 for elem in sequence]


def matrix_to_bin(matrix):
    return [[-1 if element else 1 for element in row] for row in matrix]


def get_inv_struct_matrix(struct_matrix):
    import numpy as np

    inv_matrix = np.linalg.inv(np.array(struct_matrix))
    filtered_output = np.where(np.abs(inv_matrix) < 1e-10, 0, inv_matrix)
    result_output = np.round(filtered_output, decimals=3).tolist()
    return result_output


def validation_polynomial(degree, j):
    from math import gcd

    first = (2 ** degree) - 1
    return gcd(first, j) == 1


def calculate_acf(real_t, binary_sequence):
    return [1] + [-1 / real_t for _ in range(len(binary_sequence))]
