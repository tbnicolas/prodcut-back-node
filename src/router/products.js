const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campo');

const { 
    obtenerProductoId,
    crearProducto,
    actualizarProducto,
    eliminarProducto 
} = require('../controllers/product');


const router = new Router();


router.get('/', validarJWT ,obtenerProductoId );

router.post(
    '/',
    [
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('descripcion','La descripcion es requerida').not().isEmpty(),
        validarCampos,
        validarJWT
    ],
     crearProducto
 );

router.put(
    '/:id',
    [   
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('descripcion','La descripcion es requerida').not().isEmpty(),
        validarCampos,
        validarJWT
    ],
    actualizarProducto
);

router.delete('/:id',validarJWT, eliminarProducto);

module.exports = router;