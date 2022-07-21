const jwt = require("jsonwebtoken");

const jwtGenerate = (id = '') =>{
    return new Promise((resolve, reject) => {
        const payload = {id};

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                reject(err);
            }
            resolve(token);
        });
    });
}

module.exports = {
    jwtGenerate
}