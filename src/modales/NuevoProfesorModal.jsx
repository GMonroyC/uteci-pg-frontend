// ==============================================
// MODAL: Nuevo Profesor
// ==============================================
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import API_URL from '../config/api';

const INITIAL_FORM = {
  nombre: '',
  especialidad: '',
  email: '',
  salario_mensual: '0.00',
};

export default function NuevoProfesorModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(INITIAL_FORM);
      setErrorMsg('');
      setSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
      const response = await fetch(`${API_URL}/api/profesores`, {
        method: 'POST',
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
        setErrorMsg(data.error || 'No se pudo registrar al profesor.');
        setSubmitting(false);
        return;
      }

      if (typeof onSuccess === 'function') {
        await onSuccess(data.profesor);
      }

      setSubmitting(false);
      onClose();
    } catch (err) {
      setErrorMsg('Error de conexión con el servidor al guardar el profesor.');
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800">Nuevo Profesor</h3>
            <p className="text-xs text-slate-500">
              Registra los datos básicos del docente en PostgreSQL.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="text-slate-400 hover:text-slate-600 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="prof-nombre" className="text-xs font-semibold text-slate-600">
              Nombre Completo *
            </label>
            <input
              id="prof-nombre"
              name="nombre"
              type="text"
              maxLength={150}
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. Dra. Elena Ramírez"
              className="w-full border border-slate-300 rounded p-2 text-sm mt-1 text-slate-800 focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="prof-especialidad"
              className="text-xs font-semibold text-slate-600"
            >
              Especialidad
            </label>
            <input
              id="prof-especialidad"
              name="especialidad"
              type="text"
              maxLength={100}
              value={formData.especialidad}
              onChange={handleChange}
              placeholder="Ej. Matemáticas / Ingeniería"
              className="w-full border border-slate-300 rounded p-2 text-sm mt-1 text-slate-800 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="prof-email" className="text-xs font-semibold text-slate-600">
              Correo Electrónico
            </label>
            <input
              id="prof-email"
              name="email"
              type="email"
              maxLength={150}
              value={formData.email}
              onChange={handleChange}
              placeholder="Ej. elena.ramirez@uteci.edu.mx"
              className="w-full border border-slate-300 rounded p-2 text-sm mt-1 text-slate-800 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="prof-salario"
              className="text-xs font-semibold text-slate-600"
            >
              Salario Mensual Base ($)
            </label>
            <input
              id="prof-salario"
              name="salario_mensual"
              type="number"
              step="0.01"
              min="0"
              value={formData.salario_mensual}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded p-2 text-sm mt-1 font-mono text-slate-800 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {submitting ? 'Guardando...' : 'Guardar Profesor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
