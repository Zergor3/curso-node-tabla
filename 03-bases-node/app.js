const {crearArchivo} = require('./helpers/multiplicar')
require('colors')
const argv = require('./config/yargs')

console.clear();

crearArchivo(argv.b, argv.l, argv.h).then(nombre => console.log(nombre.rainbow, 'creado')).catch(err => console.log(err));
