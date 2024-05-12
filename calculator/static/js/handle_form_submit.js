function handleFormSubmit(id, endpoint, callback) {
    const form = document.getElementById(id);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        formData.forEach((el) => console.log(el))

        fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': get_cookie()
            }
        })
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}