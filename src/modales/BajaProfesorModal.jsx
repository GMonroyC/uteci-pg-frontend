// ==============================================
// MODAL: Confirmar Baja del Profesor
// ==============================================
import React, { useState, useEffect } from 'react';
import API_URL from '../config/api';

export default function BajaProfesorModal({ profesor, isOpen, onClose, onSuccess }) {
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setErrorMsg('');
      setSubmitting(false);
    }
  }, [isOpen, profesor]);

  if (!isOpen || !profesor) return null;

  const handleConfirmarBaja = async () => {
    setErrorMsg('');
    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/profesores/${profesor.id}/baja`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || 'No se pudo dar de baja al profesor.');
        setSubmitting(false);
        return;
      }

      if (typeof onSuccess === 'function') {
        await onSuccess(data.profesor);
      }

      setSubmitting(false);
      onClose();
    } catch (err) {
      setErrorMsg('Error de conexión con el servidor al procesar la baja.');
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-800">Confirmar Baja de Profesor</h3>
            <p className="text-xs text-slate-500">
              Se desactivará al docente conservando su historial en PostgreSQL.
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

        <div className="space-y-2 rounded-lg bg-slate-50 p-3.5 text-sm text-slate-700">
          <p>
            ¿Seguro que deseas dar de baja a{' '}
            <span className="font-bold text-slate-900">{profesor.nombre}</span>?
          </p>
          {profesor.especialidad && (
            <p className="text-xs text-slate-500">Especialidad: {profesor.especialidad}</p>
          )}
          {profesor.email && (
            <p className="text-xs text-slate-500">Correo: {profesor.email}</p>
          )}
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirmarBaja}
            disabled={submitting}
            className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {submitting ? 'Procesando...' : 'Confirmar Baja'}
          </button>
        </div>
      </div>
    </div>
  );
}
