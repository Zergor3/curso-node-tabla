const {v4: uudiv4} = require("uuid");
const path = require("path");

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        if (!extensionesValidas.includes(extension)) {
            reject(`La extension ${extension} no es permitida - ${extensionesValidas}`);
        }

        const nombreTemp = uudiv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, function (err) {
            if (err) {
                reject(err);
            }
            resolve(nombreTemp);
        });
    });
}

module.exports = {
    subirArchivo
}