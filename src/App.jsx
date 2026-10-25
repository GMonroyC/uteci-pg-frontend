import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Calendar, 
  DollarSign, 
  FileCheck, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Search, 
  Clock, 
  MapPin, 
  Award, 
  TrendingUp, 
  AlertCircle,
  Edit,
  Trash2,
  Check,
  UserCheck,
  X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Estados de datos iniciales
  const [materias, setMaterias] = useState([
    { id: 1, codigo: 'MAT-101', nombre: 'Matemáticas I', creditos: 8, profesor: 'Prof. Carlos Mendoza', horario: 'Lun, Mie 08:00 - 10:00', salon: 'Aula A-102' },
    { id: 2, codigo: 'FIS-201', nombre: 'Física General', creditos: 10, profesor: 'Dra. Elena Ramos', horario: 'Mar, Jue 10:00 - 12:00', salon: 'Lab F-01' },
    { id: 3, codigo: 'HIS-105', nombre: 'Historia Universal', creditos: 6, profesor: 'Mtro. Roberto Gómez', horario: 'Vie 09:00 - 12:00', salon: 'Aula B-204' },
    { id: 4, codigo: 'PROG-301', nombre: 'Programación Web', creditos: 12, profesor: 'Ing. Sofía Castro', horario: 'Lun, Mie, Vie 12:00 - 14:00', salon: 'Lab C-05' },
  ]);

  const [profesores, setProfesores] = useState([
    { id: 1, nombre: 'Prof. Carlos Mendoza', especialidad: 'Matemáticas', email: 'carlos.mendoza@escuela.edu', salario: 12500, estadoPago: 'Pagado', asistencia: '95%' },
    { id: 2, nombre: 'Dra. Elena Ramos', especialidad: 'Física', email: 'elena.ramos@escuela.edu', salario: 14000, estadoPago: 'Pendiente', asistencia: '98%' },
    { id: 3, nombre: 'Mtro. Roberto Gómez', especialidad: 'Historia', email: 'roberto.gomez@escuela.edu', salario: 11000, estadoPago: 'Pagado', asistencia: '92%' },
    { id: 4, nombre: 'Ing. Sofía Castro', especialidad: 'Informática', email: 'sofia.castro@escuela.edu', salario: 15000, estadoPago: 'Pendiente', asistencia: '100%' },
  ]);

  const [alumnos, setAlumnos] = useState([
    { id: 1, matricula: 'ALU-2024-01', nombre: 'Ana María López', grado: '3er Semestre', grupo: 'A', estadoColegiatura: 'Al día', asistencia: '96%' },
    { id: 2, matricula: 'ALU-2024-02', nombre: 'Juan Pablo Hernández', grado: '3er Semestre', grupo: 'A', estadoColegiatura: 'Pendiente', asistencia: '88%' },
    { id: 3, matricula: 'ALU-2024-03', nombre: 'Mariana Torres', grado: '1er Semestre', grupo: 'B', estadoColegiatura: 'Al día', asistencia: '99%' },
    { id: 4, matricula: 'ALU-2024-04', nombre: 'Diego Alejandro Silva', grado: '5to Semestre', grupo: 'A', estadoColegiatura: 'Atrasado', asistencia: '79%' },
  ]);

  const [tareas, setTareas] = useState([
    { id: 1, titulo: 'Ecuaciones Diferenciales Ordinarias', materia: 'Matemáticas I', profesor: 'Prof. Carlos Mendoza', fechaEntrega: '2026-11-05', entregadas: 18, total: 22 },
    { id: 2, titulo: 'Reporte Práctica No. 2: Caída Libre', materia: 'Física General', profesor: 'Dra. Elena Ramos', fechaEntrega: '2026-11-08', entregadas: 15, total: 20 },
    { id: 3, titulo: 'Ensayo sobre Revolución Industrial', materia: 'Historia Universal', profesor: 'Mtro. Roberto Gómez', fechaEntrega: '2026-11-12', entregadas: 10, total: 25 },
  ]);

  const [entregasTareas, setEntregasTareas] = useState([
    { id: 1, tarea: 'Ecuaciones Diferenciales Ordinarias', alumno: 'Ana María López', fecha: '2026-11-04', estado: 'Entregado', calificacion: 95 },
    { id: 2, tarea: 'Ecuaciones Diferenciales Ordinarias', alumno: 'Juan Pablo Hernández', fecha: '2026-11-05', estado: 'Entregado', calificacion: 80 },
    { id: 3, tarea: 'Reporte Práctica No. 2: Caída Libre', alumno: 'Mariana Torres', fecha: '-', estado: 'Pendiente', calificacion: null },
  ]);

  // Modales
  const [showMateriaModal, setShowMateriaModal] = useState(false);
  const [nuevaMateria, setNuevaMateria] = useState({ codigo: '', nombre: '', creditos: '', profesor: '', horario: '', salon: '' });

  const [showAlumnoModal, setShowAlumnoModal] = useState(false);
  const [nuevoAlumno, setNuevoAlumno] = useState({ matricula: '', nombre: '', grado: '', grupo: '' });

  const [showTareaModal, setShowTareaModal] = useState(false);
  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', materia: '', profesor: '', fechaEntrega: '' });

  // Handlers
  const handleAddMateria = (e) => {
    e.preventDefault();
    if (!nuevaMateria.nombre) return;
    setMaterias([...materias, { ...nuevaMateria, id: Date.now(), creditos: Number(nuevaMateria.creditos) }]);
    setNuevaMateria({ codigo: '', nombre: '', creditos: '', profesor: '', horario: '', salon: '' });
    setShowMateriaModal(false);
  };

  const handleAddAlumno = (e) => {
    e.preventDefault();
    if (!nuevoAlumno.nombre) return;
    setAlumnos([...alumnos, { ...nuevoAlumno, id: Date.now(), estadoColegiatura: 'Al día', asistencia: '100%' }]);
    setNuevoAlumno({ matricula: '', nombre: '', grado: '', grupo: '' });
    setShowAlumnoModal(false);
  };

  const handleAddTarea = (e) => {
    e.preventDefault();
    if (!nuevaTarea.titulo) return;
    setTareas([...tareas, { ...nuevaTarea, id: Date.now(), entregadas: 0, total: alumnos.length }]);
    setNuevaTarea({ titulo: '', materia: '', profesor: '', fechaEntrega: '' });
    setShowTareaModal(false);
  };

  const toggleEstadoPagoProfesor = (id) => {
    setProfesores(profesores.map(p => p.id === id ? { ...p, estadoPago: p.estadoPago === 'Pagado' ? 'Pendiente' : 'Pagado' } : p));
  };

  const toggleColegiaturaAlumno = (id) => {
    setAlumnos(alumnos.map(a => {
      if (a.id === id) {
        const nextState = a.estadoColegiatura === 'Al día' ? 'Pendiente' : a.estadoColegiatura === 'Pendiente' ? 'Atrasado' : 'Al día';
        return { ...a, estadoColegiatura: nextState };
      }
      return a;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Control Escolar Pro</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs bg-indigo-900/80 border border-indigo-500/30 text-indigo-200 px-3 py-1 rounded-full font-medium">
              Ciclo Lectivo 2026-2
            </span>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
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

        {/* Content Area */}
        <main className="flex-1 space-y-6">
          {/* SEARCH BAR GLOBAL */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar materias, alumnos, profesores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm outline-none text-slate-700 placeholder-slate-400 bg-transparent"
            />
          </div>

          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Alumnos</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{alumnos.length}</p>
                  </div>
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Profesores</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{profesores.length}</p>
                  </div>
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Users className="h-6 w-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Materias Activas</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{materias.length}</p>
                  </div>
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                    <BookOpen className="h-6 w-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nómina Mensual</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">
                      ${profesores.reduce((acc, curr) => acc + curr.salario, 0).toLocaleString('es-MX')}
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Resumen rápido */}
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
                        <span className="text-xs font-mono bg-white border border-slate-200 px-2 py-1 rounded text-slate-600">
                          {m.horario}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" /> Estado de Colegiaturas
                  </h3>
                  <div className="space-y-3">
                    {alumnos.map((a) => (
                      <div key={a.id} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center text-sm">
                        <div>
                          <p className="font-medium text-slate-800">{a.nombre}</p>
                          <p className="text-xs text-slate-500">{a.matricula} • {a.grado}</p>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          a.estadoColegiatura === 'Al día' ? 'bg-emerald-100 text-emerald-800' :
                          a.estadoColegiatura === 'Pendiente' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {a.estadoColegiatura}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MATERIAS TAB */}
          {activeTab === 'materias' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Control de Materias e Impartición</h2>
                  <p className="text-xs text-slate-500">Registro de créditos, salones, horarios y profesores asignados.</p>
                </div>
                <button
                  onClick={() => setShowMateriaModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
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
                    {materias.filter(m => m.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-800 block">{m.nombre}</span>
                          <span className="text-xs text-slate-400 font-mono">{m.codigo}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                            {m.creditos} pts
                          </span>
                        </td>
                        <td className="py-3 px-4">{m.profesor}</td>
                        <td className="py-3 px-4 text-xs font-mono">{m.horario}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                            <MapPin className="h-3 w-3 text-slate-400" /> {m.salon}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PROFESORES TAB */}
          {activeTab === 'profesores' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Profesores, Asistencia y Pagos</h2>
                  <p className="text-xs text-slate-500">Gestión de nómina mensual y registro de asistencias docentes.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Profesor</th>
                      <th className="py-3 px-4">Especialidad</th>
                      <th className="py-3 px-4">Asistencia</th>
                      <th className="py-3 px-4">Pago Mensual</th>
                      <th className="py-3 px-4">Estado del Pago</th>
                      <th className="py-3 px-4">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {profesores.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4 font-semibold text-slate-800">{p.nombre}</td>
                        <td className="py-3 px-4">{p.especialidad}</td>
                        <td className="py-3 px-4">
                          <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-medium">
                            {p.asistencia}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono">${p.salario.toLocaleString('es-MX')}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                            p.estadoPago === 'Pagado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {p.estadoPago}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleEstadoPagoProfesor(p.id)}
                            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-medium transition"
                          >
                            Cambiar Pago
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ALUMNOS TAB */}
          {activeTab === 'alumnos' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Registro de Alumnos y Colegiaturas</h2>
                  <p className="text-xs text-slate-500">Control de asistencia escolar y estado de pago de colegiatura mensual.</p>
                </div>
                <button
                  onClick={() => setShowAlumnoModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                  <Plus className="h-4 w-4" /> Inscribir Alumno
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Matrícula / Nombre</th>
                      <th className="py-3 px-4">Grado / Grupo</th>
                      <th className="py-3 px-4">Asistencia</th>
                      <th className="py-3 px-4">Colegiatura Mensual</th>
                      <th className="py-3 px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {alumnos.filter(a => a.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-800 block">{a.nombre}</span>
                          <span className="text-xs text-slate-400 font-mono">{a.matricula}</span>
                        </td>
                        <td className="py-3 px-4">{a.grado} - "{a.grupo}"</td>
                        <td className="py-3 px-4">
                          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">
                            {a.asistencia}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                            a.estadoColegiatura === 'Al día' ? 'bg-emerald-100 text-emerald-800' :
                            a.estadoColegiatura === 'Pendiente' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {a.estadoColegiatura}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleColegiaturaAlumno(a.id)}
                            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-medium transition"
                          >
                            Actualizar Pago
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAREAS TAB */}
          {activeTab === 'tareas' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Asignación de Tareas por Profesor</h2>
                    <p className="text-xs text-slate-500">Registro de tareas creadas por el equipo docente.</p>
                  </div>
                  <button
                    onClick={() => setShowTareaModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition"
                  >
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
                        <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium">
                          {t.entregadas} / {t.total} Entregadas
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Registro de entregas de alumnos */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
                <h3 className="text-md font-bold text-slate-800">Registro de Tareas Entregadas por Alumnos</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Tarea</th>
                        <th className="py-3 px-4">Alumno</th>
                        <th className="py-3 px-4">Fecha Entrega</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4">Calificación</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {entregasTareas.map((e) => (
                        <tr key={e.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-4 font-medium text-slate-800">{e.tarea}</td>
                          <td className="py-3 px-4">{e.alumno}</td>
                          <td className="py-3 px-4 font-mono text-xs">{e.fecha}</td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                              e.estado === 'Entregado' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {e.estado}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-indigo-600">
                            {e.calificacion !== null ? `${e.calificacion} / 100` : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL NUEVA MATERIA */}
      {showMateriaModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800">Registrar Nueva Materia</h3>
              <button onClick={() => setShowMateriaModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddMateria} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600">Código</label>
                <input type="text" required placeholder="Ej. MAT-101" value={nuevaMateria.codigo} onChange={(e) => setNuevaMateria({...nuevaMateria, codigo: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1 outline-indigo-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Nombre de la Materia</label>
                <input type="text" required placeholder="Ej. Álgebra Lineal" value={nuevaMateria.nombre} onChange={(e) => setNuevaMateria({...nuevaMateria, nombre: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1 outline-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Créditos</label>
                  <input type="number" required placeholder="8" value={nuevaMateria.creditos} onChange={(e) => setNuevaMateria({...nuevaMateria, creditos: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1 outline-indigo-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Salón</label>
                  <input type="text" required placeholder="Aula A-101" value={nuevaMateria.salon} onChange={(e) => setNuevaMateria({...nuevaMateria, salon: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1 outline-indigo-500" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Profesor Asignado</label>
                <input type="text" required placeholder="Prof. Nombre Apellido" value={nuevaMateria.profesor} onChange={(e) => setNuevaMateria({...nuevaMateria, profesor: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1 outline-indigo-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Horario</label>
                <input type="text" required placeholder="Lun, Mie 08:00 - 10:00" value={nuevaMateria.horario} onChange={(e) => setNuevaMateria({...nuevaMateria, horario: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1 outline-indigo-500" />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowMateriaModal(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">Guardar Materia</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NUEVO ALUMNO */}
      {showAlumnoModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800">Inscribir Nuevo Alumno</h3>
              <button onClick={() => setShowAlumnoModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddAlumno} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600">Matrícula</label>
                <input type="text" required placeholder="ALU-2024-XX" value={nuevoAlumno.matricula} onChange={(e) => setNuevoAlumno({...nuevoAlumno, matricula: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1 outline-indigo-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Nombre Completo</label>
                <input type="text" required placeholder="Nombre Apellidos" value={nuevoAlumno.nombre} onChange={(e) => setNuevoAlumno({...nuevoAlumno, nombre: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1 outline-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Grado / Semestre</label>
                  <input type="text" required placeholder="1er Semestre" value={nuevoAlumno.grado} onChange={(e) => setNuevoAlumno({...nuevoAlumno, grado: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1 outline-indigo-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Grupo</label>
                  <input type="text" required placeholder="A" value={nuevoAlumno.grupo} onChange={(e) => setNuevoAlumno({...nuevoAlumno, grupo: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1 outline-indigo-500" />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAlumnoModal(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">Inscribir Alumno</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NUEVA TAREA */}
      {showTareaModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800">Asignar Nueva Tarea</h3>
              <button onClick={() => setShowTareaModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddTarea} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600">Título de la Tarea</label>
                <input type="text" required placeholder="Ej. Ejercicios Cap. 3" value={nuevaTarea.titulo} onChange={(e) => setNuevaTarea({...nuevaTarea, titulo: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1 outline-indigo-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Materia</label>
                <input type="text" required placeholder="Matemáticas I" value={nuevaTarea.materia} onChange={(e) => setNuevaTarea({...nuevaTarea, materia: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1 outline-indigo-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Profesor</label>
                <input type="text" required placeholder="Prof. Carlos Mendoza" value={nuevaTarea.profesor} onChange={(e) => setNuevaTarea({...nuevaTarea, profesor: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1 outline-indigo-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Fecha Límite de Entrega</label>
                <input type="date" required value={nuevaTarea.fechaEntrega} onChange={(e) => setNuevaTarea({...nuevaTarea, fechaEntrega: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1 outline-indigo-500" />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowTareaModal(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">Asignar Tarea</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
