// ==============================================
// FRONTEND src/
// JAVASCRIPT ORQUESTADOR CENTRAL App.jsx
// ==============================================
import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import API_URL from './config/api';

// Componentes
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Vistas
import DashboardView from './views/DashboardView';
import MateriasView from './views/MateriasView';
import ProfesoresView from './views/ProfesoresView';
import AlumnosView from './views/AlumnosView';
import AtrasadosView from './views/AtrasadosView';
import TareasView from './views/TareasView';

// Modales
import HistorialPagoModal from './modales/HistorialPagoModal';
import AlumnoModal from './modales/AlumnoModal';
import MateriaModal from './modales/MateriaModal';
import TareaModal from './modales/TareaModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const [materias, setMaterias] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [atrasados, setAtrasados] = useState([]);
  const [colegiaturasMap, setColegiaturasMap] = useState({});

  // Estados de Modales
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

  const cargarTodo = useCallback(async (isActive = () => true) => {
    try {
      const [resMat, resProf, resAlum, resTar, resAtrasados] = await Promise.all([
        fetch(`${API_URL}/api/materias`).then(res => res.json()),
        fetch(`${API_URL}/api/profesores`).then(res => res.json()),
        fetch(`${API_URL}/api/alumnos`).then(res => res.json()),
        fetch(`${API_URL}/api/tareas`).then(res => res.json()),
        fetch(`${API_URL}/api/alumnos/atrasadas/listado`).then(res => res.json())
      ]);

      if (!isActive()) return;

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

      if (isActive()) {
        setColegiaturasMap(map);
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  }, []);

  useEffect(() => {
    let montado = true;
    const iniciarCarga = async () => {
      await cargarTodo(() => montado);
    };
    iniciarCarga();
    return () => {
      montado = false;
    };
  }, [cargarTodo]);

  const fetchData = () => cargarTodo();

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
        body: JSON.stringify(nuevaTarea)
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

  const cambiarEstadoColegiatura = async (alumnoId, mes, estadoActual) => {
    const siguienteEstado = estadoActual === 'Al día' ? 'Pendiente' : estadoActual === 'Pendiente' ? 'Atrasado' : 'Al día';
    try {
      const res = await fetch(`${API_URL}/api/alumnos/${alumnoId}/colegiatura`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: siguienteEstado, mes })
      });
      
      if (!res.ok) throw new Error('Error al actualizar colegiatura');
      await fetchData();
    } catch (error) {
      console.error('Error al actualizar colegiatura:', error);
    }
  };

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
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex flex-col md:flex-row gap-6">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          atrasadosCount={atrasados.length} 
        />

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
            <DashboardView 
              alumnos={alumnos} 
              profesores={profesores} 
              materias={materias} 
              colegiaturasMap={colegiaturasMap} 
              calcularEstatusAlumno={calcularEstatusAlumno} 
            />
          )}

          {activeTab === 'materias' && (
            <MateriasView 
              materias={materias} 
              searchTerm={searchTerm} 
              setShowMateriaModal={setShowMateriaModal} 
            />
          )}

          {activeTab === 'profesores' && (
            <ProfesoresView 
              profesores={profesores} 
              searchTerm={searchTerm} 
              toggleEstadoPagoProfesor={toggleEstadoPagoProfesor}
              onRefreshProfesores={fetchData}
            />
          )}

          {activeTab === 'alumnos' && (
            <AlumnosView 
              alumnos={alumnos} 
              searchTerm={searchTerm} 
              colegiaturasMap={colegiaturasMap} 
              calcularEstatusAlumno={calcularEstatusAlumno} 
              setShowAlumnoModal={setShowAlumnoModal} 
              setAlumnoSeleccionado={setAlumnoSeleccionado} 
            />
          )}

          {activeTab === 'atrasados' && (
            <AtrasadosView 
              atrasados={atrasados} 
              searchTerm={searchTerm} 
              alumnos={alumnos} 
              setAlumnoSeleccionado={setAlumnoSeleccionado} 
            />
          )}

          {activeTab === 'tareas' && (
            <TareasView 
              tareas={tareas} 
              setShowTareaModal={setShowTareaModal} 
            />
          )}
        </main>
      </div>

      {/* Modales */}
      <HistorialPagoModal 
        alumnoSeleccionado={alumnoSeleccionado} 
        setAlumnoSeleccionado={setAlumnoSeleccionado} 
        colegiaturasMap={colegiaturasMap} 
        cambiarEstadoColegiatura={cambiarEstadoColegiatura} 
      />

      <AlumnoModal 
        showAlumnoModal={showAlumnoModal} 
        setShowAlumnoModal={setShowAlumnoModal} 
        nuevoAlumno={nuevoAlumno} 
        setNuevoAlumno={setNuevoAlumno} 
        handleAddAlumno={handleAddAlumno} 
      />

      <MateriaModal 
        showMateriaModal={showMateriaModal} 
        setShowMateriaModal={setShowMateriaModal} 
        nuevaMateria={nuevaMateria} 
        setNuevaMateria={setNuevaMateria} 
        handleAddMateria={handleAddMateria} 
      />

      <TareaModal 
        showTareaModal={showTareaModal} 
        setShowTareaModal={setShowTareaModal} 
        nuevaTarea={nuevaTarea} 
        setNuevaTarea={setNuevaTarea} 
        handleAddTarea={handleAddTarea} 
      />
    </div>
  );
}
