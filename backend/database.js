const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'admin123',
  database: 'gestion_alumnos'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a MariaDB:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos MariaDB.');
  }
});

module.exports = db;


