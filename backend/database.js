const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./students.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS alumnos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        apellido TEXT,
        dni TEXT,
        fecha_nacimiento TEXT,
        carrera_id INTEGER
    )`);
});

module.exports = db;
