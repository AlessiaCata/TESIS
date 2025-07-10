// src/pages/AlumnoCard.js
import React from 'react';

function AlumnoCard({ alumno, onEditar, onEliminar }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center shadow-sm rounded mb-2">
      <div>
        <strong>{alumno.nombre} {alumno.apellido}</strong> - DNI: {alumno.dni} <br />
        <small className="text-muted">Facultad: {alumno.facultad || 'Sin asignar'}</small><br />
        <small className="text-muted">Carrera: {alumno.carrera || 'Sin asignar'}</small>
      </div>
      <div>
        <button className="btn btn-sm btn-warning me-2" onClick={() => onEditar(alumno)}>Editar</button>
        <button className="btn btn-sm btn-danger" onClick={() => onEliminar(alumno.id)}>Eliminar</button>
      </div>
    </li>
  );
}

export default AlumnoCard;
