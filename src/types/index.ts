export interface Ubicacion {
  departamento: string;
  provincia: string;
  distrito: string;
}

export interface Mes {
  valor: number;
  nombre: string;
}

export interface RiesgoAgricola {
  tipo: string;
  probabilidad: number; // 0-100
  severidad: 'Baja' | 'Media' | 'Alta' | 'Crítica';
}

export interface Prediccion {
  ubicacion: Ubicacion;
  mes: Mes;
  riesgos: RiesgoAgricola[];
  fechaPrediccion: string;
}

