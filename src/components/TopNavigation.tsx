import { useState } from 'react';

interface TopNavigationProps {
  onNavigate: (section: 'inicio' | 'alertas' | 'reportes') => void;
  onConsultar: () => void;
  activeSection?: 'inicio' | 'alertas' | 'reportes';
}

export const TopNavigation = ({ onNavigate, onConsultar, activeSection = 'inicio' }: TopNavigationProps) => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('inicio')}
              className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
                activeSection === 'inicio'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => onNavigate('alertas')}
              className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
                activeSection === 'alertas'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Alertas
            </button>
            <button
              onClick={() => onNavigate('reportes')}
              className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
                activeSection === 'reportes'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Reportes
            </button>
          </div>
          <button
            onClick={onConsultar}
            className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Consultar
          </button>
        </div>
      </div>
    </nav>
  );
};

