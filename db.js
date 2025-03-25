const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'centerbeam.proxy.rlwy.net',  // Servidor
    user: 'root',                        // Usuario
    password: 'Gabito54',                 // Contraseña
    database: 'comida_ambulante',        // Base de datos
    port: 32159                           // Puerto
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos exitosa.');
});

module.exports = db;
