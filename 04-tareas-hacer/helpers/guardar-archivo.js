const fs = require('fs')

const archivo = './04-tareas-hacer/db/data.json';

const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }
    return JSON.parse(fs.readFileSync(archivo, {encoding: 'utf-8'}))
}

module.exports = {
    guardarDB,
    leerDB
}