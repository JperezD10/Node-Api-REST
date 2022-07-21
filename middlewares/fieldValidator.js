const { validationResult } = require('express-validator');

const fieldValidator = (req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    //con esto se puede pasar a la siguiente funcion
    //es una funcion que va en despues de los "check"
    next();
}

module.exports = {
    fieldValidator
}