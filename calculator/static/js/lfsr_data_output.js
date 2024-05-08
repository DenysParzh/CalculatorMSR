function handleFormSubmit() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const formData = new FormData(form);

        fetch('calculate/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': get_cookie('csrftoken')
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

function get_cookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function data_output(data) {
    // If div exists, it will be deleted
    let existingDiv = document.getElementById('sequence')
    if(existingDiv)
    {
        existingDiv.parentNode.removeChild(existingDiv);
    }

    let existingDiv2 = document.getElementById('data_output')
    if(existingDiv2)
    {
        existingDiv2.parentNode.removeChild(existingDiv2);
    }

    // Creating main div
    const div = document.createElement('div');
    div.id = 'data_output';
    div.className = 'main-div';
    const container = document.getElementById("shell");
    container.appendChild(div);

    // Creating column div
    const column_div = document.createElement('div');
    column_div.id = 'column_div'
    column_div.className = 'column-div';
    div.appendChild(column_div);

    // Creating sequence div
    const sequence_div = document.createElement('div');
    sequence_div.id = 'sequence';
    container.appendChild(sequence_div);


    //------------------------------------------------------------------------------------
    // STRUCT MATRIX
    const struct_matrix_div = document.createElement('div');
    struct_matrix_div.className = 'sub-div';
    column_div.appendChild(struct_matrix_div);

    const struct_matrix_div_label = document.createElement('div');
    struct_matrix_div_label.className = 'name';
    struct_matrix_div_label.style.width = '260px';
    struct_matrix_div_label.textContent = 'Структурна матриця';
    struct_matrix_div.appendChild(struct_matrix_div_label);

    const table_matrix = create_table(data.struct_matrix);
    table_matrix.className = 'table table-striped table-width';
    struct_matrix_div.appendChild(table_matrix);
    //------------------------------------------------------------------------------------


    //------------------------------------------------------------------------------------
    // REVERSED STRUCT MATRIX
    const reversed_matrix_div = document.createElement('div');
    struct_matrix_div.className = 'sub-div';
    column_div.appendChild(reversed_matrix_div);

    const reversed_struct_matrix_div_label = document.createElement('div');
    reversed_struct_matrix_div_label.className = 'name';
    reversed_struct_matrix_div_label.style.width = '260px';
    reversed_struct_matrix_div_label.textContent = 'Обернена структурна матриця';
    reversed_matrix_div.appendChild(reversed_struct_matrix_div_label);


    const table_reversed_matrix = create_table(data.inv_struct_matrix);
    table_reversed_matrix.className = 'table table-striped table-width';
    reversed_matrix_div.appendChild(table_reversed_matrix);
    //------------------------------------------------------------------------------------

    let height = document.getElementById("column_div").clientHeight;

    //------------------------------------------------------------------------------------
    //GENERATOR STATES
    const gen_states_div = document.createElement('div');
    gen_states_div.id = 'gen_states_div_style';
    gen_states_div.className = 'gen_states_div_style';
    gen_states_div.style.height = height + "px";
    div.appendChild(gen_states_div);

    const gen_states_div_label = document.createElement('div');
    gen_states_div_label.className = 'name';
    gen_states_div_label.style.width = '515px';
    gen_states_div_label.textContent = 'Стани генератора';
    gen_states_div.appendChild(gen_states_div_label);
    
    const div_scroll = document.createElement('div');
    div_scroll.className = 'table-container';
    div_scroll.style.height = (height - 30) + "px";
    gen_states_div.appendChild(div_scroll);

    const table_states = create_table(data.gen_states);
    table_states.className = 'table table-striped table-generator';
    div_scroll.appendChild(table_states);
    //------------------------------------------------------------------------------------


    //------------------------------------------------------------------------------------
    // SEQUENCE
    const sequence_div_ = document.createElement('div');
    sequence_div.appendChild(sequence_div_);

    const sequence_div_label = document.createElement('div');
    sequence_div_label.className = 'name';
    sequence_div_label.textContent = 'Послідовність';
    sequence_div_.appendChild(sequence_div_label);

    const sequence = document.createElement('div');
    sequence.textContent = data.sequence;
    sequence_div_.appendChild(sequence);
}

function create_table(data)
{
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