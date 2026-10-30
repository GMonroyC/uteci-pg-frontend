// ==============================================
// FRONTEND src/views/
// JAVASCRIPT NAVEGACION AtrasadosView
// ==============================================
import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function AtrasadosView({ atrasados, searchTerm, alumnos, setAlumnoSeleccionado }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-600" /> Panel de Colegiaturas Atrasadas
          </h2>
          <p className="text-xs text-slate-500">Alumnos con adeudos pendientes y desglose por cobrar.</p>
        </div>
      </div>

      {atrasados.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-sm">
          <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
          ¡Excelente! Todos los alumnos se encuentran al día con sus colegiaturas.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-rose-50 text-rose-900 text-xs uppercase font-semibold border-b border-rose-100">
              <tr>
                <th className="py-3 px-4">Alumno / Matrícula</th>
                <th className="py-3 px-4">Grado</th>
                <th className="py-3 px-4">Meses Pendientes</th>
                <th className="py-3 px-4">Monto Total Adeudado</th>
                <th className="py-3 px-4">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {atrasados.filter(a => a.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                <tr key={item.alumno_id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {item.nombre}
                    <span className="block text-xs font-mono text-slate-400">{item.matricula}</span>
                  </td>
                  <td className="py-3 px-4">{item.grado} - "{item.grupo}"</td>
                  <td className="py-3 px-4">
                    <span className="text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-medium block w-fit mb-1">
                      {item.meses_adeudados} mes(es)
                    </span>
                    <span className="text-xs text-slate-500">{item.lista_meses_pendientes}</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-rose-600 font-mono">
                    ${Number(item.total_adeudado).toLocaleString('es-MX')} MXN
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => {
                        const al = alumnos.find(x => x.id === item.alumno_id);
                        if (al) setAlumnoSeleccionado(al);
                      }}
                      className="text-xs bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg font-medium transition"
                    >
                      Gestionar Pago
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
