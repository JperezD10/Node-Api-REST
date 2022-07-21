const {response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const getUser = async (req, res= response) => {
    const {limit = 5, from = 0} = req.query;

    //solo busco usuarios activos
    // const users = await User.find({state: true}).skip(Number(from)).limit(Number(limit));
    
    // const total = await User.countDocuments();

    //con esto mando todas las promesas juntas y solo uso un await
    const [total, users] = await Promise.all([
        User.countDocuments(),
        User.find({state: true}).skip(Number(from)).limit(Number(limit)),
    ])

    
    res.json({
        ok: true,
        total,
        users
    })
}

const postUser = async (req, res= response) => {

    const body = req.body;

    const user = new User(body);
    const salt = await bcrypt.genSalt(10);
    user.password = bcrypt.hashSync(user.password, salt);

    await user.save();

    res.json({
        user,
        ok: true,
        msg: 'postUser'
    })
}
const putUser = async (req, res= response) => {

    const id = req.params.id;

    const {password, google, ...resto} = req.body;

    if(password){
        const salt = await bcrypt.genSalt(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);


    res.json({
        ok: true,
        user,
    })
}

const deleteUser = async (req, res= response) => {

    const {id} = req.params;

    // const user = await User.findByIdAndDelete(id, {state: true});
    const user = await User.findByIdAndUpdate(id, {state: false});

    res.json({
        ok: true,
        user,
    })
}

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser
};