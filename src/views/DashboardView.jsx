// ==============================================
// FRONTEND
// JAVASCRIPT NAVEGACION DashboardView
// ==============================================
import React from 'react';
import { GraduationCap, Users, BookOpen, DollarSign, Calendar, AlertCircle } from 'lucide-react';

export default function DashboardView({ alumnos, profesores, materias, colegiaturasMap, calcularEstatusAlumno }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Alumnos</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{alumnos.length}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><GraduationCap className="h-6 w-6" /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Profesores</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{profesores.length}</p>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><Users className="h-6 w-6" /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Materias Activas</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{materias.length}</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><BookOpen className="h-6 w-6" /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nómina Mensual</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">
              ${profesores.reduce((acc, curr) => acc + Number(curr.salario || 0), 0).toLocaleString('es-MX')}
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><DollarSign className="h-6 w-6" /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-600" /> Horarios de Materias
          </h3>
          <div className="space-y-3">
            {materias.slice(0, 3).map((m) => (
              <div key={m.id} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-slate-800">{m.nombre}</p>
                  <p className="text-xs text-slate-500">{m.profesor} • {m.salon}</p>
                </div>
                <span className="text-xs font-mono bg-white border border-slate-200 px-2 py-1 rounded text-slate-600">{m.horario}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600" /> Resumen de Colegiaturas
          </h3>
          <div className="space-y-3">
            {alumnos.map((a) => {
              const cols = colegiaturasMap[a.id] || [];
              const { pagados, n, alDia } = calcularEstatusAlumno(cols);
              return (
                <div key={a.id} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium text-slate-800">{a.nombre}</p>
                    <p className="text-xs text-slate-500">{a.matricula} • {a.grado}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    alDia ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {pagados}/{n} Pagados
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
