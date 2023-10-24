const dbValidators = require('./db-validators');
const generarWT = require('./generarJWT');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...dbValidators,
    ...generarWT,
    ...googleVerify,
    ...subirArchivo,
}