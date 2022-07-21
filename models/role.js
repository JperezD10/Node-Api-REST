const {Schema, model} = require('mongoose');

const roleSchema = Schema({
    role: {
        type: String,
        required: [true, 'Required role'],
    }
});


module.exports = model('Role', roleSchema);