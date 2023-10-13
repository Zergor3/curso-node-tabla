// setTimeout(() => {
//     console.log('Hola Mundo');
// }, 1000);

getUsuarioByID = (id, callback) => {
    const usuario = {
        id,
        nombre: 'Fernando'
    }

    setTimeout(() => {
        callback(usuario);
    }, 1500);
}

getUsuarioByID(10, (usuario) => {
    console.log(usuario.id);
    console.log(usuario.nombre.toUpperCase());
});
