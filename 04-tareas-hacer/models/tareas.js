require('colors');
const Tarea = require('./tarea')

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const estado = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx}. ${tarea.desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        let lista;
        if (completadas) lista = this.listadoArr.filter(tarea => tarea.completadoEn !== null);
        else lista = this.listadoArr.filter(tarea => tarea.completadoEn === null);
        lista.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const estado = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx}. ${tarea.desc} :: ${estado}`);
        });
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;