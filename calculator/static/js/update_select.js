function updateSelect(inputId, selectId, initValue=0) {
    document.getElementById(inputId).addEventListener('input', function () {
        var inputValue = parseInt(this.value);
        var selectField = document.getElementById(selectId);
        selectField.innerHTML = '';

        for (var i = initValue; i < inputValue + initValue; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selectField.appendChild(option);
        }
    });
}