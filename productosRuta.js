const express = require('express');
const db = require('./db');

const router = express.Router();

// Obtener todos los productos
router.get('/', (req, res, next) => {
  const query = 'SELECT * FROM productos';
  db.query(query, (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

// Agregar un nuevo producto
router.post('/', (req, res, next) => {
  const { nombre, stock } = req.body;

  if (!nombre || stock === undefined) {
    return res.status(400).json({ message: "El nombre y el stock son obligatorios" });
  }

  const query = 'INSERT INTO productos (nombre, stock) VALUES (?, ?)';
  db.query(query, [nombre, stock], (err, results) => {
    if (err) return next(err);
    res.status(201).json({ message: 'Producto agregado con éxito', id: results.insertId });
  });
});

// Actualizar un producto
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { nombre, stock } = req.body;

  if (!nombre || stock === undefined) {
    return res.status(400).json({ message: "El nombre y el stock son obligatorios" });
  }

  const query = 'UPDATE productos SET nombre = ?, stock = ? WHERE id = ?';
  db.query(query, [nombre, stock, id], (err, results) => {
    if (err) return next(err);
    res.json({ message: 'Producto actualizado con éxito' });
  });
});

// Eliminar un producto
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const query = 'DELETE FROM productos WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) return next(err);
    res.json({ message: 'Producto eliminado con éxito' });
  });
});

module.exports = router;