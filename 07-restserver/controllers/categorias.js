const {response, request} = require('express');
const {Categoria} = require('../models');

const categoriasGet = async (req = request, res = response) => {
    const {limit = 5, desde = 0} = req.query;
    const query = {estado: true};
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limit))
    ]);
    res.json({
        total,
        categorias
    });
}

const categoriaGetById = async (req, res = response) => {
    const {id} = req.params;

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    res.json({
        categoria
    });
}

const categoriasPut = async (req, res) => {
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});
    res.json(categoria);
}

const categoriasPost = async (req, res = Response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data);
    await categoria.save();
    res.status(201).json({
        categoria
    });
}

const categoriasDelete = async (req, res) => {
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.json(categoria);
}

module.exports = {
    categoriasGet,
    categoriaGetById,
    categoriasPut,
    categoriasPost,
    categoriasDelete
}