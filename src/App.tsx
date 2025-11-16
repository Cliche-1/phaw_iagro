import { useState } from 'react'
import { NavigationPanel } from './components/NavigationPanel'
import { MapContainer } from './components/MapContainer'
import { RiskResults } from './components/RiskResults'
import { Modal } from './components/Modal'
import { TopNavigation } from './components/TopNavigation'
import { simularPrediccion } from './utils/simulacionPrediccion'
import type { Ubicacion, Prediccion } from './types'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [prediccion, setPrediccion] = useState<Prediccion | null>(null)
  const [currentLocation, setCurrentLocation] = useState<Ubicacion | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<'inicio' | 'alertas' | 'reportes'>('inicio')

  const handlePredict = async (ubicacion: Ubicacion, fechaInicio: Date, fechaFin: Date, tipoPrediccion: 'rapida' | 'personalizada') => {
    setLoading(true)
    setCurrentLocation(ubicacion)

    // Simular delay de petición
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Generar predicción simulada (usando el mes de la fecha de inicio)
    const mes = {
      valor: fechaInicio.getMonth() + 1,
      nombre: fechaInicio.toLocaleString('es-ES', { month: 'long' })
    }
    const resultado = simularPrediccion(ubicacion, mes)
    setPrediccion(resultado)
    setLoading(false)
    setIsModalOpen(true)
    
    // Log para debugging (puedes remover esto después)
    console.log('Predicción generada:', { ubicacion, fechaInicio, fechaFin, tipoPrediccion })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    if (prediccion) {
      setIsModalOpen(true)
    }
  }

  const handleNavigate = (section: 'inicio' | 'alertas' | 'reportes') => {
    setActiveSection(section)
    // Aquí puedes agregar lógica adicional para cada sección
  }

  const handleConsultar = () => {
    // Lógica para el botón consultar
    console.log('Consultar clicked')
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-white overflow-hidden">
      {/* Panel de Navegación Superior */}
      <TopNavigation 
        onNavigate={handleNavigate} 
        onConsultar={handleConsultar}
        activeSection={activeSection}
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-300 shadow-sm px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-xl border border-gray-200">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-black">
                Sistema de Predicción de Riesgos Agroclimáticos
              </h1>
            </div>
          </div>
          {prediccion && !isModalOpen && (
            <button
              onClick={handleOpenModal}
              className="px-4 py-2 bg-black hover:bg-gray-800 text-white 
                       font-semibold rounded-lg transition-all duration-200 flex items-center gap-2
                       shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Ver Resultados
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Panel de Navegación (Izquierda) */}
        <aside className="w-[520px] flex-shrink-0 bg-white 
                          border-r border-gray-300 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <NavigationPanel onPredict={handlePredict} loading={loading} />
          </div>
        </aside>

        {/* Mapa (Derecha) */}
        <main className="flex-1 p-6 overflow-hidden bg-white min-w-0">
          <MapContainer ubicacion={currentLocation || undefined} />
        </main>
      </div>

      {/* Modal de Resultados */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title="Resultados de Predicción"
      >
        {prediccion && <RiskResults prediccion={prediccion} inModal={true} />}
      </Modal>
    </div>
  )
}

export default App
