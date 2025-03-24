const express = require('express');
const cors = require('cors');
const productosRuta = require('./productosRuta');
const pedidosRuta = require('./pedidosRuta');

const app = express();

// Habilitar CORS
app.use(cors());
app.use(express.json()); // Para poder leer el cuerpo de las solicitudes en formato JSON

// Rutas del API
app.use('/api/productos', productosRuta);
app.use('/api/pedidos', pedidosRuta);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal en el servidor' });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});