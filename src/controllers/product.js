const { response } = require('express');
const sql = require('mssql');
const getConnection = require('../database/connection');
const { 
    getProductsByUserIdQuery,
    createProductQuery,
    updateProductQuery,
    deleteProductQuery
} = require('../database/query');

const obtenerProductoId = async ( req, res = response ) => {

    const cliente = req.uid;

    try {
        const pool = await getConnection();
        const { recordset:products } = await pool.request()
                                .input('cliente',sql.Int,cliente)
                                .query(getProductsByUserIdQuery);
        //console.log(resultQuery);
                                
        res.status(200).json({
            ok:true,
            products
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Un Error ha ocurrido contacte con soporte'
        });
    }

}

const crearProducto = async ( req, res = response ) => {
    const cliente = req.uid;
    const { nombre, descripcion } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
                  .input('nombre',sql.VarChar,nombre)
                  .input('descripcion',sql.VarChar,descripcion)
                  .input('cliente',sql.Int,cliente)
                  .query(createProductQuery);

        res.status(201).json({
            ok:true,
            nombre,
            descripcion,
            cliente
        }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Un Error ha ocurrido contacte con soporte'
        });
    }

}

const actualizarProducto = async ( req, res = response ) => {

    const { id } = req.params;
    const cliente = req.uid;

    const { nombre, descripcion } = req.body;

    try {
        const pool = await getConnection();
         await pool.request()
                   .input('nombre',sql.VarChar,nombre)
                   .input('descripcion',sql.VarChar,descripcion)
                   .input('cliente',sql.Int,cliente)
                   .input('id',sql.Int,id)
                   .query(updateProductQuery);

        res.status(200).json({
            ok:true,
            nombre,
            descripcion,
            cliente,
            id
        });                    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Un Error ha ocurrido contacte con soporte'
        });
    }
}

const eliminarProducto = async ( req, res = response ) => {
    const { id } = req.params;
    
    try {
        const pool = await getConnection();
        await pool.request()
                  .input('id',sql.Int,id)
                  .query(deleteProductQuery)  
        res.status(200).json({
            ok:true,
            id
        });
                              
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Un Error ha ocurrido contacte con soporte'
        })
    }
}
module.exports = {
    obtenerProductoId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}