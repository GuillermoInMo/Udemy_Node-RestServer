const { response } = require("express");

const validateAdminRole = (req, res = response, next) => {
    if(!req.userReq){
        return res.status(500).json({
            msg: 'Se requiere verificar el rol sin validar el token primero'
        })
    }
    const {role, name} = req.userReq
    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no es administrador - No puede hacer esto`
        });
    }
    next();
}

const validateRole = (...roles) => {
    return (req, res = response, next) => {
        if(!req.userReq){
            return res.status(500).json({
                msg: 'Se requiere verificar el rol sin validar el token primero'
            });
        }
        if(!roles.includes(req.userReq.role)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }
        next();
    };
}

module.exports = {
    validateAdminRole,
    validateRole
}