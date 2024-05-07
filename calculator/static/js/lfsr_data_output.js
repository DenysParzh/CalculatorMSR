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
            console.log(data);
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