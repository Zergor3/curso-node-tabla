const miFormulario = document.querySelector('form');

//Login propio
miFormulario.addEventListener('submit', e => {
    e.preventDefault();
    const formData = {};
    for (let el of miFormulario.elements) {
        if (el.name.length > 0) formData[el.name] = el.value;
    }
    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .then(({msg, token}) => {
            if (msg) {
                return console.error(msg);
            }
            localStorage.setItem('token', token);
            window.location = 'chat.html';
        })
        .catch(err => {
            console.log(err);
        });
});

//Login Google
function handleCredentialResponse(response) {
    // Google Token
    const body = {id_token: response.credential};
    fetch('http://localhost:8080/api/auth/google', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(resp => {
            //Guardamos el token en localStorage
            localStorage.setItem('token', resp.token);
            localStorage.setItem('email', resp.usuario.correo);
            window.location = 'chat.html';
        })
        .catch(console.warn);
}

const button = document.getElementById("google_signout");
button.onclick = () => {
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    });
}