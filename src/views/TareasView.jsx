// ==============================================
// FRONTEND src/views/
// JAVASCRIPT NAVEGACION TareasView
// ==============================================
import React from 'react';
import { Plus } from 'lucide-react';

export default function TareasView({ tareas, setShowTareaModal }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Asignación de Tareas por Profesor</h2>
            <p className="text-xs text-slate-500">Registro de tareas creadas por el equipo docente.</p>
          </div>
          <button onClick={() => setShowTareaModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition">
            <Plus className="h-4 w-4" /> Asignar Tarea
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tareas.map((t) => (
            <div key={t.id} className="p-4 border border-slate-200 rounded-lg hover:border-indigo-300 transition">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-slate-800 text-sm">{t.titulo}</h4>
                <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">{t.materia}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Impartido por: {t.profesor}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100 pt-2">
                <span>Límite: <strong className="text-slate-700">{t.fechaEntrega}</strong></span>
                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium">Entregas Activas</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
