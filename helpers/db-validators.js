const Role = require('../models/role');
const User = require('../models/user');

const validateRole = async (role = '') =>{
    const existsRole = await Role.findOne({role: role});
    if(!existsRole) //el error no corta la app. Lo captura el middleware
        throw new Error(`The role ${role} does not exists`);
}

const validateEmail = async (email = '') =>{
    const existsEmail = await User.findOne({email: email});
    if(existsEmail) //el error no corta la app. Lo captura el middleware
        throw new Error(`The email ${email} alrady exists`);
}

const validateUserId = async (id = '') =>{
    const userExists = await User.findById(id);
    if(!userExists)
        throw new Error(`The user ${id} does not exists`);
}

module.exports = {
    validateRole,
    validateEmail,
    validateUserId
}