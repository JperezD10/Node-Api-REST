const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtValidator = async (req , resp = response, next) =>{
    const token = req.headers.authorization.split(' ')[1];
    
    if(!token){
        return resp.status(401).json({
            ok: false,
            msg: 'Token is not provided'
        });
    }

    try {
        //si no lanza un token valido, el metodo verify lanza un error
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        
        //este es el usuario autenticado porque el token es valido
        const user = await User.findById(id);

        if(!user){
            return resp.status(401).json({
                ok: false,
                msg: 'User not found'
            });
        }

        if(!user.state){
            return resp.status(401).json({
                ok: false,
                msg: 'User is not active'
            })
        }

        //creo propiedades en el request para que pueda ser usado en el controlador
        req.user = user;

        req.id = id;

        next();
    } catch (error) {

        return resp.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        });
    }

}

module.exports = {
    jwtValidator
};