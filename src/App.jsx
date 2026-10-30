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
  X,
  CreditCard,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const API_URL = 'https://uteci-backend-api.onrender.com';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const [materias, setMaterias] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [atrasados, setAtrasados] = useState([]);
  const [colegiaturasMap, setColegiaturasMap] = useState({});

  // Modales
  const [showMateriaModal, setShowMateriaModal] = useState(false);
  const [nuevaMateria, setNuevaMateria] = useState({ codigo: '', nombre: '', creditos: '', profesor: '', horario: '', salon: '' });

  const [showAlumnoModal, setShowAlumnoModal] = useState(false);
  const [nuevoAlumno, setNuevoAlumno] = useState({ 
    matricula: '', 
    nombre: '', 
    grado: '', 
    grupo: '', 
    anoInicio: new Date().getFullYear().toString(), 
    mesInicio: '0' 
  });

  const [showTareaModal, setShowTareaModal] = useState(false);
  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', materia: '', profesor: '', fechaEntrega: '' });

  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resMat, resProf, resAlum, resTar, resAtrasados] = await Promise.all([
        fetch(`${API_URL}/api/materias`).then(res => res.json()),
        fetch(`${API_URL}/api/profesores`).then(res => res.json()),
        fetch(`${API_URL}/api/alumnos`).then(res => res.json()),
        fetch(`${API_URL}/api/tareas`).then(res => res.json()),
        fetch(`${API_URL}/api/colegiaturas/atrasadas`).then(res => res.json())
      ]);

      setMaterias(Array.isArray(resMat) ? resMat : []);
      setProfesores(Array.isArray(resProf) ? resProf : []);
      const listaAlumnos = Array.isArray(resAlum) ? resAlum : [];
      setAlumnos(listaAlumnos);
      setTareas(Array.isArray(resTar) ? resTar : []);
      setAtrasados(Array.isArray(resAtrasados) ? resAtrasados : []);

      const map = {};
      for (const al of listaAlumnos) {
        try {
          const resCol = await fetch(`${API_URL}/api/alumnos/${al.id}/colegiaturas`);
          const dataCol = await resCol.json();
          map[al.id] = Array.isArray(dataCol) ? dataCol : [];
        } catch {
          map[al.id] = [];
        }
      }
      setColegiaturasMap(map);

    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  };

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
      setNuevoAlumno({ matricula: '', nombre: '', grado: '', grupo: '', anoInicio: new Date().getFullYear().toString(), mesInicio: '0' });
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

  // Función corregida: usa alumnoId y el nombre del mes exacto
  const cambiarEstadoColegiatura = async (alumnoId, mes, estadoActual) => {
    const siguienteEstado = estadoActual === 'Al día' ? 'Pendiente' : estadoActual === 'Pendiente' ? 'Atrasado' : 'Al día';
    try {
      const res = await fetch(`${API_URL}/api/alumnos/${alumnoId}/colegiatura`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: siguienteEstado, mes })
      });
      
      if (!res.ok) {
        throw new Error('Error al actualizar colegiatura');
      }

      await fetchData();
    } catch (error) {
      console.error('Error al actualizar colegiatura:', error);
    }
  };

  // Función para calcular los pagos X y los meses transcurridos n a la fecha actual
  const calcularEstatusAlumno = (cols) => {
    if (!cols || cols.length === 0) return { pagados: 0, n: 0, alDia: true };

    const hoy = new Date();
    const anoActual = hoy.getFullYear();
    const mesActualIdx = hoy.getMonth();

    let transcurridos = 0;
    let pagados = 0;

    const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    cols.forEach((col) => {
      if (col.estado === 'Al día') pagados++;

      const partes = col.mes.split(' ');
      const nombreMes = partes[0];
      const anoReg = partes[1] ? parseInt(partes[1]) : anoActual;
      const idxMesReg = nombresMeses.indexOf(nombreMes);

      if (idxMesReg !== -1) {
        if (anoReg < anoActual || (anoReg === anoActual && idxMesReg <= mesActualIdx)) {
          transcurridos++;
        }
      }
    });

    const n = transcurridos > 0 ? transcurridos : cols.length;
    const alDia = pagados >= n;

    return { pagados, n, alDia };
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
              onClick={() => setActiveTab('atrasados')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'atrasados' ? 'bg-rose-50 text-rose-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-4 w-4 text-rose-600" />
                <span>Colegiaturas Atrasadas</span>
              </div>
              {atrasados.length > 0 && (
                <span className="bg-rose-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {atrasados.length}
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

          {/* DASHBOARD */}
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
          )}

          {/* MATERIAS */}
          {activeTab === 'materias' && (
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
          )}

          {/* PROFESORES */}
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
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${p.activo ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {p.activo ? 'Activo / Pagado' : 'Pendiente'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button onClick={() => toggleEstadoPagoProfesor(p.id, p.activo ? 'Pagado' : 'Pendiente')} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-medium transition">
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

          {/* ALUMNOS (TABLA UNIFICADA X/n) */}
          {activeTab === 'alumnos' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Registro de Alumnos y Colegiaturas</h2>
                  <p className="text-xs text-slate-500">Lista general con seguimiento dinámico de pagos por periodo.</p>
                </div>
                <button onClick={() => setShowAlumnoModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition">
                  <Plus className="h-4 w-4" /> Inscribir Alumno
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Matrícula / Nombre</th>
                      <th className="py-3 px-4">Grado / Grupo</th>
                      <th className="py-3 px-4">Estatus Cumplimiento (X/n)</th>
                      <th className="py-3 px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {alumnos.filter(a => a.nombre && a.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((a) => {
                      const cols = colegiaturasMap[a.id] || [];
                      const { pagados, n, alDia } = calcularEstatusAlumno(cols);

                      return (
                        <tr key={a.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-800 block">{a.nombre}</span>
                            <span className="text-xs text-slate-400 font-mono">{a.matricula}</span>
                          </td>
                          <td className="py-3 px-4">{a.grado} - "{a.grupo}"</td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                              alDia ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {pagados}/{n} Pagados {alDia ? '(Al día)' : '(Con adeudo)'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => setAlumnoSeleccionado(a)}
                              className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1"
                            >
                              <CreditCard className="h-3.5 w-3.5" /> Ver Historial / Pagos
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VISTA: COLEGIATURAS ATRASADAS */}
          {activeTab === 'atrasados' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-rose-600" /> Panel de Colegiaturas Atrasadas
                  </h2>
                  <p className="text-xs text-slate-500">Alumnos con adeudos pendientes y desglose por cobrar.</p>
                </div>
              </div>

              {atrasados.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm">
                  <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
                  ¡Excelente! Todos los alumnos se encuentran al día con sus colegiaturas.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-rose-50 text-rose-900 text-xs uppercase font-semibold border-b border-rose-100">
                      <tr>
                        <th className="py-3 px-4">Alumno / Matrícula</th>
                        <th className="py-3 px-4">Grado</th>
                        <th className="py-3 px-4">Meses Pendientes</th>
                        <th className="py-3 px-4">Monto Total Adeudado</th>
                        <th className="py-3 px-4">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {atrasados.filter(a => a.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                        <tr key={item.alumno_id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-4 font-medium text-slate-800">
                            {item.nombre}
                            <span className="block text-xs font-mono text-slate-400">{item.matricula}</span>
                          </td>
                          <td className="py-3 px-4">{item.grado} - "{item.grupo}"</td>
                          <td className="py-3 px-4">
                            <span className="text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-medium block w-fit mb-1">
                              {item.meses_adeudados} mes(es)
                            </span>
                            <span className="text-xs text-slate-500">{item.lista_meses_pendientes}</span>
                          </td>
                          <td className="py-3 px-4 font-bold text-rose-600 font-mono">
                            ${Number(item.total_adeudado).toLocaleString('es-MX')} MXN
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => {
                                const al = alumnos.find(x => x.id === item.alumno_id);
                                if (al) setAlumnoSeleccionado(al);
                              }}
                              className="text-xs bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg font-medium transition"
                            >
                              Gestionar Pago
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAREAS */}
          {activeTab === 'tareas' && (
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
          )}
        </main>
      </div>

      {/* MODAL: HISTORIAL DE COLEGIATURAS POR ALUMNO (CORREGIDO) */}
      {alumnoSeleccionado && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 space-y-4 shadow-xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Historial de Colegiaturas</h3>
                <p className="text-xs text-slate-500">{alumnoSeleccionado.nombre} • Matrícula: {alumnoSeleccionado.matricula}</p>
              </div>
              <button onClick={() => setAlumnoSeleccionado(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 pr-1 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(colegiaturasMap[alumnoSeleccionado.id] || []).map((col) => (
                  <div key={col.mes} className="p-3 border border-slate-200 rounded-lg flex items-center justify-between bg-slate-50/50">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{col.mes}</p>
                      <p className="text-xs text-slate-500 font-mono">${Number(col.monto).toLocaleString('es-MX')} MXN</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        col.estado === 'Al día' ? 'bg-emerald-100 text-emerald-800' :
                        col.estado === 'Pendiente' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {col.estado}
                      </span>
                      <button
                        onClick={() => cambiarEstadoColegiatura(alumnoSeleccionado.id, col.mes, col.estado)}
                        className="text-[11px] bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 px-2 py-1 rounded transition"
                      >
                        Cambiar Estado
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button onClick={() => setAlumnoSeleccionado(null)} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INSCRIBIR ALUMNO */}
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
      )}

      {/* MODALES MATERIA Y TAREA */}
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
