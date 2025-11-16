import { useState, useEffect } from 'react';

interface DateRangePickerProps {
  fechaInicio: Date | null;
  fechaFin: Date | null;
  onFechaInicioChange: (fecha: Date | null) => void;
  onFechaFinChange: (fecha: Date | null) => void;
  onAplicar: () => void;
  onCancelar: () => void;
}

export const DateRangePicker = ({
  fechaInicio,
  fechaFin,
  onFechaInicioChange,
  onFechaFinChange,
  onAplicar,
  onCancelar,
}: DateRangePickerProps) => {
  // Fecha actual (siempre será la fecha de inicio)
  const obtenerFechaActual = () => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return hoy;
  };

  const fechaActual = obtenerFechaActual();
  const [mesActual, setMesActual] = useState(new Date());
  const [fechaFinTemp, setFechaFinTemp] = useState<Date | null>(fechaFin);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  useEffect(() => {
    // Siempre establecer la fecha actual como fecha de inicio
    onFechaInicioChange(fechaActual);
    setFechaFinTemp(fechaFin);
  }, []);

  useEffect(() => {
    setFechaFinTemp(fechaFin);
  }, [fechaFin]);

  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const obtenerDiasDelMes = (fecha: Date) => {
    const año = fecha.getFullYear();
    const mes = fecha.getMonth();
    const primerDia = new Date(año, mes, 1);
    const ultimoDia = new Date(año, mes + 1, 0);
    const diasEnMes = ultimoDia.getDate();
    const diaInicioSemana = primerDia.getDay();

    const dias: (Date | null)[] = [];
    
    // Días vacíos al inicio
    for (let i = 0; i < diaInicioSemana; i++) {
      dias.push(null);
    }
    
    // Días del mes
    for (let i = 1; i <= diasEnMes; i++) {
      dias.push(new Date(año, mes, i));
    }
    
    return dias;
  };

  const esMismaFecha = (fecha1: Date | null, fecha2: Date | null) => {
    if (!fecha1 || !fecha2) return false;
    const d1 = new Date(fecha1);
    const d2 = new Date(fecha2);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return d1.getTime() === d2.getTime();
  };

  const esFechaValida = (fecha: Date) => {
    const hoy = obtenerFechaActual();
    const fechaComparar = new Date(fecha);
    fechaComparar.setHours(0, 0, 0, 0);
    return fechaComparar >= hoy;
  };

  const obtenerDiferenciaDias = (fecha1: Date, fecha2: Date) => {
    const d1 = new Date(fecha1);
    const d2 = new Date(fecha2);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    const diff = d2.getTime() - d1.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const esFechaActual = (fecha: Date) => {
    return esMismaFecha(fecha, fechaActual);
  };

  const esFechaFin = (fecha: Date) => {
    return fechaFinTemp && esMismaFecha(fecha, fechaFinTemp);
  };

  const manejarClickFecha = (fecha: Date) => {
    // No permitir seleccionar la fecha actual (ya está seleccionada)
    if (esFechaActual(fecha)) return;
    
    if (!esFechaValida(fecha)) return;

    // Permitir seleccionar cualquier fecha válida (la validación se hará al presionar "Aplicar")
    // Establecer fecha fin (solo puede haber una)
    setFechaFinTemp(fecha);
  };

  const manejarAplicar = () => {
    if (!fechaFinTemp) {
      alert('Por favor, seleccione la fecha fin para la predicción personalizada');
      return;
    }

    const diferencia = obtenerDiferenciaDias(fechaActual, fechaFinTemp);
    
    if (diferencia < 7) {
      alert('La fecha fin debe ser al menos 7 días después de la fecha actual');
      return;
    }
    
    if (diferencia > 31) {
      alert('La predicción no permite un rango mayor a un mes (31 días)');
      return;
    }

    onFechaInicioChange(fechaActual);
    onFechaFinChange(fechaFinTemp);
    onAplicar();
  };

  const manejarCancelar = () => {
    setFechaFinTemp(fechaFin);
    onCancelar();
  };

  const formatearFecha = (fecha: Date) => {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  const dias = obtenerDiasDelMes(mesActual);

  const mesAnterior = () => {
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() - 1, 1));
  };

  const mesSiguiente = () => {
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 1));
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3">
      <div className="flex gap-4">
        {/* Calendario */}
        <div className="flex-1">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={mesAnterior}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            >
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-base font-semibold text-black">
              {meses[mesActual.getMonth()]} {mesActual.getFullYear()}
            </h3>
            <button
              type="button"
              onClick={mesSiguiente}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            >
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5 mb-1.5">
            {diasSemana.map((dia) => (
              <div key={dia} className="text-center text-xs font-semibold text-black py-1">
                {dia}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5 p-1.5 rounded-lg" style={{ backgroundColor: '#F4F4F4' }}>
            {dias.map((dia, index) => {
              if (!dia) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const esValida = esFechaValida(dia);
              const esActual = esFechaActual(dia);
              const esFin = esFechaFin(dia);
              const esHover = hoverDate && esMismaFecha(dia, hoverDate);

              return (
                <button
                  type="button"
                  key={dia.getTime()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    manejarClickFecha(dia);
                  }}
                  onMouseEnter={() => {
                    if (esValida && !esActual) setHoverDate(dia);
                  }}
                  onMouseLeave={() => setHoverDate(null)}
                  disabled={!esValida || esActual}
                  className={`
                    aspect-square rounded transition-all duration-150
                    flex items-center justify-center text-sm
                    ${!esValida ? 'text-gray-300 cursor-not-allowed opacity-50' : ''}
                    ${esActual ? 'bg-black text-white font-bold cursor-default' : ''}
                    ${esFin ? 'bg-blue-600 text-white font-bold border-2 border-black' : ''}
                  ${!esActual && !esFin && esHover && esValida ? 'bg-[#CFDDFD] text-black border-2 border-black' : ''}
                  ${!esActual && !esFin && !esHover && esValida ? 'hover:bg-[#CFDDFD] hover:border-2 hover:border-black text-black' : ''}
                  `}
                >
                  <span className="text-center leading-none text-sm">{dia.getDate()}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2 justify-end">
            <button
              type="button"
              onClick={manejarCancelar}
              className="px-3 py-1.5 text-sm border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={manejarAplicar}
              className="px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Aplicar
            </button>
          </div>
        </div>

        {/* Leyenda - Integrada en el mismo contenedor */}
        <div className="w-48 flex-shrink-0 border-l border-gray-300 pl-3">
          <h4 className="text-base font-semibold text-black mb-3">Leyenda</h4>
          <div className="space-y-2.5">
            {/* Fecha de Inicio Actual */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-black rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">
                  {fechaActual.getDate()}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-black">Fecha de Inicio</p>
                <p className="text-xs text-gray-600">{formatearFecha(fechaActual)}</p>
              </div>
            </div>

            {/* Fecha de Fin */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 border-2 border-black rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">F</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-black">Fecha de Fin</p>
                <p className="text-xs text-gray-600">
                  {fechaFinTemp ? formatearFecha(fechaFinTemp) : 'No seleccionada'}
                </p>
              </div>
            </div>

            {/* Hover/Navegación */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#CFDDFD] border-2 border-black rounded flex items-center justify-center flex-shrink-0">
                <span className="text-black font-medium text-xs">D</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-black">Navegación</p>
                <p className="text-xs text-gray-600">Al pasar el mouse</p>
              </div>
            </div>

            {/* Información */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-1.5">
                <span className="font-semibold text-black">Rango permitido:</span>
              </p>
              <ul className="text-xs text-gray-600 space-y-0.5 list-disc list-inside">
                <li>Mínimo: 7 días</li>
                <li>Máximo: 31 días</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
