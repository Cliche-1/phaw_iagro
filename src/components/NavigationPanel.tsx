import { useState, useEffect } from 'react';
import { departamentosPeru, meses } from '../data/peruData';
import type { Ubicacion, Mes } from '../types';

interface NavigationPanelProps {
  onPredict: (ubicacion: Ubicacion, mes: Mes) => void;
  loading?: boolean;
}

export const NavigationPanel = ({ onPredict, loading = false }: NavigationPanelProps) => {
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState<string>('');
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<string>('');
  const [distritoSeleccionado, setDistritoSeleccionado] = useState<string>('');
  const [mesSeleccionado, setMesSeleccionado] = useState<number>(1);

  const [provinciasDisponibles, setProvinciasDisponibles] = useState<string[]>([]);
  const [distritosDisponibles, setDistritosDisponibles] = useState<string[]>([]);

  // Actualizar provincias cuando cambia el departamento
  useEffect(() => {
    if (departamentoSeleccionado) {
      const departamento = departamentosPeru.find(d => d.nombre === departamentoSeleccionado);
      if (departamento) {
        setProvinciasDisponibles(departamento.provincias.map(p => p.nombre));
        setProvinciaSeleccionada('');
        setDistritoSeleccionado('');
        setDistritosDisponibles([]);
      }
    } else {
      setProvinciasDisponibles([]);
      setProvinciaSeleccionada('');
      setDistritoSeleccionado('');
      setDistritosDisponibles([]);
    }
  }, [departamentoSeleccionado]);

  // Actualizar distritos cuando cambia la provincia
  useEffect(() => {
    if (departamentoSeleccionado && provinciaSeleccionada) {
      const departamento = departamentosPeru.find(d => d.nombre === departamentoSeleccionado);
      if (departamento) {
        const provincia = departamento.provincias.find(p => p.nombre === provinciaSeleccionada);
        if (provincia) {
          setDistritosDisponibles(provincia.distritos);
          setDistritoSeleccionado('');
        }
      }
    } else {
      setDistritosDisponibles([]);
      setDistritoSeleccionado('');
    }
  }, [departamentoSeleccionado, provinciaSeleccionada]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!departamentoSeleccionado || !provinciaSeleccionada || !distritoSeleccionado) {
      alert('Por favor, complete todos los campos de ubicación');
      return;
    }

    const ubicacion: Ubicacion = {
      departamento: departamentoSeleccionado,
      provincia: provinciaSeleccionada,
      distrito: distritoSeleccionado
    };

    const mes = meses.find(m => m.valor === mesSeleccionado);
    if (mes) {
      onPredict(ubicacion, mes);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 bg-gradient-to-r from-indigo-500 to-blue-600 dark:from-indigo-600 dark:to-blue-700 
                      border-b border-indigo-400/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white drop-shadow-md">
            Panel de Navegación
          </h2>
        </div>
        <p className="text-sm text-blue-100">
          Seleccione la ubicación y el mes para la predicción
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white dark:bg-gray-800">
        {/* Selección de Departamento */}
        <div>
          <label htmlFor="departamento" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Departamento
          </label>
          <select
            id="departamento"
            value={departamentoSeleccionado}
            onChange={(e) => setDepartamentoSeleccionado(e.target.value)}
            className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-200 shadow-sm hover:shadow-md
                     font-medium"
            required
          >
            <option value="">Seleccione un departamento</option>
            {departamentosPeru.map((dept) => (
              <option key={dept.nombre} value={dept.nombre}>
                {dept.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de Provincia */}
        <div>
          <label htmlFor="provincia" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Provincia
          </label>
          <select
            id="provincia"
            value={provinciaSeleccionada}
            onChange={(e) => setProvinciaSeleccionada(e.target.value)}
            disabled={!departamentoSeleccionado}
            className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed
                     transition-all duration-200 shadow-sm hover:shadow-md
                     font-medium"
            required
          >
            <option value="">Seleccione una provincia</option>
            {provinciasDisponibles.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de Distrito */}
        <div>
          <label htmlFor="distrito" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Distrito
          </label>
          <select
            id="distrito"
            value={distritoSeleccionado}
            onChange={(e) => setDistritoSeleccionado(e.target.value)}
            disabled={!provinciaSeleccionada}
            className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed
                     transition-all duration-200 shadow-sm hover:shadow-md
                     font-medium"
            required
          >
            <option value="">Seleccione un distrito</option>
            {distritosDisponibles.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de Mes */}
        <div>
          <label htmlFor="mes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Mes
          </label>
          <select
            id="mes"
            value={mesSeleccionado}
            onChange={(e) => setMesSeleccionado(Number(e.target.value))}
            className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-200 shadow-sm hover:shadow-md
                     font-medium"
            required
          >
            {meses.map((mes) => (
              <option key={mes.valor} value={mes.valor}>
                {mes.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de Predicción */}
        <button
          type="submit"
          disabled={loading || !departamentoSeleccionado || !provinciaSeleccionada || !distritoSeleccionado}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
                   disabled:from-gray-400 disabled:to-gray-500
                   text-white font-semibold rounded-xl transition-all duration-200
                   disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generando predicción...</span>
            </span>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generar Predicción</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

