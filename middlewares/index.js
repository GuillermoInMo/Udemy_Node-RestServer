const  validarCampos  = require('../middlewares/field-validation');
const  validateJWT  = require('../middlewares/jwt-validation');
const  validateRole  = require('../middlewares/role-validation');

module.exports = {
    ...validarCampos,
    ...validateJWT,
    ...validateRole
}