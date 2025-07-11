// src/pages/AlumnoCard.js
import React from 'react';
import '../Styles/AlumnoCard.css';

function AlumnoCard({ alumno, onEditar, onEliminar }) {
  return (
    <div className="alumno-card d-flex justify-content-between align-items-center">
      <div className="alumno-info">
        <strong>{alumno.nombre} {alumno.apellido}</strong> - DNI: {alumno.dni} <br />
        <small>Facultad: {alumno.facultad || 'Sin asignar'}</small><br />
        <small>Carrera: {alumno.carrera || 'Sin asignar'}</small>
      </div>
      <div className="alumno-actions">
        <button className="btn btn-sm btn-warning me-2" onClick={() => onEditar(alumno)}>Editar</button>
        <button className="btn btn-sm btn-danger" onClick={() => onEliminar(alumno.id)}>Eliminar</button>
      </div>
    </div>
  );
}

export default AlumnoCard;

