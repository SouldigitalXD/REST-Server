const express = require('express')
const cors = require('cors');
const dbConnection = require('../db/config.db');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/user';

        // Connect DB
        this.connectDB();

        // Middleware
        this.middlewares();

        // Routes app
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }



    middlewares() {

        // CORS
        this.app.use( cors() );

        // Body Parser
        this.app.use( express.json() );

        // Static Puclic folder
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on http://localhost:${this.port}`)
        });
    }


}

module.exports = Server;