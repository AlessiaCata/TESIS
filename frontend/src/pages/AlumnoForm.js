import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AlumnoForm({ onAlumnoAgregado, alumnoSeleccionado, limpiarSeleccion }) {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    fecha_nacimiento: '',
    carrera_id: 1
  });

  useEffect(() => {
    if (alumnoSeleccionado) {
      const fechaFormateada = alumnoSeleccionado.fecha_nacimiento?.split('T')[0] || '';
      setForm({
        nombre: alumnoSeleccionado.nombre,
        apellido: alumnoSeleccionado.apellido,
        dni: alumnoSeleccionado.dni,
        fecha_nacimiento: fechaFormateada,
        carrera_id: alumnoSeleccionado.carrera_id || 1
      });
    } else {
      setForm({
        nombre: '',
        apellido: '',
        dni: '',
        fecha_nacimiento: '',
        carrera_id: 1
      });
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

    if (alumnoSeleccionado) {
      axios.put(`http://localhost:3001/api/alumnos/${alumnoSeleccionado.id}`, form)
        .then(() => {
          alert("Alumno actualizado");
          onAlumnoAgregado();
          limpiarSeleccion();
        })
        .catch(err => console.error(err));
    } else {
      axios.post('http://localhost:3001/api/alumnos', form)
        .then(() => {
          alert("Alumno agregado");
          onAlumnoAgregado();
          setForm({
            nombre: '',
            apellido: '',
            dni: '',
            fecha_nacimiento: '',
            carrera_id: 1
          });
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
        <input type="number" className="form-control" name="carrera_id" value={form.carrera_id} onChange={handleChange} placeholder="ID de carrera" />
      </div>

      <button className="btn btn-success me-2">{alumnoSeleccionado ? "Actualizar" : "Guardar"}</button>
      {alumnoSeleccionado && (
        <button className="btn btn-secondary" onClick={limpiarSeleccion} type="button">Cancelar</button>
      )}
    </form>
  );
}

export default AlumnoForm;



