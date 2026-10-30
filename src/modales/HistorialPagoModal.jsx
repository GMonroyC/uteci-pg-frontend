// ==============================================
// FRONTEND src/modales/
// JAVASCRIPT MODAL HistorialPagoModal
// ==============================================
import React from 'react';
import { X } from 'lucide-react';

export default function HistorialPagoModal({ alumnoSeleccionado, setAlumnoSeleccionado, colegiaturasMap, cambiarEstadoColegiatura }) {
  if (!alumnoSeleccionado) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 space-y-4 shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Historial de Colegiaturas</h3>
            <p className="text-xs text-slate-500">{alumnoSeleccionado.nombre} • Matrícula: {alumnoSeleccionado.matricula}</p>
          </div>
          <button onClick={() => setAlumnoSeleccionado(null)} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 pr-1 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(colegiaturasMap[alumnoSeleccionado.id] || []).map((col) => (
              <div key={col.mes} className="p-3 border border-slate-200 rounded-lg flex items-center justify-between bg-slate-50/50">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{col.mes}</p>
                  <p className="text-xs text-slate-500 font-mono">${Number(col.monto).toLocaleString('es-MX')} MXN</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    col.estado === 'Al día' ? 'bg-emerald-100 text-emerald-800' :
                    col.estado === 'Pendiente' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {col.estado}
                  </span>
                  <button
                    onClick={() => cambiarEstadoColegiatura(alumnoSeleccionado.id, col.mes, col.estado)}
                    className="text-[11px] bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 px-2 py-1 rounded transition"
                  >
                    Cambiar Estado
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button onClick={() => setAlumnoSeleccionado(null)} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
