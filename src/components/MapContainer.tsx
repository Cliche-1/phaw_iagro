import { useEffect, useRef } from 'react'
import * as L from 'leaflet'

interface MapContainerProps {
  ubicacion?: {
    departamento: string;
    provincia: string;
    distrito: string;
  };
}

export const MapContainer = ({ ubicacion }: MapContainerProps) => {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const peruBounds = L.latLngBounds(
      L.latLng(-18.5, -81.5),
      L.latLng(-0.5, -68.0)
    )

    mapRef.current = L.map(containerRef.current, {
      center: [-9.189967, -75.015152],
      zoom: 6,
      minZoom: 4,
      maxZoom: 18,
      maxBounds: peruBounds,
      maxBoundsViscosity: 0.7
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current)

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div className="h-full w-full rounded-2xl border-2 border-gray-300 shadow-lg relative overflow-hidden bg-white">
      <div ref={containerRef} className="h-full w-full" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-xl p-4 shadow-md border border-gray-200">
        <h3 className="text-lg font-bold text-black mb-1">Mapa Interactivo</h3>
        {ubicacion ? (
          <div>
            <p className="text-sm font-semibold text-black">Ubicación Seleccionada:</p>
            <p className="text-sm text-black">{ubicacion.distrito}, {ubicacion.provincia}</p>
            <p className="text-xs text-gray-700">{ubicacion.departamento}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-600">Seleccione una ubicación para visualizar en el mapa</p>
        )}
      </div>
    </div>
  )
};
