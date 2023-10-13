const argv = require('yargs')
    .option('b', {
        alias: 'base',
        type: 'number',
        description: 'Es la base de la tabla de multiplicar',
        demandOption: true
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        description: 'Muestra la tabla en consola',
        default: false
    })
    .option('h', {
        alias: 'hasta',
        type: 'number',
        description: 'Este es el numero hasta donde quieres la tabla',
        default: 10
    })
    .check((argv, options) => {
        if (isNaN(argv.b)) {
            throw 'La base debe ser un numero';
        }
        if (isNaN(argv.h)) {
            throw 'El limite debe ser un numero';
        }
        return true;
    }).argv;

module.exports = argv;