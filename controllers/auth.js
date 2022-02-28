const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require('../models/user');

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) =>{
    const {eMail, password} = req.body;

    try{
        // Verificar si el eMail existe
        const user = await User.findOne({eMail});
        if(!user){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // Verificar is el usuario está activo
        if(!user.active){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - contraseña'
            });
        }

        // Generar el JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;

    try{
        const {name, eMail, image} = await googleVerify(id_token);
        
        let usuario = await User.findOne({eMail});

        if(!usuario){
            //Crear usuario
            const data = {
                name,
                eMail,
                password: ':P',
                image,
                google: true
            };
            usuario = new User(data);
            await usuario.save();
            console.log('Se ha guardado nuevo usuario', usuario)
        }

        //Si el usuario ya se encuentra en DB
        if(!usuario.active){
            return res.status(401),json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    }catch(error){
        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        });
    }
}

module.exports = {
    login,
    googleSignIn
}