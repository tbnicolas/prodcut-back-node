const { Router } = require('express');
const { check }  = require('express-validator');
const { validarCampos } = require('../middleware/validar-campo');
const { 
    crearNuevoUsuario,
    loginUsuario 
} = require('../controllers/auth');



const router = new Router();

router.post(
    '/new',
    [
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('email','Revise el formato de email').isEmail(),
        check('password','El password es requerido').not().isEmpty(),
        validarCampos
    ],
    crearNuevoUsuario
);

router.post(
    '/',
    [
        check('email','Revise el formato de email').isEmail(),
        check('password','El password es requerido').not().isEmpty(),
        validarCampos
    ],
    loginUsuario
);

module.exports = router;