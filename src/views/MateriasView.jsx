// ==============================================
// FRONTEND src/views/
// JAVASCRIPT NAVEGACION MateriasView
// ==============================================
import React from 'react';
import { Plus, MapPin } from 'lucide-react';

export default function MateriasView({ materias, searchTerm, setShowMateriaModal }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Control de Materias e Impartición</h2>
          <p className="text-xs text-slate-500">Registro de créditos, salones, horarios y profesores.</p>
        </div>
        <button onClick={() => setShowMateriaModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition">
          <Plus className="h-4 w-4" /> Nueva Materia
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Código / Nombre</th>
              <th className="py-3 px-4">Créditos</th>
              <th className="py-3 px-4">Profesor</th>
              <th className="py-3 px-4">Horario</th>
              <th className="py-3 px-4">Salón</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {materias.filter(m => m.nombre && m.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((m) => (
              <tr key={m.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3 px-4"><span className="font-semibold text-slate-800 block">{m.nombre}</span><span className="text-xs text-slate-400 font-mono">{m.codigo}</span></td>
                <td className="py-3 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">{m.creditos} pts</span></td>
                <td className="py-3 px-4">{m.profesor}</td>
                <td className="py-3 px-4 text-xs font-mono">{m.horario}</td>
                <td className="py-3 px-4"><span className="inline-flex items-center gap-1 text-xs text-slate-600"><MapPin className="h-3 w-3 text-slate-400" /> {m.salon || 'N/A'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
