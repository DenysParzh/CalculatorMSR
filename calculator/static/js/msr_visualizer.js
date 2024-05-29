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


    create_block('seq_lbl', 'seq', 'sequence-div', div, 'Послідовність',
        data.sequence.join(' '));
    document.getElementById('seq_lbl').style.width = '515px';

    create_block('bin_seq_lbl', 'bin_seq',
        'sequence-div', div, 'Бінарна послідовність',
        data.bin_sequence.join(' '));

    document.getElementById('bin_seq_lbl').style.width = '515px';

    const row_div_poly = document.createElement('div');
    row_div_poly.className = 'row-div-msr block-content';
    div.appendChild(row_div_poly);

    create_block('poly_a_label', 'poly_a_text', 'box', row_div_poly, 'Поліном А', data.a_poly);
    document.getElementById('poly_a_label').style.width = '320px';
    document.getElementById('poly_a_text').style.width = '320px';

    create_block('poly_b_label', 'poly_b_text', 'box', row_div_poly, 'Поліном B', data.b_poly);
    document.getElementById('poly_b_label').style.width = '320px';
    document.getElementById('poly_b_text').style.width = '320px';

    const row_div_period_matrix = document.createElement('div');
    row_div_period_matrix.className = 'row-div-msr block-content';
    div.appendChild(row_div_period_matrix);

    create_block('period_a_label', 'period_a_text', 'box', row_div_period_matrix,
        'Період T(A)', data.a_period);
    document.getElementById('period_a_label').style.width = '320px';
    document.getElementById('period_a_text').style.width = '150px';

    create_block('period_b_label', 'period_b_text', 'box', row_div_period_matrix,
        'Період T(B)', data.b_period);
    document.getElementById('period_b_label').style.width = '320px';
    document.getElementById('period_b_text').style.width = '150px';

    const row_div_hamming = document.createElement('div');
    row_div_hamming.className = 'row-div-msr block-content';
    div.appendChild(row_div_hamming);

    create_block('hamming_teor_label', 'hamming_teor_text', 'box',
        row_div_hamming, 'Теоритична вага Хемінгу', data.theoretical_hamming_weight);

    document.getElementById('hamming_teor_label').style.width = '320px';
    document.getElementById('hamming_teor_text').style.width = '150px';

    create_block('hamming_real_label', 'hamming_real_text', 'box',
        row_div_hamming, 'Реальна вага Хемінгу', data.real_hamming_weight);
    document.getElementById('hamming_real_label').style.width = '320px';
    document.getElementById('hamming_real_text').style.width = '150px';

    const row_div_period = document.createElement('div');
    row_div_period.className = 'row-div-msr block-content';
    div.appendChild(row_div_period);

    create_block('period_teor_label', 'period_teor_text', 'box',
        row_div_period, 'Теоретичний період', data.theoretical_period);

    document.getElementById('period_teor_label').style.width = '320px';
    document.getElementById('period_teor_text').style.width = '150px';

    create_block('period_real_label', 'period_real_text', 'box',
        row_div_period, 'Реальний період', data.real_period);
    document.getElementById('period_real_label').style.width = '320px';
    document.getElementById('period_real_text').style.width = '150px';

    // ACF GRAPHIC
    {
        const graphic_block = document.createElement('div');
        graphic_block.className = 'acf-block';
        div.appendChild(graphic_block);

        const graphic_block_lbl = document.createElement('div');
        graphic_block_lbl.style.marginTop = '5px';
        graphic_block_lbl.style.width = '700px';
        graphic_block_lbl.className = 'name';
        graphic_block_lbl.textContent = 'Графік АЦФ';
        graphic_block.appendChild(graphic_block_lbl);

        const graphic = document.createElement('div');
        graphic.id = 'graphic_block_acf';
        graphic.style.width = '1000px';
        graphic.style.height = '390px';
        graphic_block.appendChild(graphic);

        var data_acf = data.acf;
        var x_line = Array.from({length: data_acf.length}, (v, i) => i + 1);

        var trace = {
            x: x_line,
            y: data_acf,
            mode: 'lines',
        };

        var data_trace_acf = [trace];
        var layout_acf = {title: ''};
        var settings_acf = {
            scrollZoom: true,
            modeBarButtonsToRemove: ['toImage', 'zoom2d', 'zoomIn2d',
                'zoomOut2d', 'resetScale2d'],
            displaylogo: false
        };

        Plotly.newPlot('graphic_block_acf', data_trace_acf, layout_acf,settings_acf).then(function () {
            Plotly.relayout('graphic_block_acf', {dragmode: 'pan'})
        });
    }

    // TORUS PERIOD
    {
        const torus_period_block = document.createElement('div');
        torus_period_block.className = 'acf-block';
        div.appendChild(torus_period_block);

        const torus_period_lbl = document.createElement('div');
        torus_period_lbl.style.marginTop = '5px';
        torus_period_lbl.style.width = '700px';
        torus_period_lbl.className = 'name';
        torus_period_lbl.textContent = 'Періодична АКФ Тору станів';
        torus_period_block.appendChild(torus_period_lbl);

        const torus_period = document.createElement('div');
        torus_period.id = 'torus_period';
        torus_period.style.width = '1000px';
        torus_period.style.height = '390px';
        torus_period_block.appendChild(torus_period);

        var data_torus_period = [
            {
               z: data.autocorr_per,
               type: 'heatmap',
                colorscale: [
                    [0, 'rgb(45,106, 79)'],
                    [0.5, 'rgb(0, 255, 0)'],
                    [1, 'rgb(0, 0, 0)']
                ]
            }
        ];

        var period_torus_layout = {showlegend: false};
        Plotly.newPlot('torus_period', data_torus_period, period_torus_layout, {staticPlot: true});
    }

    // TORUS NONPERIOD
    {
        const torus_nonperiod_block = document.createElement('div');
        torus_nonperiod_block.className = 'acf-block';

        div.appendChild(torus_nonperiod_block);

        const torus_nonperiod_lbl = document.createElement('div');
        torus_nonperiod_lbl.style.marginTop = '5px';
        torus_nonperiod_lbl.style.width = '700px';
        torus_nonperiod_lbl.className = 'name';
        torus_nonperiod_lbl.textContent = 'Аперіодична АКФ Тору станів';
        torus_nonperiod_block.appendChild(torus_nonperiod_lbl);

        const torus_nonperiod = document.createElement('div');
        torus_nonperiod.id = 'torus_nonperiod';
        torus_nonperiod.style.width = '1000px';
        torus_nonperiod.style.height = '390px';
        torus_nonperiod_block.appendChild(torus_nonperiod);

        var data_torus_nonperiod = [
            {
               z: data.autocorr_nonper,
               type: 'heatmap',
                colorscale: [
                    [0, 'rgb(45,106, 79)'],
                    [0.5, 'rgb(0, 255, 0)'],
                    [1, 'rgb(0, 0, 0)']
                ]
            }
        ];

        var nonperiod_torus_layout = {showlegend: false};
        Plotly.newPlot('torus_nonperiod', data_torus_nonperiod, nonperiod_torus_layout , {staticPlot: true});
    }

    // AUTOCORRELATION FUNCTION
    {
        const autocorrelation_block = document.createElement('div');
        autocorrelation_block.className = 'acf-block';
        div.appendChild(autocorrelation_block);

        const autocorrelation_lbl = document.createElement('div');
        autocorrelation_lbl.style.marginTop = '5px';
        autocorrelation_lbl.style.width = '700px';
        autocorrelation_lbl.className = 'name';
        autocorrelation_lbl.textContent = 'Матрична автокореляційна функція послідовності';
        autocorrelation_block.appendChild(autocorrelation_lbl);

        const autocorrelation = document.createElement('div');
        autocorrelation.id = 'autocorrelation';
        autocorrelation.style.width = '1000px';
        autocorrelation.style.height = '390px';
        autocorrelation_block.appendChild(autocorrelation);

        var autocorrelation_graphic = [
            {
               z: data.autocorr2d_seq,
               type: 'heatmap',
                colorscale: [
                    [0, 'rgb(45,106, 79)'],
                    [0.5, 'rgb(0, 255, 0)'],
                    [1, 'rgb(0, 0, 0)']
                ]
            }
        ];

        var autocorrelation_graphic_layout = {showlegend: false};
        Plotly.newPlot('autocorrelation', autocorrelation_graphic, autocorrelation_graphic_layout , {staticPlot: true});
    }
}