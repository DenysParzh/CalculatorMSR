function create_table_container(label_id, cont_id, table_id, className, parent_div, textContent, data) {
    const div = document.createElement('div');
    div.className = className;
    parent_div.appendChild(div);

    const div_label = document.createElement('div');
    div_label.id = label_id;
    div_label.className = 'name';
    div_label.style.marginTop = '5px';
    div_label.textContent = textContent;
    div.appendChild(div_label);

    const table_container = document.createElement('div');
    table_container.id = cont_id;
    table_container.style.overflowY = 'auto';
    table_container.style.overflowX = 'hidden';
    div.appendChild(table_container);

    const table_matrix = create_table(data);
    table_matrix.id = table_id;
    table_container.appendChild(table_matrix);
}

function create_block(label_id, text_id, className, parent_div, textContent, data) {
    const div = document.createElement('div');
    div.className = className;
    parent_div.appendChild(div);

    const div_label = document.createElement('div');
    div_label.id = label_id;
    div_label.style.marginTop = '5px';
    div_label.className = 'name';
    div_label.textContent = textContent;
    div.appendChild(div_label);

    const text_upper_container = document.createElement('div');
    text_upper_container.style.overflowX = 'auto';
    text_upper_container.style.whiteSpace = 'nowrap';
    text_upper_container.style.maxWidth = '515px'
    text_upper_container.style.overflowY = 'hidden'
    div.appendChild(text_upper_container);

    const text = document.createElement('div');
    text.id = text_id;
    text.className = 'block';
    text.textContent = data;
    text_upper_container.appendChild(text);

    function adjustTextAlignment() {
        if (text.scrollWidth > text_upper_container.clientWidth) {
            text.style.justifyContent = 'left';
        } else {
            text.style.justifyContent = 'center';
        }
    }

    adjustTextAlignment();
    window.addEventListener('resize', adjustTextAlignment);
}

function create_table(data) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    for (let i = 0; i < data.length; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < data[i].length; j++) {
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

function showPopup(message) {
    let popup = document.getElementById('popup');
    document.getElementById('popup_message').innerText = message;
    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
    }, 5000);
}

function closePopup() {
    let popup = document.getElementById('popup');
    popup.classList.remove('show');
}
