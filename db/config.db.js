const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');


    } catch (err) {
        console.log(err);
        throw new Error('Error al inicializar la Base de Datos');
    }


}


module.exports = dbConnection;