function handleSubmit(event) {
    import {get_cookie} from './get_cookie.js';

    event.preventDefault();

    var form = event.target;
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', form.getAttribute('action'), true);
    xhr.setRequestHeader('X-CSRFToken', get_cookie('csrftoken'));
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
        }
    };
    xhr.send(formData);
}

