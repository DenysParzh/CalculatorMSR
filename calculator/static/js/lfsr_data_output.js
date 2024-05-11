function handleFormSubmit() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        // const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const formData = new FormData(form);

        fetch('calculate/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': get_cookie()
            }
        })
        .then(response => response.json())
        .then(data => {
            data_output(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}

function data_output(data) {
    // If div exists, it will be deleted
    let existingDiv2 = document.getElementById('data_output');
    if(existingDiv2)
    {
        existingDiv2.parentNode.removeChild(existingDiv2);
    }

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

    //------------------------------------------------------------------------------------
    // STRUCT MATRIX
    {
        const struct_matrix_div = document.createElement('div');
        struct_matrix_div.className = 'sub-div';
        column_div.appendChild(struct_matrix_div);

        const struct_matrix_div_label = document.createElement('div');
        struct_matrix_div_label.className = 'name';
        struct_matrix_div_label.style.marginTop = '5px';
        struct_matrix_div_label.style.width = '300px';
        struct_matrix_div_label.textContent = 'Структурна матриця';
        struct_matrix_div.appendChild(struct_matrix_div_label);

        const struct_matrix_table_container = document.createElement('div');
        struct_matrix_table_container.style.width = '300px';
        struct_matrix_table_container.style.maxHeight = '180px';
        struct_matrix_table_container.style.overflow = 'auto';
        struct_matrix_div.appendChild(struct_matrix_table_container);

        const table_matrix = create_table(data.struct_matrix);
        setTimeout(() => {
            if (struct_matrix_table_container.scrollHeight > struct_matrix_table_container.clientHeight) {
                table_matrix.style.width = '285px';
            } else {
                table_matrix.style.width = '300px';
            }
        }, 0);
        struct_matrix_table_container.appendChild(table_matrix);
    }
    //------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------
    // REVERSED STRUCT MATRIX
    {
        const reversed_matrix_div = document.createElement('div');
        reversed_matrix_div.className = 'sub-div';
        column_div.appendChild(reversed_matrix_div);

        const reversed_struct_matrix_div_label = document.createElement('div');
        reversed_struct_matrix_div_label.className = 'name';
        reversed_struct_matrix_div_label.style.marginTop = '5px';
        reversed_struct_matrix_div_label.style.width = '300px';
        reversed_struct_matrix_div_label.textContent = 'Обернена структурна матриця';
        reversed_matrix_div.appendChild(reversed_struct_matrix_div_label);

        const reversed_struct_matrix_table_container = document.createElement('div');
        reversed_struct_matrix_table_container.style.width = '300px';
        reversed_struct_matrix_table_container.style.maxHeight = '180px';
        reversed_struct_matrix_table_container.style.overflow = 'auto';
        reversed_matrix_div.appendChild(reversed_struct_matrix_table_container);

        const table_reversed_matrix = create_table(data.inv_struct_matrix);
        setTimeout(() => {
            if (reversed_struct_matrix_table_container.scrollHeight > reversed_struct_matrix_table_container.clientHeight) {
                table_reversed_matrix.style.width = '285px';
            } else {
                table_reversed_matrix.style.width = '300px';
            }
        }, 0);
        reversed_struct_matrix_table_container.appendChild(table_reversed_matrix);
    }
    //------------------------------------------------------------------------------------

    let height = document.getElementById("column_div").clientHeight;

    //------------------------------------------------------------------------------------
    //GENERATOR STATES
    {
        const gen_states_div = document.createElement('div');
        gen_states_div.className = 'gen-states-div';
        gen_states_div.style.height = height + "px";
        row_div.appendChild(gen_states_div);

        const gen_states_div_label = document.createElement('div');
        gen_states_div_label.className = 'name';
        gen_states_div_label.style.width = '515px';
        gen_states_div_label.style.marginTop = '5px';
        gen_states_div_label.textContent = 'Стани генератора';
        gen_states_div.appendChild(gen_states_div_label);

        const gen_states_matrix_table_container = document.createElement('div');
        gen_states_matrix_table_container.style.width = '515px';
        gen_states_matrix_table_container.style.maxHeight = '430px';
        gen_states_matrix_table_container.style.overflow = 'auto';
        gen_states_div.appendChild(gen_states_matrix_table_container);

        const table_states = create_table(data.gen_states);
        setTimeout(() => {
            if (gen_states_matrix_table_container.scrollHeight > gen_states_matrix_table_container.clientHeight) {
                table_states.style.width = '500px';
            } else {
                table_states.style.width = '515px';
            }
        }, 0);
        gen_states_matrix_table_container.appendChild(table_states);
    }
    //------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------
    // SEQUENCE
    {
        const sequence_div = document.createElement('div');
        sequence_div.className = 'sequence-div';
        div.appendChild(sequence_div);

        const sequence_div_label = document.createElement('div');
        sequence_div_label.style.width = '515px';
        sequence_div_label.style.marginTop = '5px';
        sequence_div_label.className = 'name';
        sequence_div_label.textContent = 'Послідовність';
        sequence_div.appendChild(sequence_div_label);

        const sequence = document.createElement('div');
        sequence.className = 'block';
        sequence.textContent = data.sequence.join('');
        sequence_div.appendChild(sequence);
    }
    //------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------
    // BLOCK OF HAMMING WEIGHT, REAL PERIOD, THEORETICAL PERIOD AND POLYNOMIAL
    {
        const block_div = document.createElement('div');
        block_div.className = 'block-div';
        div.appendChild(block_div);

        const row_1 = document.createElement('div');
        row_1.style.display = "flex";
        block_div.appendChild(row_1);

        // Real period
        {
            const real_period_div = document.createElement('div');
            real_period_div.className = 'box';
            row_1.appendChild(real_period_div);

            const real_period_div_label = document.createElement('div');
            real_period_div_label.style.width = '320px';
            real_period_div_label.style.marginTop = '5px';
            real_period_div_label.className = 'name';
            real_period_div_label.textContent = 'Реальний період';
            real_period_div.appendChild(real_period_div_label);

            const real_period = document.createElement('div');
            real_period.className = 'block';
            real_period.textContent = data.real_period;
            real_period.style.width = '25px';
            real_period_div.appendChild(real_period);
        }
        // Theoretical period
        {
            const theoretical_period_div = document.createElement('div');
            theoretical_period_div.className = 'box';
            row_1.appendChild(theoretical_period_div);

            const theoretical_period_div_label = document.createElement('div');
            theoretical_period_div_label.style.width = '320px';
            theoretical_period_div_label.style.marginTop = '5px';
            theoretical_period_div_label.className = 'name';
            theoretical_period_div_label.textContent = 'Теоретичний період';
            theoretical_period_div.appendChild(theoretical_period_div_label);

            const theoretical_period = document.createElement('div');
            theoretical_period.className = 'block';
            theoretical_period.textContent = data.theoretical_period;
            theoretical_period.style.width = '25px';
            theoretical_period_div.appendChild(theoretical_period);
        }

        const row_2 = document.createElement('div');
        row_2.style.display = "flex";
        block_div.appendChild(row_2);

        // Hamming weight
        {
            const hamming_weight_div = document.createElement('div');
            hamming_weight_div.className = 'box';
            row_2.appendChild(hamming_weight_div);

            const hamming_weight_div_label = document.createElement('div');
            hamming_weight_div_label.style.width = '320px';
            hamming_weight_div_label.style.marginTop = '5px';
            hamming_weight_div_label.className = 'name';
            hamming_weight_div_label.textContent = 'Вага Хемінгу';
            hamming_weight_div.appendChild(hamming_weight_div_label);

            const hamming_weight = document.createElement('div');
            hamming_weight.className = 'block';
            hamming_weight.textContent = data.hamming_weight;
            hamming_weight.style.width = '25px';
            hamming_weight_div.appendChild(hamming_weight);
        }
        // Polynomial
        {
            const polynomial_div = document.createElement('div');
            polynomial_div.className = 'box';
            row_2.appendChild(polynomial_div);

            const polynomial_div_label = document.createElement('div');
            polynomial_div_label.style.width = '320px';
            polynomial_div_label.style.marginTop = '5px';
            polynomial_div_label.className = 'name';
            polynomial_div_label.textContent = 'Поліном';
            polynomial_div.appendChild(polynomial_div_label);

            const polynomial = document.createElement('div');
            console.log(data.polynomial);
            polynomial.className = 'block';
            polynomial.textContent = data.polynomial;
            polynomial.style.width = '150px';
            polynomial_div.appendChild(polynomial);
        }
    }
    //------------------------------------------------------------------------------------
}

function create_table(data) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    for(let i = 0; i < data.length; i++)
    {
        let row = document.createElement('tr');
        for(let j = 0; j < data[i].length; j++)
        {
            let cell = document.createElement('td');
            cell.textContent = data[i][j];
            cell.style.border = '1px solid black';
            cell.style.padding = '5px';
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    return table;
}