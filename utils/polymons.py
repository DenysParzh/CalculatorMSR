polynomials = {
    "2": [(1, 7, "H")],
    "3": [(1, 13, "F")],
    "4": [(1, 23, "F"), (3, 37, "D")],
    "5": [(1, 45, "E"), (3, 75, "G"), (5, 67, "H")],

    "6": [(1, 103, "F"), (3, 127, "B"), (5, 147, "H"), (7, 111, "A"), (11, 155, "E")],

    "7": [(1, 211, "E"), (3, 217, "E"), (5, 235, "E"), (7, 367, "H"), (9, 277, "E"), (11, 325, "G"), (13, 203, "F"),
          (19, 313, "H"), (21, 345, "G")],

    "8": [(1, 435, "E"), (3, 567, "B"), (5, 763, "D"), (7, 551, "E"), (9, 675, "C"), (11, 747, "H"), (13, 453, "F"),
          (15, 727, "D"), (19, 545, "E"), (21, 613, "D"), (23, 543, "F"), (25, 433, "B"), (27, 477, "B"),
          (37, 537, "F"), (43, 703, "H"), (45, 471, "A")],

    "9": [(1, 1021, "E"), (3, 1131, "E"), (5, 1461, "G"), (7, 1231, "A"), (9, 1423, "G"), (11, 1055, "E"),
          (13, 1167, "F"), (15, 1541, "E"), (17, 1333, "F"), (19, 1605, "G"), (21, 1027, "A"), (23, 1751, "E"),
          (25, 1743, "H"), (27, 1617, "H"), (29, 1553, "H"), (35, 1401, "C"), (37, 1157, "F"), (39, 1715, "E"),
          (41, 1563, "H"), (43, 1713, "H"), (45, 1175, "E"), (51, 1725, "G"), (53, 1225, "E"), (55, 1275, "E"),
          (75, 1773, "G"), (77, 1511, "C"), (83, 1425, "G"), (85, 1267, "E")],

    "10": [(1, 2011, "E"), (3, 2017, "B"), (5, 2415, "E"), (7, 3771, "G"), (9, 2257, "B"), (11, 2065, "A"),
           (13, 2157, "F"), (15, 2653, "B"), (17, 3515, "G"), (19, 2773, "F"), (21, 3753, "D"), (23, 2033, "F"),
           (25, 2443, "F"), (27, 3573, "D"), (29, 2461, "E"), (31, 3043, "D"), (33, 75, "C"), (35, 3023, "H"),
           (37, 3543, "F"), (41, 2745, "E"), (43, 2431, "E"), (45, 3061, "C"), (47, 3177, "H"), (49, 3525, "G"),
           (51, 2547, "B"), (53, 2617, "F"), (55, 3453, "D"), (57, 3121, "C"), (59, 3471, "G"), (69, 2701, "A"),
           (71, 3323, "H"), (73, 3507, "H"), (75, 2437, "B"), (77, 2413, "B"), (83, 3623, "H"), (85, 2707, "E"),
           (87, 2311, "A"), (89, 2327, "F"), (91, 3265, "G")],

    "11": [(1, 4005, "E"), (3, 4445, "E"), (5, 4215, "E"), (7, 4055, "E"), (9, 6015, "G"), (11, 7413, "H"),
           (13, 4143, "F"), (15, 4563, "F"), (17, 4053, "F"), (19, 5023, "F"), (21, 5623, "F"), (23, 4757, "B"),
           (25, 4577, "F"), (27, 6233, "H"), (29, 6673, "H"), (31, 7237, "H"), (33, 7335, "G"), (35, 4505, "E"),
           (37, 5337, "F"), (39, 5263, "F"), (41, 5361, "E"), (43, 5171, "E"), (45, 6637, "H"), (47, 7173, "H"),
           (49, 5711, "E"), (51, 5221, "E"), (53, 6307, "H"), (55, 6211, "G"), (57, 5747, "F"), (59, 4533, "F"),
           (61, 4341, "E"), (67, 6711, "G"), (69, 6777, "D"), (71, 7715, "G"), (73, 6343, "H"), (75, 6227, "H"),
           (77, 6263, "H"), (79, 5235, "E"), (81, 7431, "G"), (83, 6455, "G"), (85, 5247, "F"), (87, 5265, "E"),
           (89, 5343, "B"), (91, 4767, "F"), (93, 5607, "F")],

    "12": [(1, 10123, "F"), (3, 12133, "B"), (5, 10115, "A"), (9, 11765, "A"), (11, 15647, "E"), (13, 12513, "B"),
           (15, 13077, "B"), (17, 16533, "H"), (19, 16047, "H"), (21, 10065, "A"), (23, 11015, "E"), (25, 13377, "B"),
           (27, 14405, "A"), (29, 14127, "H"), (31, 17673, "H"), (33, 13311, "A"), (35, 10377, "B"), (37, 13565, "E"),
           (39, 13321, "A"), (41, 15341, "G"), (43, 15053, "H"), (45, 15173, "C"), (47, 15621, "E"), (49, 17703, "C"),
           (51, 10355, "A"), (53, 15321, "G"), (55, 10201, "A"), (57, 12331, "A"), (59, 11417, "E"), (61, 13505, "E"),
           (63, 10761, "A"), (67, 13275, "E"), (69, 16663, "C"), (71, 11471, "E"), (73, 16237, "E"), (75, 16267, "D"),
           (77, 15115, "C"), (79, 12515, "E"), (81, 17545, "C"), (83, 12255, "E"), (85, 11673, "B"), (87, 17361, "A"),
           (89, 11271, "E"), (91, 10011, "A"), (93, 14755, "C"), (95, 17705, "A"), (97, 17121, "G"), (99, 17323, "D")],

    "13": [(1, 20033, "F"), (3, 23261, "E"), (5, 24623, "F"), (7, 23517, "F"), (9, 30741, "G"), (11, 21643, "F"),
           (13, 30171, "G"), (15, 21277, "F"), (17, 27777, "F"), (19, 35051, "G"), (21, 34723, "H"), (23, 34047, "H"),
           (25, 32535, "G"), (27, 31425, "G"), (29, 37505, "G"), (31, 36515, "G"), (33, 26077, "F"), (35, 35673, "H"),
           (37, 20635, "E"), (39, 33763, "H"), (41, 25745, "E"), (43, 36575, "G"), (45, 26653, "F"), (47, 21133, "F"),
           (49, 22441, "E"), (51, 30417, "H"), (53, 32517, "H"), (55, 37335, "G"), (57, 25327, "F"), (59, 23231, "E"),
           (61, 25511, "E"), (63, 26533, "F"), (65, 33343, "H"), (67, 33727, "H"), (69, 27271, "E"), (71, 25017, "F"),
           (73, 26041, "E"), (75, 21103, "F"), (77, 27263, "F"), (79, 24513, "F"), (81, 32311, "G"), (83, 31743, "H"),
           (85, 24037, "F"), (87, 30711, "G"), (89, 32641, "G"), (91, 24657, "F"), (93, 32437, "H"), (95, 20213, "F"),
           (97, 25633, "F"), (99, 31303, "H"), (101, 22525, "E"), (103, 34627, "H"), (105, 25775, "E")]
}
