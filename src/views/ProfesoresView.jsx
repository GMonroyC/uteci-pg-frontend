// ==============================================
// FRONTEND src/views/
// JAVASCRIPT NAVEGACION ProfesoresView
// ==============================================
import React from 'react';

export default function ProfesoresView({ profesores, searchTerm, toggleEstadoPagoProfesor }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Profesores, Asistencia y Pagos</h2>
          <p className="text-xs text-slate-500">Gestión de nómina y registro de asistencias.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Profesor</th>
              <th className="py-3 px-4">Especialidad</th>
              <th className="py-3 px-4">Asistencia</th>
              <th className="py-3 px-4">Pago Mensual</th>
              <th className="py-3 px-4">Estado del Pago</th>
              <th className="py-3 px-4">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {profesores.filter(p => p.nombre && p.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3 px-4 font-semibold text-slate-800">{p.nombre}</td>
                <td className="py-3 px-4">{p.especialidad}</td>
                <td className="py-3 px-4"><span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-medium">{p.asistencia || '100%'}</span></td>
                <td className="py-3 px-4 font-mono">${Number(p.salario || 0).toLocaleString('es-MX')}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${p.activo ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {p.activo ? 'Activo / Pagado' : 'Pendiente'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button onClick={() => toggleEstadoPagoProfesor(p.id, p.activo ? 'Pagado' : 'Pendiente')} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-medium transition">
                    Cambiar Estado
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
