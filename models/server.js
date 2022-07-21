const express = require('express')
const cors = require('cors')
const {dbConection} = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/user';
        this.authPath = '/api/auth';

        this.connectDatabase();
        //middlewares
        this.middlewares();

        this.routes();
    }

    async connectDatabase(){
        await dbConection();
    }

    middlewares(){

        this.app.use(express.static('public'));
        this.app.use(cors());

        //parseo del body
        this.app.use(express.json());

    }

    routes(){
        this.app.use(this.usersPath, require('../routes/user.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`App corriendo en ${this.port}`)
        })
    }
}

module.exports = Server;