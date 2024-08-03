const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const {Usuario} = require('../models');

const usuariosGet = async (req = request, res = response) => {
    const {limit = 5, desde = 0} = req.query;
    const query = {estado: true};
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ]);
    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res) => {
    const {id} = req.params;
    const {password, google, correo, ...resto} = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json(usuario);
}

const usuariosPost = async (req, res) => {
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(201).json({
        usuario
    });
}

const usuariosDelete = async (req, res) => {
    const {id} = req.params;
    //Eliminado fisico
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json(usuario);
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

module.exports = {usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch}