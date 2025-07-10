const express = require('express');
const router = express.Router();
const db = require('../database');

// GET todos los alumnos
router.get('/', (req, res) => {
  db.query('SELECT * FROM alumnos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST crear alumno
router.post('/', (req, res) => {
  const { nombre, apellido, dni, fecha_nacimiento, facultad, carrera } = req.body;
  const sql = 'INSERT INTO alumnos (nombre, apellido, dni, fecha_nacimiento, facultad, carrera) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [nombre, apellido, dni, fecha_nacimiento, facultad, carrera];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId });
  });
});

// PUT actualizar alumno
router.put('/:id', (req, res) => {
  const { nombre, apellido, dni, fecha_nacimiento, facultad, carrera } = req.body;
  const sql = `
    UPDATE alumnos 
    SET nombre = ?, apellido = ?, dni = ?, fecha_nacimiento = ?, facultad = ?, carrera = ?
    WHERE id = ?
  `;
  const values = [nombre, apellido, dni, fecha_nacimiento, facultad, carrera, req.params.id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: result.affectedRows });
  });
});

// DELETE eliminar alumno
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM alumnos WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: result.affectedRows });
  });
});

module.exports = router;


