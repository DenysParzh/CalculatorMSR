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
