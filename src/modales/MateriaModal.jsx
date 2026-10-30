// ==============================================
// FRONTEND src/modales/
// JAVASCRIPT MODAL MateriaModal
// ==============================================
import React from 'react';
import { X } from 'lucide-react';

export default function MateriaModal({ showMateriaModal, setShowMateriaModal, nuevaMateria, setNuevaMateria, handleAddMateria }) {
  if (!showMateriaModal) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800">Registrar Nueva Materia</h3>
          <button onClick={() => setShowMateriaModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleAddMateria} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-600">Código</label>
            <input type="text" required placeholder="Ej. MAT-101" value={nuevaMateria.codigo} onChange={(e) => setNuevaMateria({...nuevaMateria, codigo: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Nombre de la Materia</label>
            <input type="text" required placeholder="Ej. Álgebra" value={nuevaMateria.nombre} onChange={(e) => setNuevaMateria({...nuevaMateria, nombre: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600">Créditos</label>
              <input type="number" required placeholder="8" value={nuevaMateria.creditos} onChange={(e) => setNuevaMateria({...nuevaMateria, creditos: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Salón</label>
              <input type="text" required placeholder="Aula A-101" value={nuevaMateria.salon} onChange={(e) => setNuevaMateria({...nuevaMateria, salon: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Profesor Asignado</label>
            <input type="text" required placeholder="Prof. Nombre" value={nuevaMateria.profesor} onChange={(e) => setNuevaMateria({...nuevaMateria, profesor: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Horario</label>
            <input type="text" required placeholder="Lun, Mie 08:00 - 10:00" value={nuevaMateria.horario} onChange={(e) => setNuevaMateria({...nuevaMateria, horario: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1" />
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={() => setShowMateriaModal(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">Guardar Materia</button>
          </div>
        </form>
      </div>
    </div>
  );
}
