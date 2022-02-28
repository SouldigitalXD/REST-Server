const { response , request } = require('express');
const bcrypt = require('bcryptjs');


const User = require('../models/user');



const userGET = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { stateUser: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number(from) )
            .limit(Number( limit ))
    ]);

    res.json({
        total,
        users
     });

};
const userPOST = async(req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Encriptar contraseña
    const salt =  bcrypt.genSaltSync(10);
    user.password =  bcrypt.hashSync( password , salt );

    // Guardar usuario en la base de datos
    await user.save();
    
    res.json({
        user
     });
    
};
const userPUT = async(req, res = response) => {

    const { id }  = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    if ( password ) {
        // Encriptar contraseña
        const salt =  bcrypt.genSaltSync(10);
        resto.password =  bcrypt.hashSync( password , salt );
    }

    const userDB = await User.findByIdAndUpdate( id, resto );
    
    res.json({
        userDB
     });
    
};
const userPATCH = (req, res = response) => {
    res.json({
        msg: 'Patch API - Controller '
     });
    
};
const userDELETE = async(req, res = response) => {

    const { id }  = req.params;

    // strong delete in DB
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { stateUser: false } );

    res.json(user);
    
};



module.exports = {
    userGET,
    userPOST,
    userPUT,
    userPATCH,
    userDELETE
}