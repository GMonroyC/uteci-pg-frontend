// ==============================================
// FRONTEND src/views/
// JAVASCRIPT NAVEGACION AlumnosView
// ==============================================
import React from 'react';
import { Plus, CreditCard } from 'lucide-react';

export default function AlumnosView({ alumnos, searchTerm, colegiaturasMap, calcularEstatusAlumno, setShowAlumnoModal, setAlumnoSeleccionado }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Registro de Alumnos y Colegiaturas</h2>
          <p className="text-xs text-slate-500">Lista general con seguimiento dinámico de pagos por periodo.</p>
        </div>
        <button onClick={() => setShowAlumnoModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition">
          <Plus className="h-4 w-4" /> Inscribir Alumno
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Matrícula / Nombre</th>
              <th className="py-3 px-4">Grado / Grupo</th>
              <th className="py-3 px-4">Estatus Cumplimiento (X/n)</th>
              <th className="py-3 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {alumnos.filter(a => a.nombre && a.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((a) => {
              const cols = colegiaturasMap[a.id] || [];
              const { pagados, n, alDia } = calcularEstatusAlumno(cols);

              return (
                <tr key={a.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800 block">{a.nombre}</span>
                    <span className="text-xs text-slate-400 font-mono">{a.matricula}</span>
                  </td>
                  <td className="py-3 px-4">{a.grado} - "{a.grupo}"</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                      alDia ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {pagados}/{n} Pagados {alDia ? '(Al día)' : '(Con adeudo)'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setAlumnoSeleccionado(a)}
                      className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1"
                    >
                      <CreditCard className="h-3.5 w-3.5" /> Ver Historial / Pagos
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
