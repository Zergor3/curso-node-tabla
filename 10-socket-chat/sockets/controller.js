const {comprobarJWT} = require("../helpers");
const {ChatMensajes} = require("../models");

const chatMensajes = new ChatMensajes();

const socketController = async (socket, io) => {
    //Validar que este con token valido
    const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
    if (!usuario) {
        return socket.disconnect();
    }
    //Agregamos el usuario a la lista
    chatMensajes.conectarUsuario(usuario);
    //Renderiza los usuarios activos de todos los clientes
    io.emit('usuarios-activos', chatMensajes.usuariosArr);
    //Renderiza los mensajes
    socket.emit('recibir-mensajes', chatMensajes.ultimos10);
    //Añade el socket a un ambito para mensajes privados
    socket.join(usuario.id); //global, socket.id, usuario.id

    socket.on('disconnect', () => {
        //Quitamos el usuario de la lista
        chatMensajes.desconectarUsuario(usuario.id);
        //Renderiza los usuarios activos de todos los clientes
        io.emit('usuarios-activos', chatMensajes.usuariosArr);
    });

    socket.on('enviar-mensaje', ({mensaje, uid}) => {
        //Mensaje privado
        if (uid) {
            socket.to(uid).emit('mensaje-privado', {de: usuario.nombre, mensaje});
        } else {
            //Agrega mensaje a la lista
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje);
            //Renderiza los mensajes de todos los clientes
            io.emit('recibir-mensajes', chatMensajes.ultimos10);
        }
    });
}

module.exports = {
    socketController
}