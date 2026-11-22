// ==============================================
// MODAL: Editar Datos del Profesor
// ==============================================
import React, { useState, useEffect } from 'react';
import API_URL from '../config/api';

export default function EditarProfesorModal({ profesor, isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nombre: '',
    especialidad: '',
    email: '',
    salario_mensual: '0.00',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && profesor) {
      setFormData({
        nombre: profesor.nombre || '',
        especialidad: profesor.especialidad || '',
        email: profesor.email || '',
        salario_mensual:
          profesor.salario !== undefined && profesor.salario !== null
            ? String(profesor.salario)
            : '0.00',
      });
      setErrorMsg('');
      setSubmitting(false);
    }
  }, [isOpen, profesor]);

  if (!isOpen || !profesor) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const nombreTrim = formData.nombre.trim();
    if (!nombreTrim) {
      setErrorMsg('Por favor ingresa el nombre del profesor.');
      return;
    }

    const salarioNum =
      formData.salario_mensual === '' ? 0 : Number(formData.salario_mensual);
    if (Number.isNaN(salarioNum) || salarioNum < 0) {
      setErrorMsg('El salario mensual debe ser un número válido mayor o igual a 0.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/profesores/${profesor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombreTrim,
          especialidad: formData.especialidad.trim(),
          email: formData.email.trim(),
          salario_mensual: salarioNum,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || 'No se pudieron actualizar los datos del profesor.');
        setSubmitting(false);
        return;
      }

      if (typeof onSuccess === 'function') {
        await onSuccess(data.profesor);
      }

      setSubmitting(false);
      onClose();
    } catch (err) {
      setErrorMsg('Error de conexión con el servidor al actualizar los datos.');
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-800">Editar Datos del Profesor</h3>
            <p className="text-xs text-slate-500">
              Modifica la información de #{profesor.id} y guarda en PostgreSQL.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg px-2 py-1 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label htmlFor="edit-prof-nombre" className="mb-1 block font-medium text-slate-700">
              Nombre completo *
            </label>
            <input
              id="edit-prof-nombre"
              name="nombre"
              type="text"
              maxLength={150}
              value={formData.nombre}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="edit-prof-especialidad"
              className="mb-1 block font-medium text-slate-700"
            >
              Especialidad
            </label>
            <input
              id="edit-prof-especialidad"
              name="especialidad"
              type="text"
              maxLength={100}
              value={formData.especialidad}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="edit-prof-email"
              className="mb-1 block font-medium text-slate-700"
            >
              Correo electrónico
            </label>
            <input
              id="edit-prof-email"
              name="email"
              type="email"
              maxLength={150}
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="edit-prof-salario"
              className="mb-1 block font-medium text-slate-700"
            >
              Salario mensual base ($)
            </label>
            <input
              id="edit-prof-salario"
              name="salario_mensual"
              type="number"
              step="0.01"
              min="0"
              value={formData.salario_mensual}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-slate-800 focus:border-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
            >
              {submitting ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
