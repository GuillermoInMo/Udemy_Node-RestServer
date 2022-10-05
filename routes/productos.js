const { Router } = require ('express');
const { check } = require ('express-validator');

const { validateJWT, validarCampos, validateAdminRole } = require('../middlewares');

const { categoryExistsById } = require('../helpers/db-validators');

const { /*getCategories, 
        getCategory, */
        postProduct, 
        /*putCategory,
        deleteCategory*/ } = require('../controllers/productos');

const router = Router();

/*router.get('/', [

], getCategories);*/

/*router.get('/:id', [

], getCategory);*/

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'No es un Id válido').isMongoId(),
    check('category').custom(categoryExistsById),
    validarCampos
], postProduct);

/*router.put('/:id', [

], putCategory);*/

/*router.delete('/:id', [

], deleteCategory);*/

module.exports = router;