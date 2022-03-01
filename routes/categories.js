const { Router } = require ('express');
const { check } = require ('express-validator');

const { validateJWT, validarCampos } = require('../middlewares');

const { categoryExistsById } = require('../helpers/db-validators');

const { getCategories, 
        getCategory, 
        postCategory, 
        putCategory } = require('../controllers/categories');

const router = Router();

router.get('/', [

], getCategories);

router.get('/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(categoryExistsById),
    validarCampos
], getCategory);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], postCategory);

//Actualizar categoria - privado - cualquier persona con token válido
router.put('/:id', [
    validateJWT,
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(categoryExistsById),
    check('name', 'No hay información para actualizar').not().isEmpty(),
    validarCampos
], putCategory);

//Borrar categoria - admin
router.delete('/:id', (req, res) => {
    console.log(res.json('delete'));
});

module.exports = router;