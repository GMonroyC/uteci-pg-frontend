// ==============================================
// FRONTEND src/components
// JAVASCRIPT NAVEGACION Navbar
// ==============================================
import React from 'react';
import { GraduationCap } from 'lucide-react';
import API_URL from '../config/api';

export default function Navbar() {
  // Detecta automáticamente si la URL contiene localhost
  const isLocal = API_URL.includes('localhost');

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Control Escolar Pro</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs bg-indigo-900/85 border border-indigo-500/30 text-indigo-200 px-3 py-1 rounded-full font-medium">
            Ciclo Lectivo 2026-2 ({isLocal ? 'Conectado a Local' : 'Conectado a Nube'})
          </span>
        </div>
      </div>
    </header>
  );
}
