import React from 'react';
import '../Styles/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar d-flex flex-column p-3 bg-light shadow-sm">
      <h4 className="mb-4">Panel UCCOPY</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            🧑‍🎓 Alumnos
          </a>
        </li>
        <li>
          <a href="#" className="nav-link">
            🏫 Carreras
          </a>
        </li>
        <li>
          <a href="#" className="nav-link">
            📊 Reportes
          </a>
        </li>
      </ul>
      <hr />
      <div className="user">
        <span className="text-muted">Admin</span>
      </div>
    </div>
  );
}

export default Sidebar;
