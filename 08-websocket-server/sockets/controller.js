const socketController = (socket) => {
    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    socket.on('enviar-mensaje', (payload, callback) => {
        const id = 123456;
        callback(id);
        socket.broadcast.emit('enviar-mensaje', payload); //envio de mensaje de server a client
    });
}

module.exports = {
    socketController
}