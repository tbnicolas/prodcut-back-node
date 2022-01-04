const sql = require('mssql');

const dbSettings = {
    user: 'ntrujillo',
    password: '123456',
    server: 'localhost',
    database: 'store',
    options: {
     encrypt: true, // for azure
     trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

const getConnection = async () => {
   try {
       const pool = await sql.connect(dbSettings);
    
       /* const result = await pool.request().query('SELECT 1');
       
       console.log( result ); */
       return pool;
   } catch (error) {
       console.log(error);
   }

}

module.exports = getConnection;