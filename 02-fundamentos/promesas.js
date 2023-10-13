const empleados = [{
    id: 1, nombre: 'Fernando'
}, {
    id: 2, nombre: 'Linda'
}, {
    id: 3, nombre: 'Karen'
}];

const salarios = [{
    id: 1, salario: 1000
}, {
    id: 2, salario: 1500
}]

const getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        const empleado = empleados.find((e) => e.id === id)?.nombre;
        empleado ? resolve(empleado) : reject(`Empleado con id ${id} no existe`)
    });
}

const getSalario = (id) => {
    return new Promise((resolve, reject) => {
        const salario = salarios.find((s) => s.id === id)?.salario;
        salario ? resolve(salario) : reject(`Salario del empleado con id ${id} no existe`)
    });
}

// getEmpleado(2).then(e => console.log(e)).catch(err => console.log(err));
// getSalario(2).then(s => console.log(s)).catch(err => console.log(err));

const id = 3;
let nombre;
getEmpleado(id).then(e => {
    nombre = e;
    return getSalario(id)
})
.then(s => console.log('El empleado con el nombre:', nombre, 'tiene un salario de', s))
.catch(err => console.log(err));
