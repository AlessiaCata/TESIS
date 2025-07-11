// src/pages/FiltroAlumnos.js
import React from 'react';
import '../Styles/FiltroAlumnos.css';

function FiltroAlumnos({ datosFacultades, filtroFacultad, setFiltroFacultad, filtroCarrera, setFiltroCarrera }) {
  return (
    <div className="filtro-container">
      <select
        value={filtroFacultad}
        onChange={(e) => {
          setFiltroFacultad(e.target.value);
          setFiltroCarrera('');
        }}
      >
        <option value="">Todas las Facultades</option>
        {Object.keys(datosFacultades).map(f => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>

      {filtroFacultad && (
        <select
          value={filtroCarrera}
          onChange={(e) => setFiltroCarrera(e.target.value)}
        >
          <option value="">Todas las Carreras</option>
          {datosFacultades[filtroFacultad].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      )}

      <button
        onClick={() => {
          setFiltroFacultad('');
          setFiltroCarrera('');
        }}
      >
        Limpiar Filtros
      </button>
    </div>
  );
}

export default FiltroAlumnos;
