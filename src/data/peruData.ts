// Datos simplificados de Perú - Departamentos, Provincias y Distritos principales

export interface Departamento {
  nombre: string;
  provincias: Provincia[];
}

export interface Provincia {
  nombre: string;
  distritos: string[];
}

export const departamentosPeru: Departamento[] = [
  {
    nombre: 'Lima',
    provincias: [
      {
        nombre: 'Lima',
        distritos: ['Lima', 'San Isidro', 'Miraflores', 'Surco', 'La Molina', 'Pueblo Libre', 'Magdalena']
      },
      {
        nombre: 'Cañete',
        distritos: ['San Vicente de Cañete', 'Mala', 'Chilca', 'Asia']
      }
    ]
  },
  {
    nombre: 'Cusco',
    provincias: [
      {
        nombre: 'Cusco',
        distritos: ['Cusco', 'San Jerónimo', 'San Sebastián', 'Santiago', 'Wanchaq']
      },
      {
        nombre: 'Urubamba',
        distritos: ['Urubamba', 'Ollantaytambo', 'Chinchero', 'Maras']
      }
    ]
  },
  {
    nombre: 'Arequipa',
    provincias: [
      {
        nombre: 'Arequipa',
        distritos: ['Arequipa', 'Yanahuara', 'Cayma', 'Cerro Colorado', 'Socabaya']
      },
      {
        nombre: 'Caylloma',
        distritos: ['Chivay', 'Cabanaconde', 'Yanque', 'Maca']
      }
    ]
  },
  {
    nombre: 'La Libertad',
    provincias: [
      {
        nombre: 'Trujillo',
        distritos: ['Trujillo', 'Huanchaco', 'Moche', 'Laredo', 'El Porvenir']
      },
      {
        nombre: 'Chepén',
        distritos: ['Chepén', 'Pacanga', 'Pueblo Nuevo']
      }
    ]
  },
  {
    nombre: 'Piura',
    provincias: [
      {
        nombre: 'Piura',
        distritos: ['Piura', 'Castilla', 'Catacaos', 'Veintiséis de Octubre']
      },
      {
        nombre: 'Sullana',
        distritos: ['Sullana', 'Bellavista', 'Querecotillo', 'Salitral']
      }
    ]
  },
  {
    nombre: 'Lambayeque',
    provincias: [
      {
        nombre: 'Chiclayo',
        distritos: ['Chiclayo', 'La Victoria', 'José Leonardo Ortiz', 'Pimentel']
      },
      {
        nombre: 'Lambayeque',
        distritos: ['Lambayeque', 'Mórrope', 'Illimo', 'Túcume']
      }
    ]
  },
  {
    nombre: 'Junín',
    provincias: [
      {
        nombre: 'Huancayo',
        distritos: ['Huancayo', 'Chilca', 'El Tambo', 'Pilcomayo']
      },
      {
        nombre: 'Jauja',
        distritos: ['Jauja', 'Yauyos', 'Matahuasi', 'Sausa']
      }
    ]
  },
  {
    nombre: 'Cajamarca',
    provincias: [
      {
        nombre: 'Cajamarca',
        distritos: ['Cajamarca', 'Baños del Inca', 'Los Baños', 'La Encañada']
      },
      {
        nombre: 'Chota',
        distritos: ['Chota', 'Anguía', 'Chalamarca', 'Chiguirip']
      }
    ]
  },
  {
    nombre: 'Puno',
    provincias: [
      {
        nombre: 'Puno',
        distritos: ['Puno', 'Chucuito', 'Acora', 'Atuncolla']
      },
      {
        nombre: 'Juliaca',
        distritos: ['Juliaca', 'Caracoto', 'San Miguel', 'Cabanilla']
      }
    ]
  },
  {
    nombre: 'Ancash',
    provincias: [
      {
        nombre: 'Huaraz',
        distritos: ['Huaraz', 'Independencia', 'Cochabamba', 'Tarica']
      },
      {
        nombre: 'Carhuaz',
        distritos: ['Carhuaz', 'Marcara', 'Pariahuanca', 'San Miguel de Aco']
      }
    ]
  }
];

export const meses: { valor: number; nombre: string }[] = [
  { valor: 1, nombre: 'Enero' },
  { valor: 2, nombre: 'Febrero' },
  { valor: 3, nombre: 'Marzo' },
  { valor: 4, nombre: 'Abril' },
  { valor: 5, nombre: 'Mayo' },
  { valor: 6, nombre: 'Junio' },
  { valor: 7, nombre: 'Julio' },
  { valor: 8, nombre: 'Agosto' },
  { valor: 9, nombre: 'Septiembre' },
  { valor: 10, nombre: 'Octubre' },
  { valor: 11, nombre: 'Noviembre' },
  { valor: 12, nombre: 'Diciembre' }
];

