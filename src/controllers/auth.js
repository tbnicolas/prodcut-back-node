const { response } = require('express');
const getConnection = require('../database/connection');
const sql = require('mssql');
const bcrypt = require('bcryptjs');

const { createUserQyuery,existUserQuery } = require('../database/query');
const { generarJWT } = require('../helpers/jwt');


const crearNuevoUsuario = async ( req, res = response ) => {
    const {nombre,email,password} = req.body;
    try {

        const pool = await getConnection();
        const { recordset: emailDatabase } = await pool.request()
                  .input('email',sql.VarChar, email)
                  .query(existUserQuery) 
       //console.log(emailDatabase.length);

       if( emailDatabase.length > 0 ){
           return res.status(409).json({
                ok:false,
                msg:'El usuario ya existe'
            });
       }

        // Encryptar contraseña
        const salt = bcrypt.genSaltSync();
        const encryptPassword = bcrypt.hashSync( password, salt);

        // Guardando en la base de datos
        const {recordset:id} = await pool.request()
            .input('nombre',sql.VarChar, nombre)
            .input('email',sql.VarChar, email)
            .input('password',sql.VarChar, encryptPassword)
            .query(createUserQyuery);

        //console.log(id[0]['id']);
        const token = await generarJWT(id[0]['id'],nombre);

        res.status(200).json({
            ok:true,
            nombre,
            email,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Un Error ha ocurrido contacte con soporte'
        });
    }
}

const loginUsuario = async ( req, res = response ) => {
    const {email,password} = req.body;
    try {
        
        
        const pool = await getConnection();
        const { recordset: authDatabase } = await pool.request()
        .input('email',sql.VarChar, email)
        .query(existUserQuery);
        
        console.log(authDatabase);

        //Confirmar usuario
        if( authDatabase.length == 0 ){
            return res.status(409).json({
                ok:false,
                msg:'El usuario o contraseña no es correcta'
            });
        }
        
        const validPassword = bcrypt.compareSync(password,authDatabase[0]['password']);

        // Confirmar contraseña
        if (!validPassword) {
            return res.status(409).json({
                ok:false,
                msg:'El usuario o contraseña no es correcta'
            });
        }
        const token = await generarJWT(authDatabase[0]['id'],authDatabase[0]['nombre']);

        res.status(200).json({
            ok:true,
            email,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Un Error ha ocurrido contacte con soporte'
        })
    }
}

module.exports = {
    crearNuevoUsuario,
    loginUsuario
}