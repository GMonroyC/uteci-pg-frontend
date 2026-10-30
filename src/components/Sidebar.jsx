// ==============================================
// FRONTEND src/components
// JAVASCRIPT NAVEGACION Sidebar
// ==============================================
import React from 'react';
import { 
  TrendingUp, 
  BookOpen, 
  Users, 
  GraduationCap, 
  AlertTriangle, 
  FileCheck 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, atrasadosCount }) {
  return (
    <aside className="w-full md:w-64 bg-white rounded-xl shadow-sm border border-slate-200 p-4 shrink-0">
      <nav className="space-y-1">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>Dashboard Principal</span>
        </button>
        <button
          onClick={() => setActiveTab('materias')}
          className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'materias' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Materias y Horarios</span>
        </button>
        <button
          onClick={() => setActiveTab('profesores')}
          className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'profesores' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Profesores y Pagos</span>
        </button>
        <button
          onClick={() => setActiveTab('alumnos')}
          className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'alumnos' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>Alumnos y Colegiaturas</span>
        </button>
        <button
          onClick={() => setActiveTab('atrasados')}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'atrasados' ? 'bg-rose-50 text-rose-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-4 w-4 text-rose-600" />
            <span>Colegiaturas Atrasadas</span>
          </div>
          {atrasadosCount > 0 && (
            <span className="bg-rose-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {atrasadosCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('tareas')}
          className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'tareas' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <FileCheck className="h-4 w-4" />
          <span>Tareas y Entregas</span>
        </button>
      </nav>
    </aside>
  );
}
