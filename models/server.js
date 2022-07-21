const express = require('express')
const cors = require('cors')
const {dbConection} = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

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
        this.app.use('/api/user', require('../routes/user.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`App corriendo en ${this.port}`)
        })
    }
}

module.exports = Server;