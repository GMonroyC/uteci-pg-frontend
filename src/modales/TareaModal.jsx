// ==============================================
// FRONTEND src/modales/
// JAVASCRIPT MODAL TareaModal
// ==============================================
import React from 'react';
import { X } from 'lucide-react';

export default function TareaModal({ showTareaModal, setShowTareaModal, nuevaTarea, setNuevaTarea, handleAddTarea }) {
  if (!showTareaModal) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800">Asignar Nueva Tarea</h3>
          <button onClick={() => setShowTareaModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleAddTarea} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-600">Título de la Tarea</label>
            <input type="text" required placeholder="Ej. Ejercicios Cap. 3" value={nuevaTarea.titulo} onChange={(e) => setNuevaTarea({...nuevaTarea, titulo: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Materia</label>
            <input type="text" required placeholder="Matemáticas I" value={nuevaTarea.materia} onChange={(e) => setNuevaTarea({...nuevaTarea, materia: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Profesor</label>
            <input type="text" required placeholder="Prof. Nombre" value={nuevaTarea.profesor} onChange={(e) => setNuevaTarea({...nuevaTarea, profesor: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Fecha Límite</label>
            <input type="date" required value={nuevaTarea.fechaEntrega} onChange={(e) => setNuevaTarea({...nuevaTarea, fechaEntrega: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1" />
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={() => setShowTareaModal(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">Asignar Tarea</button>
          </div>
        </form>
      </div>
    </div>
  );
}
