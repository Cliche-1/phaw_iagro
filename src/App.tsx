import { useState } from 'react'
import { NavigationPanel } from './components/NavigationPanel'
import { MapContainer } from './components/MapContainer'
import { RiskResults } from './components/RiskResults'
import { Modal } from './components/Modal'
import { simularPrediccion } from './utils/simulacionPrediccion'
import type { Ubicacion, Mes, Prediccion } from './types'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [prediccion, setPrediccion] = useState<Prediccion | null>(null)
  const [currentLocation, setCurrentLocation] = useState<Ubicacion | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePredict = async (ubicacion: Ubicacion, mes: Mes) => {
    setLoading(true)
    setCurrentLocation(ubicacion)

    // Simular delay de petición
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Generar predicción simulada
    const resultado = simularPrediccion(ubicacion, mes)
    setPrediccion(resultado)
    setLoading(false)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    if (prediccion) {
      setIsModalOpen(true)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-800 dark:via-indigo-800 dark:to-blue-900 
                        shadow-lg border-b border-blue-500/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-md">
                Sistema de Predicción de Riesgos Agroclimáticos
              </h1>
              <p className="text-sm text-blue-100 mt-0.5">
                Análisis inteligente para la agricultura peruana
              </p>
            </div>
          </div>
          {prediccion && !isModalOpen && (
            <button
              onClick={handleOpenModal}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white 
                       font-semibold rounded-lg transition-all duration-200 flex items-center gap-2
                       shadow-lg hover:shadow-xl border border-white/30"
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
      <div className="flex-1 flex overflow-hidden">
        {/* Panel de Navegación (Izquierda) */}
        <aside className="w-96 flex-shrink-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm 
                          border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col overflow-hidden shadow-xl">
          <div className="flex-1 overflow-y-auto">
            <NavigationPanel onPredict={handlePredict} loading={loading} />
          </div>
        </aside>

        {/* Mapa (Derecha) */}
        <main className="flex-1 p-6 overflow-hidden">
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
