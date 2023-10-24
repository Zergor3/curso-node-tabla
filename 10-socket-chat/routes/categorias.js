const {Router} = require('express');
const {check} = require("express-validator");
const {existeCategoriaPorId} = require("../helpers/db-validators");
const {validarCampos, validarJWT} = require("../middlewares");
const {
    categoriasDelete,
    categoriasPost,
    categoriasPut,
    categoriasGet,
    categoriaGetById
} = require("../controllers/categorias");
const {esAdminRole} = require("../middlewares/validar-roles");

const router = Router();

router.get('/', categoriasGet);

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], categoriaGetById);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], categoriasPut);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoriasPost);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], categoriasDelete);

module.exports = router;