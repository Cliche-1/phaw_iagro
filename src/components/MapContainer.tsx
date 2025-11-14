interface MapContainerProps {
  ubicacion?: {
    departamento: string;
    provincia: string;
    distrito: string;
  };
}

export const MapContainer = ({ ubicacion }: MapContainerProps) => {
  return (
    <div className="h-full w-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl 
                    border-2 border-dashed border-blue-300/50 dark:border-blue-600/30 
                    shadow-xl flex items-center justify-center
                    bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-gray-900/50">
      <div className="text-center p-8">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl inline-block mb-4 shadow-lg">
          <svg 
            className="h-20 w-20 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
          Mapa Interactivo
        </h3>
        {ubicacion ? (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-blue-200/50 dark:border-blue-700/50">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">Ubicación Seleccionada:</p>
            <p className="text-base text-gray-700 dark:text-gray-300">
              {ubicacion.distrito}, {ubicacion.provincia}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {ubicacion.departamento}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Seleccione una ubicación para visualizar en el mapa
          </p>
        )}
      </div>
    </div>
  );
};

