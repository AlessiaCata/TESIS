// src/pages/FiltroAlumnos.js
import React from 'react';

function FiltroAlumnos({ datosFacultades, filtroFacultad, setFiltroFacultad, filtroCarrera, setFiltroCarrera }) {
  return (
    <div className="mb-4 d-flex flex-wrap gap-2">
      <select
        className="form-control"
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
          className="form-control"
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
        className="btn btn-secondary"
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
