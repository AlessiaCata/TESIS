// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlumnoList from './pages/AlumnoList';
import './Styles/Sidebar.css';

function App() {
  return (
    <div id="wrapper">
      {/* Sidebar */}
      <div className="sidebar text-white">
        <h4 className="mb-4">UCCOPY</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">🏠 Dashboard</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">🎓 Alumnos</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">📚 Carreras</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">🏛️ Facultades</a>
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="content-wrapper">
        <AlumnoList />
      </div>
    </div>
  );
}

export default App;

