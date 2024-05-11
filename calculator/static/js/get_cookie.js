function get_cookie(){
    return document.querySelector('[name=csrfmiddlewaretoken]').value
}