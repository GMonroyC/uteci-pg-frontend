// ==============================================
// FRONTEND src/views/
// JAVASCRIPT NAVEGACION AlumnosView
// ==============================================
import React, { useEffect, useState } from 'react';
import API_URL from '../config/api';

export default function AlumnosView() {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/alumnos`)
      .then(res => res.json())
      .then(data => setAlumnos(data))
      .catch(err => console.error('Error al cargar alumnos:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Alumnos</h1>
      {/* Aquí pintaremos la tabla con Tailwind */}
      <p>Total de alumnos cargados: {alumnos.length}</p>
    </div>
  );
}
