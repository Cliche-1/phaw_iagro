import type { Ubicacion, Mes, Prediccion, RiesgoAgricola } from '../types';

// Función para generar un número aleatorio entre min y max
const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Función para determinar la severidad basada en la probabilidad
const obtenerSeveridad = (probabilidad: number): 'Baja' | 'Media' | 'Alta' | 'Crítica' => {
  if (probabilidad < 25) return 'Baja';
  if (probabilidad < 50) return 'Media';
  if (probabilidad < 75) return 'Alta';
  return 'Crítica';
};

// Función para simular la predicción de riesgos agrícolas
export const simularPrediccion = (ubicacion: Ubicacion, mes: Mes): Prediccion => {
  const riesgos: RiesgoAgricola[] = [
    {
      tipo: 'Probabilidad de heladas o bajas extremas de temperatura',
      probabilidad: random(10, 90),
      severidad: 'Baja' // Se actualizará después
    },
    {
      tipo: 'Friaje',
      probabilidad: random(5, 85),
      severidad: 'Baja'
    },
    {
      tipo: 'Granizadas',
      probabilidad: random(15, 80),
      severidad: 'Baja'
    },
    {
      tipo: 'Lluvias torrenciales-desbordamiento de ríos',
      probabilidad: random(20, 95),
      severidad: 'Baja'
    },
    {
      tipo: 'Incendios',
      probabilidad: random(5, 70),
      severidad: 'Baja'
    },
    {
      tipo: 'Predicción de sequías agrícolas',
      probabilidad: random(10, 85),
      severidad: 'Baja'
    },
    {
      tipo: 'Anomalías climáticas-fenómeno del niño',
      probabilidad: random(15, 90),
      severidad: 'Baja'
    }
  ];

  // Actualizar severidad basada en probabilidad
  riesgos.forEach(riesgo => {
    riesgo.severidad = obtenerSeveridad(riesgo.probabilidad);
  });

  return {
    ubicacion,
    mes,
    riesgos,
    fechaPrediccion: new Date().toISOString()
  };
};

