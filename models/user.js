const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Required name']
    },
    email: {
        type: String,
        required: [true, 'Required email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Required password']
    },
    img:{
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        enum: ['USER_ROLE', 'ADMIN_ROLE'],
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//con esto quito el campo password y __v del objeto que se va a mostrar como respuesta json
//tiene que ser una funcion normal porque sino no me deja usar "this"
userSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject();
    return user;
}

module.exports = model('User', userSchema);