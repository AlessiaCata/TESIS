import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlumnoForm from './AlumnoForm';
import FiltroAlumnos from './FiltroAlumnos';
import AlumnoCard from './AlumnoCard';

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

  const alumnosFiltrados = alumnos.filter(a =>
    (!filtroFacultad || a.facultad === filtroFacultad) &&
    (!filtroCarrera || a.carrera === filtroCarrera)
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Alumnos</h2>

      <AlumnoForm
        onAlumnoAgregado={cargarAlumnos}
        alumnoSeleccionado={alumnoSeleccionado}
        limpiarSeleccion={limpiarSeleccion}
      />

      <h4 className="mt-4">Filtrar Alumnos</h4>
      <FiltroAlumnos
        datosFacultades={datosFacultades}
        filtroFacultad={filtroFacultad}
        setFiltroFacultad={setFiltroFacultad}
        filtroCarrera={filtroCarrera}
        setFiltroCarrera={setFiltroCarrera}
      />

      <h4 className="mt-4">Listado de Alumnos</h4>
      <ul className="list-group">
        {alumnosFiltrados.map(a => (
          <AlumnoCard key={a.id} alumno={a} onEditar={editarAlumno} onEliminar={eliminarAlumno} />
        ))}
      </ul>
    </div>
  );
}

export default AlumnoList;




