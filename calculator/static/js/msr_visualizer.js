function msr_response_visualization(data) {
    // If div exists, it will be deleted
    let existingDiv2 = document.getElementById('data_output');
    if (existingDiv2) {
        existingDiv2.parentNode.removeChild(existingDiv2);
    }

    const container = document.getElementById("shell");

    // Creating main div
    const div = document.createElement('div');
    div.id = 'data_output';
    div.className = 'container';
    container.appendChild(div);

    const row_div_matrix = document.createElement('div');
    row_div_matrix.className = 'row-div-msr';
    div.appendChild(row_div_matrix);

    {
        create_table_container("matrix_a_lbl",
            "matrix_a_cont",
            "matrix_a_table",
            "sub-div",
            row_div_matrix, "Матриця А", data.matrix_a)

        document.getElementById('matrix_a_lbl').style.width = '380px';
        let matrix_a_cont = document.getElementById('matrix_a_cont');
        matrix_a_cont.style.width = '375px';
        matrix_a_cont.style.maxHeight = '200px';
        setTimeout(() => {
            if (matrix_a_cont.scrollHeight > matrix_a_cont.clientHeight) {
                document.getElementById('matrix_a_table').style.width = '360px';
            } else {
                document.getElementById('matrix_a_table').style.width = '375px';
            }
        }, 0);

        create_table_container("matrix_b_lbl",
            "matrix_b_cont",
            "matrix_b_table",
            "sub-div",
            row_div_matrix, "Матриця B", data.matrix_b)

        document.getElementById('matrix_b_lbl').style.width = '380px';
        let matrix_b_cont = document.getElementById('matrix_b_cont');
        matrix_b_cont.style.width = '375px';
        matrix_b_cont.style.maxHeight = '200px';
        setTimeout(() => {
            if (matrix_b_cont.scrollHeight > matrix_b_cont.clientHeight) {
                document.getElementById('matrix_b_table').style.width = '360px';
            } else {
                document.getElementById('matrix_b_table').style.width = '375px';
            }
        }, 0);
    }

    const row_div_matrix_inv = document.createElement('div');
    row_div_matrix_inv.className = 'row-div-msr';
    div.appendChild(row_div_matrix_inv);

    {
        create_table_container("matrix_a_inv_lbl",
            "matrix_a_inv_cont",
            "matrix_a_inv_table",
            "sub-div",
            row_div_matrix_inv, "Обернена матриця А", data.inv_matrix_a)

        document.getElementById('matrix_a_inv_lbl').style.width = '380px';
        let matrix_a_cont = document.getElementById('matrix_a_inv_cont');
        matrix_a_cont.style.width = '375px';
        matrix_a_cont.style.maxHeight = '200px';
        setTimeout(() => {
            if (matrix_a_cont.scrollHeight > matrix_a_cont.clientHeight) {
                document.getElementById('matrix_a_inv_table').style.width = '360px';
            } else {
                document.getElementById('matrix_a_inv_table').style.width = '375px';
            }
        }, 0);

        create_table_container("matrix_b_inv_lbl",
            "matrix_b_inv_cont",
            "matrix_b_inv_table",
            "sub-div",
            row_div_matrix_inv, "Обернена матриця B", data.inv_matrix_b)

        document.getElementById('matrix_b_inv_lbl').style.width = '380px';
        let matrix_b_cont = document.getElementById('matrix_b_inv_cont');
        matrix_b_cont.style.width = '375px';
        matrix_b_cont.style.maxHeight = '200px';
        setTimeout(() => {
            if (matrix_b_cont.scrollHeight > matrix_b_cont.clientHeight) {
                document.getElementById('matrix_b_inv_table').style.width = '360px';
            } else {
                document.getElementById('matrix_b_inv_table').style.width = '375px';
            }
        }, 0);
    }

    let currentStateIndex = 0;
    const data_states = data.states;
    const row_div_states = document.createElement('div');
    row_div_states.className = 'row-div-msr';
    div.appendChild(row_div_states);

    const btn_div = document.createElement('div');
    btn_div.className = 'btn-div';

    const nextBtn = document.createElement('button');
    nextBtn.id = 'next-btn';
    nextBtn.textContent = 'next';
    // nextBtn.disabled = states.length <= 1;
    btn_div.appendChild(nextBtn)

    const resetBtn = document.createElement('button');
    resetBtn.id = 'reset-btn';
    resetBtn.textContent = 'reset';
    btn_div.appendChild(resetBtn)

    function updateVisualization() {
        const currentState = data_states[currentStateIndex];

        let states_div = document.getElementsByClassName('sub-div')[4];
        if (states_div) {
            states_div.parentNode.removeChild(states_div);
        }

        create_table_container('matrix_states_lbl',
            "matrix_states_cont",
            "matrix_states_table",
            "sub-div",
            row_div_states, "Стани генератору", currentState)

        document.getElementsByClassName('sub-div')[4].style.height = '310px';
        document.getElementById('matrix_states_lbl').style.width = '380px';
        let matrix_state_cont = document.getElementById('matrix_states_cont');
        matrix_state_cont.style.width = '375px';
        matrix_state_cont.style.maxHeight = '220px';
        setTimeout(() => {
            if (matrix_state_cont.scrollHeight > matrix_state_cont.clientHeight) {
                document.getElementById('matrix_states_table').style.width = '360px';
            } else {
                document.getElementById('matrix_states_table').style.width = '375px';
            }
        }, 0);
        document.getElementsByClassName('sub-div')[4].appendChild(btn_div);
    }

    nextBtn.addEventListener('click', function () {
        if (currentStateIndex < data_states.length - 1) {
            currentStateIndex++;
            updateVisualization();
        }
    });

    resetBtn.addEventListener('click', function () {
        currentStateIndex = 0;
        updateVisualization();
    });

    updateVisualization();
}