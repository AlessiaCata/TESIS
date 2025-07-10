import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

function AlumnoForm({ onAlumnoAgregado, alumnoSeleccionado, limpiarSeleccion }) {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    fecha_nacimiento: '',
  });

  const [facultadSeleccionada, setFacultadSeleccionada] = useState('');
  const [carreraSeleccionada, setCarreraSeleccionada] = useState('');

  useEffect(() => {
    if (alumnoSeleccionado) {
      const fechaFormateada = alumnoSeleccionado.fecha_nacimiento?.split('T')[0] || '';
      setForm({
        nombre: alumnoSeleccionado.nombre,
        apellido: alumnoSeleccionado.apellido,
        dni: alumnoSeleccionado.dni,
        fecha_nacimiento: fechaFormateada,
      });
      setFacultadSeleccionada(alumnoSeleccionado.facultad || '');
      setCarreraSeleccionada(alumnoSeleccionado.carrera || '');
    } else {
      setForm({
        nombre: '',
        apellido: '',
        dni: '',
        fecha_nacimiento: '',
      });
      setFacultadSeleccionada('');
      setCarreraSeleccionada('');
    }
  }, [alumnoSeleccionado]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datosEnviar = {
      ...form,
      facultad: facultadSeleccionada,
      carrera: carreraSeleccionada
    };

    if (alumnoSeleccionado) {
      axios.put(`http://localhost:3001/api/alumnos/${alumnoSeleccionado.id}`, datosEnviar)
        .then(() => {
          alert("Alumno actualizado");
          onAlumnoAgregado();
          limpiarSeleccion();
        })
        .catch(err => console.error(err));
    } else {
      axios.post('http://localhost:3001/api/alumnos', datosEnviar)
        .then(() => {
          alert("Alumno agregado");
          onAlumnoAgregado();
          setForm({
            nombre: '',
            apellido: '',
            dni: '',
            fecha_nacimiento: '',
          });
          setFacultadSeleccionada('');
          setCarreraSeleccionada('');
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>{alumnoSeleccionado ? "Editar Alumno" : "Agregar Alumno"}</h4>

      <div className="mb-2">
        <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
      </div>
      <div className="mb-2">
        <input type="text" className="form-control" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" required />
      </div>
      <div className="mb-2">
        <input type="text" className="form-control" name="dni" value={form.dni} onChange={handleChange} placeholder="DNI" required />
      </div>
      <div className="mb-2">
        <input type="date" className="form-control" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} required />
      </div>

      <div className="mb-2">
        <label>Facultad</label>
        <select className="form-control" value={facultadSeleccionada} onChange={(e) => {
          setFacultadSeleccionada(e.target.value);
          setCarreraSeleccionada('');
        }} required>
          <option value="">Seleccionar Facultad</option>
          {Object.keys(datosFacultades).map(facultad => (
            <option key={facultad} value={facultad}>{facultad}</option>
          ))}
        </select>
      </div>

      {facultadSeleccionada && (
        <div className="mb-2">
          <label>Carrera</label>
          <select className="form-control" value={carreraSeleccionada} onChange={(e) => setCarreraSeleccionada(e.target.value)} required>
            <option value="">Seleccionar Carrera</option>
            {datosFacultades[facultadSeleccionada].map(carrera => (
              <option key={carrera} value={carrera}>{carrera}</option>
            ))}
          </select>
        </div>
      )}

      <button className="btn btn-success me-2">{alumnoSeleccionado ? "Actualizar" : "Guardar"}</button>
      {alumnoSeleccionado && (
        <button className="btn btn-secondary" onClick={limpiarSeleccion} type="button">Cancelar</button>
      )}
    </form>
  );
}

export default AlumnoForm;





