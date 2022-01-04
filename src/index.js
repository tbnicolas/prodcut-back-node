const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Creando el servidor de express
const app = express();

//Habilitando que todos los clientes puedan consumir el servicio desde cualquier dominio
app.use(cors());

//Validando el formato json de respuesta
app.use( express.json() );

app.use('/api/auth', require('./router/auth'));
app.use('/api/products', require('./router/products'));

app.listen(process.env.PORT,() => {
    console.log('Escuchando en el puerto', process.env.PORT);
});