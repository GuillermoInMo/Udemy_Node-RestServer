const User = require('../models/user');
const Role = require('../models/role');

const roleValidation = async(role = '') => {
    const roleExists = await Role.findOne({role});
    if(!roleExists){
        throw new Error(`El rol ${role} no está registrado en la base de datos`);
    }
}

const eMailExistsInDb = async(eMail = '') => {
    const eMailExists = await User.findOne({eMail});
    if(eMailExists){
        throw new Error(`El correo ${eMail} ya está registrado en la base de datos`);
    }
}

const userExistsById = async(id) => {
    const userExists = await User.findById(id);
    if(!userExists){
        throw new Error(`El Usuario con el id ${id} no existe`);
    }
}

module.exports = {
    roleValidation,
    eMailExistsInDb,
    userExistsById
}