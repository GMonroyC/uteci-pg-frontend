// ==============================================
// FRONTEND src/modales/
// JAVASCRIPT MODAL AlumnoModal
// ==============================================
import React from 'react';
import { X } from 'lucide-react';

export default function AlumnoModal({ showAlumnoModal, setShowAlumnoModal, nuevoAlumno, setNuevoAlumno, handleAddAlumno }) {
  if (!showAlumnoModal) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800">Inscribir Nuevo Alumno</h3>
          <button onClick={() => setShowAlumnoModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleAddAlumno} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-600">Matrícula</label>
            <input type="text" required placeholder="ALU-2026-XX" value={nuevoAlumno.matricula} onChange={(e) => setNuevoAlumno({...nuevoAlumno, matricula: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Nombre Completo</label>
            <input type="text" required placeholder="Nombre Apellidos" value={nuevoAlumno.nombre} onChange={(e) => setNuevoAlumno({...nuevoAlumno, nombre: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600">Grado / Semestre</label>
              <input type="text" required placeholder="1er Semestre" value={nuevoAlumno.grado} onChange={(e) => setNuevoAlumno({...nuevoAlumno, grado: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Grupo</label>
              <input type="text" required placeholder="A" value={nuevoAlumno.grupo} onChange={(e) => setNuevoAlumno({...nuevoAlumno, grupo: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600">Año de Inicio</label>
              <select 
                value={nuevoAlumno.anoInicio} 
                onChange={(e) => setNuevoAlumno({...nuevoAlumno, anoInicio: e.target.value})}
                className="w-full border border-slate-300 rounded p-2 text-sm mt-1 bg-white"
              >
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Mes de Inicio</label>
              <select 
                value={nuevoAlumno.mesInicio} 
                onChange={(e) => setNuevoAlumno({...nuevoAlumno, mesInicio: e.target.value})}
                className="w-full border border-slate-300 rounded p-2 text-sm mt-1 bg-white"
              >
                <option value="0">Enero</option>
                <option value="1">Febrero</option>
                <option value="2">Marzo</option>
                <option value="3">Abril</option>
                <option value="4">Mayo</option>
                <option value="5">Junio</option>
                <option value="6">Julio</option>
                <option value="7">Agosto</option>
                <option value="8">Septiembre</option>
                <option value="9">Octubre</option>
                <option value="10">Noviembre</option>
                <option value="11">Diciembre</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={() => setShowAlumnoModal(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">Inscribir Alumno</button>
          </div>
        </form>
      </div>
    </div>
  );
}
