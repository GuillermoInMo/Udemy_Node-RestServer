const { Router } = require ('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/field-validation');
const { roleValidation, eMailExistsInDb, userExistsById } = require('../helpers/db-validators');
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
        check('eMail').custom(eMailExistsInDb),
        check('role').custom(roleValidation),
        validarCampos
], usuariosPost);

router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(userExistsById),
        check('role').custom(roleValidation),
        validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(userExistsById),
        validarCampos
], usuariosDelete);

module.exports = router;