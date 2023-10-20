const {Router} = require('express');
const {check} = require("express-validator");
const {validarJWT, validarCampos, esAdminRole, tieneRole} = require('../middlewares');
const {esRoleValido, emailExiste, existeUsuarioPorId} = require("../helpers/db-validators");
const {
    usuariosGet,
    usuariosPatch,
    usuariosDelete,
    usuariosPost,
    usuariosPut
} = require("../controllers/usuarios");

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser mas de 6 letras').isLength({min: 6}),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(emailExiste),
        // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom(esRoleValido),
        validarCampos
    ],
    usuariosPost
);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);
router.patch('/', usuariosPatch);


module.exports = router;