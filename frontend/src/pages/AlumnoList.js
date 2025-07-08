import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlumnoForm from './AlumnoForm';

function AlumnoList() {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  const cargarAlumnos = () => {
    axios.get('http://localhost:3001/api/alumnos')
      .then(res => setAlumnos(res.data))
      .catch(err => console.error(err));
  };

  const eliminarAlumno = (id) => {
    if (window.confirm("¿Estás seguro que querés eliminar este alumno?")) {
      axios.delete(`http://localhost:3001/api/alumnos/${id}`)
        .then(() => cargarAlumnos())
        .catch(err => console.error(err));
    }
  };

  const editarAlumno = (alumno) => {
    setAlumnoSeleccionado(alumno);
  };

  const limpiarSeleccion = () => {
    setAlumnoSeleccionado(null);
  };

  useEffect(() => {
    cargarAlumnos();
  }, []);

  return (
    <div>
      <AlumnoForm
        onAlumnoAgregado={cargarAlumnos}
        alumnoSeleccionado={alumnoSeleccionado}
        limpiarSeleccion={limpiarSeleccion}
      />

      <h3>Listado de Alumnos</h3>
      <ul className="list-group">
        {alumnos.map(a => (
          <li key={a.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{a.nombre} {a.apellido} - DNI: {a.dni}</span>
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => editarAlumno(a)}>Editar</button>
              <button className="btn btn-danger btn-sm" onClick={() => eliminarAlumno(a.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlumnoList;

