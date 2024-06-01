import math


class IrredPolynom:
    def __init__(self, power: int, poly: str):
        j, g8, _ = poly.split(' ')
        self.j = int(j)
        self.g8 = int(g8)
        self.g2 = self._g8_to_g2(g8)
        self.power = int(power)

    @staticmethod
    def _g8_to_g2(octal_number: int):
        binary_string = bin(int(str(octal_number), 8))[2:]
        binary_list = [int(bit) for bit in binary_string]
        return binary_list

    def get_t_period(self):
        n = (2 ** self.power) - 1
        return n // math.gcd(n, self.j)

    def get_coefficient(self):
        return self.g2[1:]

    def __str__(self):
        power = len(self.g2) - 1
        result = ""

        for elem in self.g2:
            if elem:
                result += f"x^{power} + "

            power -= 1

        return result[:-3]
