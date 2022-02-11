const {request, response} = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const usuariosGet = (req = request, res = response) => {
    const params = req.query
    res.json({
        msg: 'Get API - controller',
        params
    });
}

const usuariosPost = async(req, res = response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const {name, eMail, password, role} = req.body;
    const user = new User({name, eMail, password, role});
    
    //Verificar si el correo existe
    const eMailExists = await User.findOne({eMail});
    if(eMailExists){
        return res.status(400).json({
            msg: 'Ese correo ya se encuentra registrado'
        });
    }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    
    //Guardar en BD
    await user.save();

    res.json({
        user
    });
}

const usuariosPut = (req, res = response) =>{
    const {id} = req.params;

    res.json({
        msg: 'Put API - controller',
        id
    });
}

const usuariosPatch = (req, res = response) =>{
    res.json({
        msg: 'Patch API - controller'
    });
}

const usuariosDelete = (req, res = response) =>{
    res.json({
        msg: 'Delete API - controller'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}