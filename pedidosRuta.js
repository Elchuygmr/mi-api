const express = require('express');
const db = require('./db');

const router = express.Router();

// Realizar un pedido
router.post('/', (req, res, next) => {
  const { productoId, cantidad } = req.body;

  if (!productoId || !cantidad || cantidad <= 0) {
    return res.status(400).json({ message: "Producto y cantidad son obligatorios y deben ser válidos" });
  }

  // Verificar el stock antes de procesar el pedido
  const checkStockQuery = 'SELECT stock FROM productos WHERE id = ?';
  db.query(checkStockQuery, [productoId], (err, results) => {
    if (err) return next(err);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const stockDisponible = results[0].stock;
    if (stockDisponible < cantidad) {
      return res.status(400).json({ message: 'Stock insuficiente' });
    }

    // Restar la cantidad del stock disponible
    const updateStockQuery = 'UPDATE productos SET stock = stock - ? WHERE id = ?';
    db.query(updateStockQuery, [cantidad, productoId], (err, results) => {
      if (err) return next(err);
      res.json({ message: 'Pedido realizado con éxito' });
    });
  });
});

module.exports = router;