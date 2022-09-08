const { response } = require("express");
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { jwtGenerate } = require("../helpers/jwt");


const login = async (req, resp = response) =>{

    try {
        const { email, password } = req.body;

        const user = await User.findOne({email, state: true});
       
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return resp.status(400).json({
                ok: false,
                msg: 'Incorrect Password'
            });
        }
        const token = await jwtGenerate(user.id);

        resp.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        resp.status(500).json({
            msg: error.message,
            ok: false
        });
    }
}

module.exports = {
    login
}