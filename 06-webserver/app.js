const hbs = require('hbs');
require('dotenv').config()
const path = require('path');

const express = require('express')
const app = express();
const port = process.env.PORT;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.set('views', path.join(__dirname, '/views'));

app.use(express.static('06-webserver/public'))

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'Hector Gomez',
        titulo: 'Curso de Node'
    });
});

app.get('/generic', (req, res) => {
    // res.sendFile(__dirname + '/public/template/generic.html');
    res.render('generic', {
        nombre: 'Hector Gomez',
        titulo: 'Curso de Node'
    });
});

app.get('/elements', (req, res) => {
    // res.sendFile(__dirname + '/public/template/elements.html');
    res.render('elements', {
        nombre: 'Hector Gomez',
        titulo: 'Curso de Node'
    });
});

// app.get('/hola-mundo', (req, res) => {
//     res.send('Hola mundo en su respectiva ruta');
// });

// app.get('*', (req, res) => {
//     res.sendFile(__dirname + '/public/back/404.html');
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});