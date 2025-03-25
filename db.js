const mysql = require('mysql2');

const db = mysql.createConnection({
 host: 'mysql.railway.internal',  // Host desde la URL
  user: 'root',                     // Usuario desde la URL
  password: 'Gabito54',             // Contraseña desde la URL
  database: 'comida_ambulante',     // Nombre de la BD desde la URL
  port: 3306                        // Puerto desde la URL
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos exitosa.');
});

module.exports = db;
