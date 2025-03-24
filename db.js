const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: 'Gabito54',  
  database: 'comida_ambulante' 
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos exitosa.');
});

module.exports = db;