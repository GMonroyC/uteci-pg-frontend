import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Calendar, 
  DollarSign, 
  FileCheck, 
  TrendingUp, 
  AlertCircle,
  Plus, 
  Search, 
  MapPin, 
  X
} from 'lucide-react';

// URL del backend directo en Render
const API_URL = 'https://uteci-backend-api.onrender.com';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Estados cargados desde la API
  const [materias, setMaterias] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [tareas, setTareas] = useState([]);

  // Modales
  const [showMateriaModal, setShowMateriaModal] = useState(false);
  const [nuevaMateria, setNuevaMateria] = useState({ codigo: '', nombre: '', creditos: '', profesor: '', horario: '', salon: '' });

  const [showAlumnoModal, setShowAlumnoModal] = useState(false);
  const [nuevoAlumno, setNuevoAlumno] = useState({ matricula: '', nombre: '', grado: '', grupo: '' });

  const [showTareaModal, setShowTareaModal] = useState(false);
  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', materia: '', profesor: '', fechaEntrega: '' });

  // Cargar datos al iniciar
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resMat, resProf, resAlum, resTar] = await Promise.all([
        fetch(`${API_URL}/api/materias`).then(res => res.json()),
        fetch(`${API_URL}/api/profesores`).then(res => res.json()),
        fetch(`${API_URL}/api/alumnos`).then(res => res.json()),
        fetch(`${API_URL}/api/tareas`).then(res => res.json())
      ]);
      setMaterias(Array.isArray(resMat) ? resMat : []);
      setProfesores(Array.isArray(resProf) ? resProf : []);
      setAlumnos(Array.isArray(resAlum) ? resAlum : []);
      setTareas(Array.isArray(resTar) ? resTar : []);
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  };

  // Handlers para interactuar con la base de datos
  const handleAddMateria = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/api/materias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...nuevaMateria, creditos: Number(nuevaMateria.creditos) })
      });
      setShowMateriaModal(false);
      setNuevaMateria({ codigo: '', nombre: '', creditos: '', profesor: '', horario: '', salon: '' });
      fetchData();
    } catch (error) {
      console.error('Error al guardar materia:', error);
    }
  };

  const handleAddAlumno = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/api/alumnos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoAlumno)
      });
      setShowAlumnoModal(false);
      setNuevoAlumno({ matricula: '', nombre: '', grado: '', grupo: '' });
      fetchData();
    } catch (error) {
      console.error('Error al guardar alumno:', error);
    }
  };

  const handleAddTarea = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/api/tareas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...nuevaTarea, entregadas: 0, total: alumnos.length })
      });
      setShowTareaModal(false);
      setNuevaTarea({ titulo: '', materia: '', profesor: '', fechaEntrega: '' });
      fetchData();
    } catch (error) {
      console.error('Error al guardar tarea:', error);
    }
  };

  const toggleEstadoPagoProfesor = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === 'Pagado' ? 'Pendiente' : 'Pagado';
    try {
      await fetch(`${API_URL}/api/profesores/${id}/pago`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estadoPago: nuevoEstado })
      });
      fetchData();
    } catch (error) {
      console.error('Error al actualizar pago profesor:', error);
    }
  };

  const toggleColegiaturaAlumno = async (id, estadoActual) => {
    const siguienteEstado = estadoActual === 'Al día' ? 'Pendiente' : estadoActual === 'Pendiente' ? 'Atrasado' : 'Al día';
    try {
      await fetch(`${API_URL}/api/alumnos/${id}/colegiatura`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estadoColegiatura: siguienteEstado })
      });
      fetchData();
    } catch (error) {
      console.error('Error al actualizar colegiatura:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
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
              Ciclo Lectivo 2026-2 (Conectado a Nube)
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex flex-col md:flex-row gap-6">
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

        <main className="flex-1 space-y-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar registros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm outline-none text-slate-700 placeholder-slate-400 bg-transparent"
            />
          </div>

          {activeTab === 'dashboard' && (
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
                          {a.estadoColegiatura || 'Al día'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'materias' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Control de Materias e Impartición</h2>
                  <p className="text-xs text-slate-500">Registro de créditos, salones, horarios y profesores.</p>
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
                    {materias.filter(m => m.nombre && m.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-800 block">{m.nombre}</span>
                          <span className="text-xs text-slate-400 font-mono">{m.codigo}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">{m.creditos} pts</span>
                        </td>
                        <td className="py-3 px-4">{m.profesor}</td>
                        <td className="py-3 px-4 text-xs font-mono">{m.horario}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-xs text-slate-600"><MapPin className="h-3 w-3 text-slate-400" /> {m.salon || 'N/A'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'profesores' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Profesores, Asistencia y Pagos</h2>
                  <p className="text-xs text-slate-500">Gestión de nómina y registro de asistencias.</p>
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
                    {profesores.filter(p => p.nombre && p.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4 font-semibold text-slate-800">{p.nombre}</td>
                        <td className="py-3 px-4">{p.especialidad}</td>
                        <td className="py-3 px-4"><span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-medium">{p.asistencia || '100%'}</span></td>
                        <td className="py-3 px-4 font-mono">${Number(p.salario || 0).toLocaleString('es-MX')}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                            p.activo ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {p.activo ? 'Activo / Pagado' : 'Pendiente'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleEstadoPagoProfesor(p.id, p.activo ? 'Pagado' : 'Pendiente')}
                            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-medium transition"
                          >
                            Cambiar Estado
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'alumnos' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Registro de Alumnos y Colegiaturas</h2>
                  <p className="text-xs text-slate-500">Control de asistencia y estado de colegiatura mensual.</p>
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
                    {alumnos.filter(a => a.nombre && a.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-800 block">{a.nombre}</span>
                          <span className="text-xs text-slate-400 font-mono">{a.matricula}</span>
                        </td>
                        <td className="py-3 px-4">{a.grado} - "{a.grupo}"</td>
                        <td className="py-3 px-4"><span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">{a.asistencia || '100%'}</span></td>
                        <td className="py-3 px-4">
                          <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-emerald-100 text-emerald-800">
                            {a.estadoColegiatura || 'Al día'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleColegiaturaAlumno(a.id, a.estadoColegiatura || 'Al día')}
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
                        <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium">Entregas Activas</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODALES REUTILIZADOS */}
      {showMateriaModal && (
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
      )}

      {showAlumnoModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800">Inscribir Nuevo Alumno</h3>
              <button onClick={() => setShowAlumnoModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleAddAlumno} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600">Matrícula</label>
                <input type="text" required placeholder="ALU-2024-XX" value={nuevoAlumno.matricula} onChange={(e) => setNuevoAlumno({...nuevoAlumno, matricula: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm mt-1" />
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
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAlumnoModal(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">Inscribir Alumno</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTareaModal && (
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
      )}
    </div>
  );
}
