const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');

let usuario = null;
let socket = null;

//Validamos el token para la sala de chat
const validarJWT = async () => {
    const token = localStorage.getItem('token') || '';
    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }
    //Se renueva el token
    const resp = await fetch('http://localhost:8080/api/auth', {
        headers: {'x-token': token}
    });

    const {usuario: userDB, token: tokenDB} = await resp.json();
    localStorage.setItem('token', tokenDB);
    usuario = userDB;
    document.title = usuario.nombre;
    await conectarSocket();
}

const conectarSocket = async () => {
    //Comunicamos el token mediante el socket
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Online');
    });

    socket.on('disconnect', () => {
        console.log('Offline');
    });

    socket.on('recibir-mensajes', dibujarMensajes);

    socket.on('usuarios-activos', dibujarUsuarios);

    socket.on('mensaje-privado', (payload) => {
        console.log('Privado:', payload);
    });
}

const dibujarUsuarios = (usuarios = []) => {
    let usersHtml = '';
    usuarios.forEach(({nombre, uid}) => {
        usersHtml += `
        <li>
            <p>
                <h5 class="text-success">${nombre}</h5>
                <span class="fs-6 text-muted">${uid}</span>
            </p>
        </li>
        `;
    });
    ulUsuarios.innerHTML = usersHtml;
}

const dibujarMensajes = (mensajes = []) => {
    let mensajesHtml = '';
    mensajes.forEach(({nombre, mensaje}) => {
        mensajesHtml += `
        <li>
            <p>
                <h5 class="text-primary">${nombre}</h5>
                <span>${mensaje}</span>
            </p>
        </li>
        `;
    });
    ulMensajes.innerHTML = mensajesHtml;
}

//Enter para emitir envio de mensaje
txtMensaje.addEventListener('keyup', ({keyCode}) => {
    const mensaje = txtMensaje.value;
    const uid = txtUid.value;
    if (keyCode !== 13) return;
    if (mensaje.length <= 0) return;
    socket.emit('enviar-mensaje', {mensaje, uid});
    txtMensaje.value = '';
});

btnSalir.addEventListener('click', () => {
    localStorage.removeItem('token');
    if (localStorage.getItem('email')) {
        google.accounts.id.disableAutoSelect();
        google.accounts.id.revoke(localStorage.getItem('email'), done => {
            localStorage.clear();
            location.reload();
        });
    }
    window.location = 'index.html';
});

const main = async () => {
    await validarJWT();
}

main();