const express = require('express');
const router = express.Router();
const db = require('../database');

// GET todos los alumnos
router.get('/', (req, res) => {
  db.all('SELECT * FROM alumnos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST crear alumno
router.post('/', (req, res) => {
  const { nombre, apellido, dni, fecha_nacimiento, carrera_id } = req.body;
  db.run(
    `INSERT INTO alumnos (nombre, apellido, dni, fecha_nacimiento, carrera_id) VALUES (?, ?, ?, ?, ?)`,
    [nombre, apellido, dni, fecha_nacimiento, carrera_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// PUT actualizar alumno
router.put('/:id', (req, res) => {
  const { nombre, apellido, dni, fecha_nacimiento, carrera_id } = req.body;
  db.run(
    `UPDATE alumnos SET nombre = ?, apellido = ?, dni = ?, fecha_nacimiento = ?, carrera_id = ? WHERE id = ?`,
    [nombre, apellido, dni, fecha_nacimiento, carrera_id, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// DELETE eliminar alumno
router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM alumnos WHERE id = ?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
