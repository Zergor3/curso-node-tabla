const http = require('http');

http.createServer((req, res) => {
    // res.writeHead(200, {'Content-Type': 'application/json'});
    // res.setHeader('Content-Disposition', 'attachment; filename=lista.csv')
    // res.writeHead(200, {'Content-Type': 'application/csv'});
    // const persona = {
    //     id: 1,
    //     nombre: 'Fernando'
    // }
    // res.write(JSON.stringify(persona));
    res.write('Hola Mundo');
    res.end();
    res.hea
}).listen(8080);

console.log('Escuchando ctmre');