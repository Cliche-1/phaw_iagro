import type { Prediccion } from '../types';

interface RiskResultsProps {
  prediccion: Prediccion;
  inModal?: boolean;
}

const getSeverityColor = (severidad: string) => {
  switch (severidad) {
    case 'Baja':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'Media':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Alta':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'Crítica':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getProgressBarColor = (probabilidad: number) => {
  if (probabilidad < 25) return 'bg-green-500';
  if (probabilidad < 50) return 'bg-yellow-500';
  if (probabilidad < 75) return 'bg-orange-500';
  return 'bg-red-500';
};

export const RiskResults = ({ prediccion, inModal = false }: RiskResultsProps) => {
  return (
    <div className={`${inModal ? 'p-6' : 'p-6 bg-white rounded-lg border border-gray-300'}`}>
      <div className="mb-6 p-4 bg-gray-50 
                      rounded-xl border border-gray-300">
        <div className="text-sm text-black space-y-2">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p>
              <span className="font-bold text-black">Ubicación:</span>{' '}
              <span className="font-medium">{prediccion.ubicacion.distrito}, {prediccion.ubicacion.provincia}, {prediccion.ubicacion.departamento}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>
              <span className="font-bold text-black">Mes:</span>{' '}
              <span className="font-medium">{prediccion.mes.nombre}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>
              <span className="font-bold text-black">Fecha:</span>{' '}
              <span className="font-medium">{new Date(prediccion.fechaPrediccion).toLocaleDateString('es-PE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-500 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-black">
            Riesgos Agrícolas Detectados
          </h4>
        </div>
        
        {prediccion.riesgos.map((riesgo, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${getSeverityColor(riesgo.severidad)}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-medium text-black text-sm">
                {riesgo.tipo}
              </h5>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(riesgo.severidad)}`}
              >
                {riesgo.severidad}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-black">
                <span>Probabilidad</span>
                <span className="font-semibold">{riesgo.probabilidad}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-300 ${getProgressBarColor(riesgo.probabilidad)}`}
                  style={{ width: `${riesgo.probabilidad}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-300 rounded-lg">
        <p className="text-sm text-black">
          <span className="font-semibold">Nota:</span> Estos resultados son simulados y se generan aleatoriamente. 
          Los datos reales provendrán del modelo de predicción una vez implementado.
        </p>
      </div>
    </div>
  );
};
