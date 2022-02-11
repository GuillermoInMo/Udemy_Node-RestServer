const Role = require('../models/role');

const roleValidation = async(role = '') => {
    const roleExists = await Role.findOne({role});
    if(!roleExists){
        throw new Error(`El rol ${ role } no está registrado en la base de datos`);
    }
}

module.exports = {
    roleValidation
}