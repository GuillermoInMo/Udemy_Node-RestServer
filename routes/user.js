const { Router } = require ('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/field-validation');
const { roleValidation } = require('../helpers/db-validators');
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser de mas de 6 letras').isLength({min: 6}),
        check('eMail', 'El correo ingresado no es válido').isEmail(),
        //check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom(roleValidation),
        validarCampos
], usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router;