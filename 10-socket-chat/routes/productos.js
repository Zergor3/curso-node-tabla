const {Router} = require('express');
const {check} = require("express-validator");
const {existeProductoPorId, existeCategoriaPorId} = require("../helpers/db-validators");
const {validarCampos, validarJWT} = require("../middlewares");
const {
    productosDelete,
    productosPost,
    productosPut,
    productosGet,
    productoGetById
} = require("../controllers/productos");
const {esAdminRole} = require("../middlewares/validar-roles");

const router = Router();

router.get('/', productosGet);

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productoGetById);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('categoria', 'No es un ID valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], productosPut);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], productosPost);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productosDelete);

module.exports = router;