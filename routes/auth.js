const { Router } = require ('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/field-validation');

const { login } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('eMail', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
], login);

module.exports = router;