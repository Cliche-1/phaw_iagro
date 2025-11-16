interface MapContainerProps {
  ubicacion?: {
    departamento: string;
    provincia: string;
    distrito: string;
  };
}

export const MapContainer = ({ ubicacion }: MapContainerProps) => {
  return (
    <div className="h-full w-full bg-white rounded-2xl 
                    border-2 border-gray-300 
                    shadow-lg flex items-center justify-center">
      <div className="text-center p-8">
        <div className="bg-gray-100 p-6 rounded-2xl inline-block mb-4 shadow-md border border-gray-200">
          <svg 
            className="h-20 w-20 text-black" 
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
        <h3 className="text-2xl font-bold text-black mb-3">
          Mapa Interactivo
        </h3>
        {ubicacion ? (
          <div className="bg-gray-50 rounded-xl p-4 shadow-md border border-gray-200">
            <p className="text-sm font-semibold text-black mb-1">Ubicación Seleccionada:</p>
            <p className="text-base text-black font-medium">
              {ubicacion.distrito}, {ubicacion.provincia}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              {ubicacion.departamento}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            Seleccione una ubicación para visualizar en el mapa
          </p>
        )}
      </div>
    </div>
  );
};
