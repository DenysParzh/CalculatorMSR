function handleInputChange(inputId, selectId, url) {
    document.getElementById(inputId).addEventListener('input', function () {
        var inputValue = this.value;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        xhr.setRequestHeader('X-CSRFToken', get_cookie());

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    var selectField = document.getElementById(selectId);
                    if (selectField) {
                        selectField.innerHTML = '';
                        data.forEach(function (item) {
                            var option = document.createElement('option');
                            option.value = `${item.j} ${item.G8} ${item.t}`;
                            option.textContent = `<${item.j} ${item.G8}${item.t}>`;
                            selectField.appendChild(option);
                        });
                    } else {
                        console.error('Select field not found!');
                    }
                } else {
                    console.error('Error request :', xhr.status);
                }
            }
        };
        xhr.send('input_field=' + inputValue);
    });
}