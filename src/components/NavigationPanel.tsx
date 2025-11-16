import { useState, useEffect } from 'react';
import { departamentosPeru } from '../data/peruData';
import type { Ubicacion } from '../types';
import { DateRangePicker } from './DateRangePicker';

interface NavigationPanelProps {
  onPredict: (ubicacion: Ubicacion, fechaInicio: Date, fechaFin: Date, tipoPrediccion: 'rapida' | 'personalizada') => void;
  loading?: boolean;
}

export const NavigationPanel = ({ onPredict, loading = false }: NavigationPanelProps) => {
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState<string>('');
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<string>('');
  const [distritoSeleccionado, setDistritoSeleccionado] = useState<string>('');
  
  const [fechaActual] = useState<Date>(new Date());
  const [diasSeleccionados, setDiasSeleccionados] = useState<number>(7);
  const [mostrarPersonalizada, setMostrarPersonalizada] = useState<boolean>(false);
  const [mostrarCalendario, setMostrarCalendario] = useState<boolean>(false);
  const [fechaInicioPersonalizada, setFechaInicioPersonalizada] = useState<Date | null>(null);
  const [fechaFinPersonalizada, setFechaFinPersonalizada] = useState<Date | null>(null);
  const [fechaPersonalizadaAplicada, setFechaPersonalizadaAplicada] = useState<boolean>(false);

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

  const formatearFecha = (fecha: Date): string => {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  const calcularFechaFin = (fechaInicio: Date, dias: number): Date => {
    const fechaFin = new Date(fechaInicio);
    fechaFin.setDate(fechaFin.getDate() + dias);
    return fechaFin;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!departamentoSeleccionado) {
      alert('Por favor, seleccione un departamento');
      return;
    }
    
    if (!provinciaSeleccionada) {
      alert('Por favor, seleccione una provincia');
      return;
    }
    
    if (!distritoSeleccionado) {
      alert('Por favor, seleccione un distrito');
      return;
    }

    const ubicacion: Ubicacion = {
      departamento: departamentoSeleccionado,
      provincia: provinciaSeleccionada,
      distrito: distritoSeleccionado
    };

    if (fechaPersonalizadaAplicada && fechaInicioPersonalizada && fechaFinPersonalizada) {
      // Usar las fechas personalizadas aplicadas
      onPredict(ubicacion, fechaInicioPersonalizada, fechaFinPersonalizada, 'personalizada');
    } else {
      // Usar el modo rápido con los días seleccionados
      const fechaFin = calcularFechaFin(fechaActual, diasSeleccionados);
      onPredict(ubicacion, fechaActual, fechaFin, 'rapida');
    }
  };

  const opcionesDias = [
    { valor: 7, etiqueta: '7 días' },
    { valor: 15, etiqueta: '15 días' },
    { valor: 30, etiqueta: '1 mes' }
  ];

  // Determinar si el botón "Generar Predicción" debe estar desactivado
  const isGenerarPrediccionDisabled = mostrarPersonalizada && !fechaPersonalizadaAplicada;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gray-100 p-2 rounded-lg">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-black">
            Panel de Navegación
          </h2>
        </div>
        <p className="text-sm text-gray-600">
          Seleccione la ubicación y el período para la predicción
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
        {/* Selección de Departamento */}
        <div>
          <label htmlFor="departamento" className="block text-sm font-medium text-black mb-2">
            Departamento
          </label>
          <select
            id="departamento"
            value={departamentoSeleccionado}
            onChange={(e) => setDepartamentoSeleccionado(e.target.value)}
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl 
                     bg-white text-black
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
          <label htmlFor="provincia" className="block text-sm font-medium text-black mb-2">
            Provincia
          </label>
          <select
            id="provincia"
            value={provinciaSeleccionada}
            onChange={(e) => setProvinciaSeleccionada(e.target.value)}
            disabled={!departamentoSeleccionado}
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl 
                     bg-white text-black
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     disabled:bg-gray-100 disabled:cursor-not-allowed
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
          <label htmlFor="distrito" className="block text-sm font-medium text-black mb-2">
            Distrito
          </label>
          <select
            id="distrito"
            value={distritoSeleccionado}
            onChange={(e) => setDistritoSeleccionado(e.target.value)}
            disabled={!provinciaSeleccionada}
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl 
                     bg-white text-black
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     disabled:bg-gray-100 disabled:cursor-not-allowed
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

        {/* Fecha Actual */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Fecha Actual
          </label>
          <div className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl 
                     bg-gray-50 text-black font-medium">
            {formatearFecha(fechaActual)}
          </div>
        </div>

        {/* Rango de Fechas Personalizado (solo cuando está aplicado) */}
        {fechaPersonalizadaAplicada && fechaInicioPersonalizada && fechaFinPersonalizada && (
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Período de Predicción
            </label>
            <div className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl 
                     bg-gray-50 text-black font-medium">
              {formatearFecha(fechaInicioPersonalizada)} - {formatearFecha(fechaFinPersonalizada)}
            </div>
          </div>
        )}

        {/* Selector de Días (solo cuando NO hay predicción personalizada aplicada) */}
        {!fechaPersonalizadaAplicada && (
          <div>
            <label htmlFor="dias" className="block text-sm font-medium text-black mb-2">
              Período de Predicción
            </label>
            <select
              id="dias"
              value={diasSeleccionados}
              onChange={(e) => setDiasSeleccionados(Number(e.target.value))}
              disabled={mostrarPersonalizada}
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl 
                       bg-white text-black
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       disabled:bg-gray-100 disabled:cursor-not-allowed
                       transition-all duration-200 shadow-sm hover:shadow-md
                       font-medium"
              required
            >
              {opcionesDias.map((opcion) => (
                <option key={opcion.valor} value={opcion.valor}>
                  {opcion.etiqueta}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Toggle Predicción Personalizada */}
        <div>
          <div className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-xl bg-white">
            <label htmlFor="prediccion-personalizada" className="text-sm font-medium text-black cursor-pointer">
              Predicción Personalizada
            </label>
            <button
              type="button"
              onClick={() => {
                const nuevoEstado = !mostrarPersonalizada;
                setMostrarPersonalizada(nuevoEstado);
                
                // Si se desactiva, limpiar las fechas aplicadas y ocultar calendario
                if (!nuevoEstado) {
                  setFechaPersonalizadaAplicada(false);
                  setFechaInicioPersonalizada(null);
                  setFechaFinPersonalizada(null);
                  setMostrarCalendario(false);
                } else {
                  // Si se activa, mostrar el calendario
                  setMostrarCalendario(true);
                }
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                mostrarPersonalizada ? 'bg-black' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  mostrarPersonalizada ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Botón de despliegue del calendario (solo cuando el modo está activo y el calendario está oculto) */}
          {mostrarPersonalizada && !mostrarCalendario && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setMostrarCalendario(true)}
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl 
                         bg-white text-black font-medium
                         hover:bg-gray-50 transition-all duration-200
                         flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Mostrar Calendario</span>
              </button>
            </div>
          )}

          {/* Calendario (solo cuando está visible) */}
          {mostrarPersonalizada && mostrarCalendario && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <DateRangePicker
                fechaInicio={fechaActual}
                fechaFin={fechaFinPersonalizada}
                onFechaInicioChange={() => {
                  // La fecha de inicio siempre es la actual, no se puede cambiar
                }}
                onFechaFinChange={setFechaFinPersonalizada}
                onAplicar={() => {
                  // Aplicar la fecha y ocultar el calendario
                  if (fechaFinPersonalizada) {
                    // Establecer también la fecha de inicio (siempre es la actual)
                    setFechaInicioPersonalizada(fechaActual);
                    setFechaPersonalizadaAplicada(true);
                    setMostrarCalendario(false);
                  }
                }}
                onCancelar={() => {
                  // Si no hay fecha aplicada, desactivar el modo
                  if (!fechaPersonalizadaAplicada) {
                    setMostrarPersonalizada(false);
                    setFechaInicioPersonalizada(null);
                    setFechaFinPersonalizada(null);
                  } else {
                    // Si hay fecha aplicada, solo ocultar el calendario y restaurar la fecha aplicada
                    setFechaFinPersonalizada(fechaFinPersonalizada);
                  }
                  setMostrarCalendario(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Botón de Predicción */}
        <button
          type="submit"
          disabled={loading || isGenerarPrediccionDisabled}
          className={`w-full py-3 px-4 font-semibold rounded-xl transition-all duration-200
                   shadow-lg hover:shadow-xl transform hover:scale-[1.02]
                   focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                   flex items-center justify-center gap-2
                   ${
                     loading || isGenerarPrediccionDisabled
                       ? 'bg-gray-400 text-white cursor-not-allowed'
                       : 'bg-black hover:bg-gray-800 text-white'
                   }`}
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
