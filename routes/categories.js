const { Router } = require ('express');
const { check } = require ('express-validator');

const { validateJWT, validarCampos } = require('../middlewares');

const { postCategory } = require('../controllers/categories');

const router = Router();

//obtener todas las categorias - publico
router.get('/', (req, res) => {
    console.log(res.json('get'));
});

//obtener una categoria - publico
router.get('/:id', (req, res) => {
    console.log(res.json('get'));
});

//Crear categoria - privado - cualquier persona con token válido
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], postCategory);

//Actualizar categoria - privado - cualquier persona con token válido
router.put('/:id', (req, res) => {
    console.log(res.json('put'));
});

//Borrar categoria - admin
router.delete('/:id', (req, res) => {
    console.log(res.json('delete'));
});

module.exports = router;