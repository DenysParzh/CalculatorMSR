function lfsr_response_visualization(data) {
    // If div exists, it will be deleted
    let existingDiv2 = document.getElementById('data_output');
    if(existingDiv2) {existingDiv2.parentNode.removeChild(existingDiv2);}

    const container = document.getElementById("shell");
    // Creating main div
    const div = document.createElement('div');
    div.id = 'data_output';
    div.className = 'container';
    container.appendChild(div);

    // Creating div for column div and gen_states div
    const row_div = document.createElement('div');
    row_div.className = 'row-div';
    div.appendChild(row_div);
    
    // Creating column div
    const column_div = document.createElement('div');
    column_div.id = 'column_div';
    column_div.className = 'column-div';
    row_div.appendChild(column_div);

    // STRUCT MATRIX
    {
        create_table_container('matrix_lbl', 'matrix_cont', 'matrix_table', 'sub-div',
                                    column_div, 'Структурна матриця', data.struct_matrix);
        document.getElementById('matrix_lbl').style.width = '380px';
        let matrix_cont = document.getElementById('matrix_cont');
        matrix_cont.style.width = '375px';
        matrix_cont.style.maxHeight = '200px';
        setTimeout(() => {
            if(matrix_cont.scrollHeight > matrix_cont.clientHeight) {
                document.getElementById('matrix_table').style.width = '355px';
            }
            else {
                document.getElementById('matrix_table').style.width = '370px';
            }
        }, 0);
    }

    // REVERSED STRUCT MATRIX
    {
        create_table_container('inv_matrix_lbl', 'inv_matrix_cont', 'inv_matrix_table',
            'sub-div', column_div, 'Обернена структурна матриця', data.inv_struct_matrix);
        document.getElementById('inv_matrix_lbl').style.width = '380px';
        let inv_matrix_cont = document.getElementById('inv_matrix_cont');
        inv_matrix_cont.style.width = '375px';
        inv_matrix_cont.style.maxHeight = '200px';
        setTimeout(() => {
            if(inv_matrix_cont.scrollHeight > inv_matrix_cont.clientHeight) {
                document.getElementById('inv_matrix_table').style.width = '355px';
            }
            else {
                document.getElementById('inv_matrix_table').style.width = '370px';
                document.getElementById('inv_matrix_table').style.height = '200px';
            }
        }, 0);
    }

    let height = document.getElementById("column_div").clientHeight;

    //GENERATOR STATES
    {
         create_table_container('gen_st_lbl', 'gen_st_cont', 'gen_st_table',
            'gen-states-div', row_div, 'Стани генератора', data.gen_states);
         document.getElementsByClassName('gen-states-div')[0].style.height = height - 10 + "px";
         document.getElementById('gen_st_lbl').style.width = '515px';
         let gen_st_cont = document.getElementById('gen_st_cont');
         gen_st_cont.style.width = '520px';
         gen_st_cont.style.maxHeight = '460px';
         setTimeout(() => {
             if(gen_st_cont.scrollHeight > gen_st_cont.clientHeight) {
                document.getElementById('gen_st_table').style.width = '500px';
             }
             else {
                document.getElementById('gen_st_table').style.width = '515px';
             }
        }, 0);
    }

    // SEQUENCE AND BINARY SEQUENCE
    {
        create_block('seq_lbl', 'seq', 'sequence-div', div, 'Послідовність', data.sequence.join(' '));
        document.getElementById('seq_lbl').style.width = '515px';

        create_block('bin_seq_lbl', 'bin_seq', 'sequence-div', div, 'Бінарна послідовність', data.bin_sequence.join(' '));
        document.getElementById('bin_seq_lbl').style.width = '515px';
    }

    // BLOCK OF HAMMING WEIGHT, REAL PERIOD, THEORETICAL PERIOD AND POLYNOMIAL
    {
        const block_div = document.createElement('div');
        block_div.className = 'block-div';
        div.appendChild(block_div);

        const row_1 = document.createElement('div');
        row_1.style.display = "flex";
        block_div.appendChild(row_1);

        // Real period
        create_block('real_per_lbl', 'real_per', 'box', row_1, 'Реальний період', data.real_period);
        document.getElementById('real_per_lbl').style.width = '320px';
        document.getElementById('real_per').style.width = '150px';

        // Theoretical period
        create_block('theor_per_lbl', 'theor_per', 'box', row_1, 'Теоретичний період', data.theoretical_period);
        document.getElementById('theor_per_lbl').style.width = '320px';
        document.getElementById('theor_per').style.width = '150px';

        const row_2 = document.createElement('div');
        row_2.style.display = "flex";
        block_div.appendChild(row_2);

        // Hamming weight
        create_block('ham_lbl', 'ham', 'box', row_2, 'Вага Хемінгу', data.hamming_weight);
        document.getElementById('ham_lbl').style.width = '320px';
        document.getElementById('ham').style.width = '150px';

        // Polynomial
        create_block('poly_lbl', 'poly', 'box', row_2, 'Поліном', data.polynomial);
        document.getElementById('poly_lbl').style.width = '320px';
        document.getElementById('poly').style.width = '150px';
    }

    // GRAPHICS
    {

    }
}