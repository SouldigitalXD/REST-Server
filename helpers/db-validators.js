const Role = require('../models/role');
const User = require('../models/user');


const isRoleValidate = async( role = '' ) => {
    const ExistRole = await Role.findOne({ role });
    if ( !ExistRole ) {
        throw new Error(`El rol ${role} no esta registrado en la base de datos`);
    }
};

const emailExist = async( email = '' ) => {
    const ExistEmail = await User.findOne({ email });
    if ( ExistEmail ) {
        throw new Error(`El email ${email} ya esta registrado en la base de datos`);
    }
}

const idExist = async( id ) => {
    const idExist = await User.findById(id);
    if ( !idExist ) {
        throw new Error(`El id ${id} no existe`);
    }
}


module.exports = {
    isRoleValidate,
    emailExist,
    idExist
}

