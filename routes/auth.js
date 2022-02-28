const { Router } = require ('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/field-validation');

const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('eMail', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'Token de Google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;