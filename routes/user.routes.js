
const { Router } = require('express');
const { check } = require('express-validator');

const { validationCustom } = require('../middlewares/middlerware.custom');
const { isRoleValidate, emailExist, idExist } = require('../helpers/db-validators');


const { userGET,
        userPOST,
        userPUT,
        userPATCH,
        userDELETE } = require('../controllers/user.controller');


const router = Router();


router.get('/', userGET);

router.post('/', [
        check('name', 'El nombre obligatorio').not().isEmpty(),
        check('password', 'La clave debe tener al menos 6 caracteres').isLength({ min: 6 }),
        check('email', 'El correo no es valido').isEmail(),
        check('email').custom( emailExist ),
        // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('role').custom( isRoleValidate ),
        validationCustom
], userPOST );

router.put('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( idExist ),
        check('role').custom( isRoleValidate ),
        validationCustom
], userPUT );

router.patch('/', userPATCH);

router.delete('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( idExist ),
        validationCustom
], userDELETE);




module.exports = router;