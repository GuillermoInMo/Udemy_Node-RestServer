const {request, response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usuariosGet = async(req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {active: true};

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        users
    });
}

const usuariosPost = async(req, res = response) =>{
    const {name, eMail, password, role} = req.body;
    const user = new User({name, eMail, password, role});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    
    //Guardar en BD
    await user.save();

    res.json({
        user
    });
}

const usuariosPut = async(req, res = response) =>{
    const {id} = req.params;
    const {_id, password, google, eMail, ...user} = req.body;
    
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
    }
    const userDb = await User.findByIdAndUpdate(id, user);

    res.json(userDb);
}

const usuariosPatch = (req, res = response) =>{
    res.json({
        msg: 'Patch API - controller'
    });
}

const usuariosDelete = async(req, res = response) =>{
    const {id} = req.params;

    //Borrar físicamente
    //const userDb = await User.findByIdAndDelete(id);

    const userDb = await User.findByIdAndUpdate(id, {active: false});

    res.json({
       id
    }); 
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}