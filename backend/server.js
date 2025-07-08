const express = require('express');
const cors = require('cors');
const db = require('./database');
const alumnosRoutes = require('./routes/alumnos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/alumnos', alumnosRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));