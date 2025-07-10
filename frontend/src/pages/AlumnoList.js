import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlumnoForm from './AlumnoForm';

const datosFacultades = {
  "FACULTAD DE DERECHO Y CIENCIAS SOCIALES": [
    "ABOGACÍA", "MARTILLERO PÚBLICO/NOTARIADO", "TECNICATURA UNIVERSITARIA EN HIGIENE Y SEGURIDAD EN EL TRABAJO"
  ],
  "FACULTAD DE CIENCIAS ECONOMICAS Y EMPRESARIALES": [
    "CONTADOR PÚBLICO", "LICENCIATURA EN COMERCIO INTERNACIONAL", "ECONOMÍA", "COMERCIALIZACIÓN",
    "ADMINISTRACIÓN DE EMPRESAS", "ADMINISTRACIÓN HOTELERA", "TECNICATURA UNIVERSITARIA CONTABLE",
    "TECNICATURA EN COMERCIO EXTERIOR Y ADUANAS", "TECNICATURA EN COMERCIALIZACIÓN", "TECNICATURA EN ADMINISTRACIÓN HOTELERA",
    "TÉCNICO UNIVERSITARIO EN ADMINISTRACIÓN DE EMPRESAS", "TECNICATURA UNIVERSITARIA EN DESARROLLO DE SOFTWARE"
  ],
  "FACULTAD DE FILOSOFÍA Y HUMANIDADES": [
    "LICENCIATURA EN PSICOLOGÍA", "RECURSOS HUMANOS", "TECNICATURA EN ACOMPAÑAMIENTO TERAPÉUTICO", "TECNICATURA EN SECRETARIADO EJECUTIVO"
  ],
  "FACULTAD DE CIENCIAS MÉDICAS": [
    "MEDICINA", "LICENCIATURA EN ENFERMERÍA", "KINESIOLOGÍA Y FISIOTERAPIA", "NUTRICIÓN",
    "TECNICATURA EN ANÁLISIS CLÍNICOS", "TECNICATURA EN HEMOTERAPIA", "ASISTENTE DENTAL", "ENFERMERO UNIVERSITARIO"
  ],
  "FACULTAD DE CIENCIAS DE LA ALIMENTACIÓN, BIOQUÍMICAS Y FARMACÉUTICAS": [
    "LICENCIATURA EN TECNOLOGÍA DE LOS ALIMENTOS", "ENOLOGÍA", "BROMATÓLOGO Y FARMACIA", "TECNICATURA EN GESTIÓN GASTRONÓMICA", "SOMMELIER"
  ],
  "FACULTAD DE EDUCACIÓN": [
    "LICENCIATURA EN PSICOPEDAGOGÍA Y PSICOMOTRICIDAD", "PROFESORADO", "TECNICATURA EN POLÍTICAS DEPORTIVAS", "TECNICATURA EN GUÍA DE MONTAÑA"
  ]
};

function AlumnoList() {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [filtroFacultad, setFiltroFacultad] = useState('');
  const [filtroCarrera, setFiltroCarrera] = useState('');

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

  const alumnosFiltrados = alumnos.filter(a => {
    return (
      (!filtroFacultad || a.facultad === filtroFacultad) &&
      (!filtroCarrera || a.carrera === filtroCarrera)
    );
  });

  return (
    <div>
      <AlumnoForm
        onAlumnoAgregado={cargarAlumnos}
        alumnoSeleccionado={alumnoSeleccionado}
        limpiarSeleccion={limpiarSeleccion}
      />

      <h3>Filtrar Alumnos</h3>
      <div className="mb-3 d-flex gap-2">
        <select
          className="form-control"
          value={filtroFacultad}
          onChange={e => {
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
            onChange={e => setFiltroCarrera(e.target.value)}
          >
            <option value="">Todas las Carreras</option>
            {datosFacultades[filtroFacultad].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}

        <button className="btn btn-secondary" onClick={() => {
          setFiltroFacultad('');
          setFiltroCarrera('');
        }}>Limpiar Filtros</button>
      </div>

      <h3>Listado de Alumnos</h3>
      <ul className="list-group">
        {alumnosFiltrados.map(a => (
          <li key={a.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <strong>{a.nombre} {a.apellido}</strong> - DNI: {a.dni} <br />
              <small>Facultad: {a.facultad || 'Sin asignar'}</small><br />
              <small>Carrera: {a.carrera || 'Sin asignar'}</small>
            </span>
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



