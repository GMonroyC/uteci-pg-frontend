// ==============================================
// FRONTEND src/views/
// JAVASCRIPT NAVEGACION ProfesoresView
// ==============================================
import React, { useState } from 'react';
import API_URL from '../config/api';
import NuevoProfesorModal from '../modales/NuevoProfesorModal';
import EditarProfesorModal from '../modales/EditarProfesorModal';
import BajaProfesorModal from '../modales/BajaProfesorModal';

export default function ProfesoresView({
  profesores = [],
  searchTerm = '',
  toggleEstadoPagoProfesor,
  onRefreshProfesores,
}) {
  const [modalNuevoAbierto, setModalNuevoAbierto] = useState(false);
  const [profesorEnEdicion, setProfesorEnEdicion] = useState(null);
  const [profesorEnBaja, setProfesorEnBaja] = useState(null);
  const [avisoExito, setAvisoExito] = useState('');
  const [errorAccion, setErrorAccion] = useState('');

  const filtroNormalizado = (searchTerm || '').toLowerCase();

  const profesoresFiltrados = profesores.filter(
    (p) => p.nombre && p.nombre.toLowerCase().includes(filtroNormalizado)
  );

  const handleProfesorCreado = async (nuevoProfesor) => {
    setErrorAccion('');
    setAvisoExito(
      `Profesor "${nuevoProfesor?.nombre || 'registrado'}" guardado correctamente.`
    );
    if (typeof onRefreshProfesores === 'function') {
      await onRefreshProfesores();
    }
  };

  const handleProfesorActualizado = async (profesorActualizado) => {
    setErrorAccion('');
    setAvisoExito(
      `Datos de "${profesorActualizado?.nombre || 'profesor'}" actualizados correctamente.`
    );
    if (typeof onRefreshProfesores === 'function') {
      await onRefreshProfesores();
    }
  };

  const handleBajaConfirmada = async (profesorBaja) => {
    setErrorAccion('');
    setAvisoExito(
      `Se registró la baja de "${profesorBaja?.nombre || 'profesor'}" correctamente.`
    );
    if (typeof onRefreshProfesores === 'function') {
      await onRefreshProfesores();
    }
  };

  const handleReactivarProfesor = async (profesor) => {
    setErrorAccion('');
    setAvisoExito('');
    try {
      const response = await fetch(`${API_URL}/api/profesores/${profesor.id}/reactivar`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorAccion(data.error || 'No se pudo reactivar al profesor.');
        return;
      }
      setAvisoExito(`Profesor "${profesor.nombre}" reactivado correctamente.`);
      if (typeof onRefreshProfesores === 'function') {
        await onRefreshProfesores();
      }
    } catch {
      setErrorAccion('Error de conexión al intentar reactivar al profesor.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Profesores, Asistencia y Pagos</h2>
          <p className="text-xs text-slate-500">Gestión de nómina y registro de asistencias.</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setAvisoExito('');
            setErrorAccion('');
            setModalNuevoAbierto(true);
          }}
          className="px-4 py-2 text-sm bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
        >
          + Nuevo Profesor
        </button>
      </div>

      {avisoExito && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
          {avisoExito}
        </div>
      )}

      {errorAccion && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {errorAccion}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Profesor</th>
              <th className="py-3 px-4">Especialidad</th>
              <th className="py-3 px-4">Asistencia</th>
              <th className="py-3 px-4">Pago Mensual</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">Estado del Pago</th>
              <th className="py-3 px-4">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {profesoresFiltrados.map((p) => {
              const estaActivo = Boolean(p.activo);
              const estadoPagoActual = p.estado_pago || 'Pendiente';

              return (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-semibold text-slate-800">{p.nombre}</td>
                  <td className="py-3 px-4">{p.especialidad || '—'}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-medium">
                      {p.asistencia || '100%'}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    ${Number(p.salario || 0).toLocaleString('es-MX')}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        estaActivo
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {estaActivo ? 'Activo' : 'Baja'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        estadoPagoActual === 'Pagado'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {estadoPagoActual}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAvisoExito('');
                          setErrorAccion('');
                          setProfesorEnEdicion(p);
                        }}
                        className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-medium transition"
                      >
                        Editar
                      </button>
                      {estaActivo ? (
                        <button
                          type="button"
                          onClick={() => {
                            setAvisoExito('');
                            setErrorAccion('');
                            setProfesorEnBaja(p);
                          }}
                          className="text-xs bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-medium transition"
                        >
                          Baja
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleReactivarProfesor(p)}
                          className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-medium transition"
                        >
                          Reactivar
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleEstadoPagoProfesor(p.id, estadoPagoActual)}
                        className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-medium transition"
                      >
                        Cambiar Estado
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <NuevoProfesorModal
        isOpen={modalNuevoAbierto}
        onClose={() => setModalNuevoAbierto(false)}
        onSuccess={handleProfesorCreado}
      />

      <EditarProfesorModal
        profesor={profesorEnEdicion}
        isOpen={Boolean(profesorEnEdicion)}
        onClose={() => setProfesorEnEdicion(null)}
        onSuccess={handleProfesorActualizado}
      />

      <BajaProfesorModal
        profesor={profesorEnBaja}
        isOpen={Boolean(profesorEnBaja)}
        onClose={() => setProfesorEnBaja(null)}
        onSuccess={handleBajaConfirmada}
      />
    </div>
  );
}
