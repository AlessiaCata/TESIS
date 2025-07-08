import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlumnoList from './pages/AlumnoList';

function App() {
  return (
    <div className="container mt-4">
      <h1>Gestión de Alumnos</h1>
      <AlumnoList />
    </div>
  );
}

export default App;