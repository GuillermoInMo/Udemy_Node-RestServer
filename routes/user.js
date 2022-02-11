const { Router } = require ('express');
const { check } = require('express-validator');
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
        check('eMail', 'El correo ingresado no es válido').isEmail()
], usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router;