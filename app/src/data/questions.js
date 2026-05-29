export const SEGMENTS = [
  {
    id: 1,
    label: "Identificación y\ncaracterización\nde ambientes",
    color: "#1a9dc4",
    darkColor: "#0e6b8a",
    images: [
      {
        id: "img1",
        nombre: "CAPAS DE INFORMACIÓN",
        imageName: "CAPAS DE INFORMACION",
        preguntas: [
          {
            texto: "¿Qué información muestra un mapa de rendimiento?",
            opciones: [
              "Humedad ambiental en distintas zonas",
              "Rendimiento del cultivo en distintas zonas",
              "Temperatura del suelo en distintas zonas",
            ],
            correcta: 1,
          },
          {
            texto: "¿Qué información nos brinda el NDVI (Índice de Vegetación de Diferencia Normalizada)?",
            opciones: [
              "Vigor vegetativo del cultivo",
              "Zonas anegadas del lote",
              "Rendimiento del cultivo",
            ],
            correcta: 0,
          },
          {
            texto: "¿Qué otra capa de información sirve para ambientar un lote?",
            opciones: [
              "Historial de rendimiento",
              "Altimetría del lote",
              "Precipitaciones del campo",
            ],
            correcta: 1,
          },
        ],
      },
      {
        id: "img2",
        nombre: "CHEQUEO DE AMBIENTACIÓN A CAMPO",
        imageName: "CHEQUEO DE AMBIENTE A CAMPO",
        preguntas: [
          {
            texto: "¿Qué significa ambientar un lote?",
            opciones: [
              "Hacer una recorrida para ver plagas",
              "Dividir zonas con distinto potencial",
              "Poner música en el campo",
            ],
            correcta: 1,
          },
          {
            texto: "¿Para qué sirve una ambientación?",
            opciones: [
              "Para manejar eficientemente los insumos",
              "Para calibrar la maquinaria",
              "Para determinar el estado del cultivo",
            ],
            correcta: 0,
          },
          {
            texto: "¿Por qué se realiza un chequeo de la ambientación a campo?",
            opciones: [
              "Para medir la materia orgánica",
              "Para determinar las hectáreas del lote",
              "Para validar ambientes productivos",
            ],
            correcta: 2,
          },
        ],
      },
      {
        id: "img3",
        nombre: "AMBIENTACIÓN FINAL",
        imageName: "AMBIENTACION FINAL",
        preguntas: [
          {
            texto: "¿Qué se hace normalmente en QGIS para corregir una ambientación final?",
            opciones: [
              "Ajustar polígonos y eliminar zonas inconsistentes",
              "Cambiar el color del mapa únicamente",
              "Convertir el lote a un archivo Geo PDF",
            ],
            correcta: 0,
          },
          {
            texto: "¿Para qué sirve una ambientación final correctamente ajustada?",
            opciones: [
              "Calcular consumo de gasoil del tractor",
              "Generar prescripciones variables de insumos",
              "Medir velocidad de cosecha",
            ],
            correcta: 1,
          },
          {
            texto: "¿En qué se diferencian principalmente los ambientes dentro de un lote?",
            opciones: [
              "En su productividad y potencial de rendimiento",
              "En los colores del mapa únicamente",
              "En la profundidad de la napa",
            ],
            correcta: 0,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Estrategias de\nManejo por\nAmbientes",
    color: "#1a9dc4",
    darkColor: "#0e6b8a",
    images: [
      {
        id: "img4",
        nombre: "MUESTREO DE SUELOS",
        imageName: "MUESTREO DE SUELOS",
        preguntas: [
          {
            texto: "¿Qué se analiza principalmente en un muestreo de suelo?",
            opciones: [
              "Velocidad de siembra del lote",
              "Disponibilidad de nutrientes y características del suelo",
              "Consumo de combustible de la maquinaria",
            ],
            correcta: 1,
          },
          {
            texto: "¿Qué nutriente suele evaluarse con frecuencia para definir fertilización?",
            opciones: ["Nitrógeno", "Oxígeno", "Calcio"],
            correcta: 0,
          },
          {
            texto: "¿Para qué sirve realizar un muestreo de suelo?",
            opciones: [
              "Calcular el valor de venta del campo",
              "Tomar decisiones de manejo y fertilización más precisas",
              "Medir la velocidad de siembra y cosecha",
            ],
            correcta: 1,
          },
        ],
      },
      {
        id: "img5",
        nombre: "RECOMENDACIÓN DE DENSIDAD Y DOSIS",
        imageName: "RECOMENDACION DE DENSIDAD Y DOSIS",
        preguntas: [
          {
            texto: "¿Qué información se utiliza para definir una recomendación de densidad?",
            opciones: [
              "Cantidad de silo bolsas disponibles",
              "Monitor de la maquinaria",
              "Ambientes del lote y potencial de rendimiento",
            ],
            correcta: 2,
          },
          {
            texto: "¿Qué busca una recomendación variable de fertilización?",
            opciones: [
              "Ajustar la dosis según la necesidad de cada ambiente",
              "Aplicar la misma cantidad en todo el lote",
              "Reducir la velocidad de la sembradora",
            ],
            correcta: 0,
          },
          {
            texto: "¿Qué factor es importante al recomendar un híbrido para un lote?",
            opciones: [
              "Tamaño de la bolsa de semilla",
              "Adaptación del híbrido al potencial del lote",
              "Placas de dosificación de la sembradora",
            ],
            correcta: 1,
          },
        ],
      },
      {
        id: "img6",
        nombre: "PRESCRIPCIONES VARIABLES",
        imageName: "PRESCRIPCIONES VARIABLES",
        preguntas: [
          {
            texto: "¿Qué es una prescripción en agricultura de precisión?",
            opciones: [
              "Un plano de alambrados",
              "Un reporte climático del lote",
              "Un archivo con dosis variables",
            ],
            correcta: 2,
          },
          {
            texto: "¿Dónde se carga normalmente una prescripción?",
            opciones: [
              "En el monitor o consola del tractor",
              "En el cuerpo de siembra",
              "En el dosificador de siembra",
            ],
            correcta: 0,
          },
          {
            texto: "¿Qué se necesita para generar una buena prescripción?",
            opciones: [
              "Solo la superficie del campo",
              "Ambientación y datos agronómicos del lote",
              "Geometrías Rotas",
            ],
            correcta: 1,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Implementación",
    color: "#1a9dc4",
    darkColor: "#0e6b8a",
    images: [
      {
        id: "img7",
        nombre: "LARGADA DE SIEMBRA VARIABLE",
        imageName: "LARGA DE SIEMBRA VARIABLE",
        preguntas: [
          {
            texto: "¿Qué permite la siembra variable?",
            opciones: [
              "Cambiar densidad según ambiente",
              "Comandar la velocidad de la sembradora",
              "Comandar la velocidad del tractor",
            ],
            correcta: 0,
          },
          {
            texto: "¿En qué ambientes se suele usar más densidad?",
            opciones: [
              "Mayor potencial",
              "Lomas arenosas",
              "Bajos inundados siempre",
            ],
            correcta: 0,
          },
          {
            texto: "¿Cuál es uno de los principales beneficios de la siembra variable?",
            opciones: [
              "Reducir el ancho de labor de la sembradora",
              "Mantener siempre la misma densidad en todo el lote",
              "Optimizar el uso de semillas según cada ambiente",
            ],
            correcta: 2,
          },
        ],
      },
      {
        id: "img8",
        nombre: "FERTILIZACIÓN VARIABLE",
        imageName: "FERTILIZACION VARIABLE",
        preguntas: [
          {
            texto: "¿Qué busca la fertilización variable?",
            opciones: [
              "Aplicar igual en todo el lote",
              "Ajustar dosis según necesidad",
              "Gastar más fertilizante",
            ],
            correcta: 1,
          },
          {
            texto: "¿Qué beneficio tiene la fertilización variable?",
            opciones: [
              "Mejor eficiencia",
              "Más consumo de combustible",
              "Más compactación",
            ],
            correcta: 0,
          },
          {
            texto: "¿Qué información se utiliza para definir una fertilización variable?",
            opciones: [
              "Velocidad máxima del tractor",
              "Cantidad de tolvas disponibles",
              "Análisis de suelo y ambientes del lote",
            ],
            correcta: 2,
          },
        ],
      },
      {
        id: "img9",
        nombre: "EVALUACIÓN DE CALIDAD DE SIEMBRA",
        imageName: "EVALUACION DE CALIDAD DE SIEMBRA",
        preguntas: [
          {
            texto: "¿Qué evalúa principalmente una evaluación de calidad de siembra?",
            opciones: [
              "Uniformidad en la distribución de las plantas",
              "Color del híbrido sembrado",
              "Capacidad de la tolva de semillas",
            ],
            correcta: 0,
          },
          {
            texto: "¿Qué significa una desuniformidad temporal en siembra?",
            opciones: [
              "Surcos sembrados torcidos",
              "Plantas que emergen en distintos momentos",
              "Diferencias de color entre hojas",
            ],
            correcta: 1,
          },
          {
            texto: "¿Qué indica un CV (Coeficiente de Variación) bajo en la distancia entre plantas?",
            opciones: [
              "Menor velocidad de la sembradora",
              "Mayor consumo de semillas",
              "Mejor uniformidad espacial de siembra",
            ],
            correcta: 2,
          },
        ],
      },
      {
        id: "img10",
        nombre: "INFORMES DE CALIDAD DE SIEMBRA",
        imageName: "INFORME DE CALIDAD DE SIEMBRA",
        preguntas: [
          {
            texto: "¿Qué decisión puede tomarse a partir de un informe de calidad de siembra?",
            opciones: [
              "Ajustar la velocidad de siembra para mejorar uniformidad",
              "Cambiar la fecha de cosecha automáticamente",
              "Definir el precio del grano",
            ],
            correcta: 0,
          },
          {
            texto: "Si un informe muestra alta desuniformidad espacial, ¿qué podría revisarse?",
            opciones: [
              "Nivel de combustible del tractor",
              "Modelo del monitor de la máquina",
              "Dosificación y funcionamiento de los cuerpos de siembra",
            ],
            correcta: 2,
          },
          {
            texto: "¿Para qué sirve analizar la desuniformidad temporal en un cultivo?",
            opciones: [
              "Medir la humedad del aire",
              "Detectar diferencias de emergencia que afectan rendimiento",
              "Calcular el ancho del lote",
            ],
            correcta: 1,
          },
        ],
      },
      {
        id: "img11",
        nombre: "INFORME DE CONDICIÓN DE CULTIVO",
        imageName: "INFORME DE CONDICIONES DE CULTIVO",
        preguntas: [
          {
            texto: "¿Qué permite detectar un informe de condición de cultivo con NDVI en período crítico?",
            opciones: [
              "El precio futuro del cereal",
              "Sectores con distinto vigor y desarrollo del cultivo",
              "La velocidad de cosecha ideal",
            ],
            correcta: 1,
          },
          {
            texto: "¿Por qué es importante monitorear el NDVI en períodos críticos del cultivo?",
            opciones: [
              "Porque el impacto sobre el rendimiento ya puede ser significativo",
              "Porque mejora automáticamente la fertilización",
              "Porque reemplaza los análisis de suelo",
            ],
            correcta: 0,
          },
          {
            texto: "¿Qué decisión puede tomarse a partir de un informe NDVI en período crítico?",
            opciones: [
              "Priorizar monitoreos o recorridas en zonas problemáticas",
              "Cambiar el híbrido ya implantado",
              "Modificar la textura del suelo",
            ],
            correcta: 0,
          },
        ],
      },
      {
        id: "img12",
        nombre: "COSECHA",
        imageName: "COSECHA",
        preguntas: [
          {
            texto: "¿Por qué es importante calibrar la cosechadora para generar buenos mapas de rendimiento?",
            opciones: [
              "Porque aumenta automáticamente el precio del grano",
              "Porque mejora la precisión de los datos recolectados",
              "Porque reduce el tamaño del lote",
            ],
            correcta: 1,
          },
          {
            texto: "¿Qué puede hacerse con los datos obtenidos en cosecha?",
            opciones: [
              "Generar ambientaciones y tomar decisiones",
              "Cambiar la textura del suelo",
              "Modificar el híbrido ya cosechado",
            ],
            correcta: 0,
          },
          {
            texto: "¿Cuál es el rango de humedad recomendado para cosechar maíz comercialmente?",
            opciones: [
              "Entre 25% y 30%",
              "Menos de 8%",
              "Entre 14% y 15%",
            ],
            correcta: 2,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "Gestión | Análisis\nde campaña",
    color: "#1a9dc4",
    darkColor: "#0e6b8a",
    images: [
      {
        id: "img13",
        nombre: "RECOPILACIÓN Y ANÁLISIS DE DATOS",
        imageName: "RECOPILACION Y ANALISIS DE DATOS",
        preguntas: [
          {
            texto: "¿Cuál es el objetivo principal del análisis de datos de campaña?",
            opciones: [
              "Aumentar la velocidad de cosecha",
              "Evaluar resultados y mejorar decisiones para la próxima campaña",
              "Cambiar automáticamente el clima del lote",
            ],
            correcta: 1,
          },
          {
            texto: "¿Qué beneficio tiene recopilar datos históricos de varias campañas?",
            opciones: [
              "Evitar el uso de monitores de siembra",
              "Reducir automáticamente las malezas",
              "Detectar patrones y mejorar el manejo agronómico",
            ],
            correcta: 2,
          },
          {
            texto: "¿Qué información suele analizarse al finalizar una campaña agrícola?",
            opciones: [
              "Rendimiento, fertilización y calidad de siembra",
              "Performance de la maquinaria",
              "Cantidad de caminos rurales cercanos",
            ],
            correcta: 0,
          },
        ],
      },
      {
        id: "img14",
        nombre: "ANÁLISIS DE RESULTADOS AGRONÓMICOS Y ECONÓMICOS",
        imageName: "ANALISIS DE RESULTADOS AGRONOMICOS Y ECONOMICOS",
        preguntas: [
          {
            texto: "¿Cuál es el objetivo principal del análisis de datos de campaña?",
            opciones: [
              "Evaluar resultados y mejorar decisiones para la próxima campaña",
              "Mejorar la calidad de siembra",
              "Aumentar la velocidad de cosecha",
            ],
            correcta: 0,
          },
          {
            texto: "¿Qué permite calcular un análisis de márgenes por ambiente?",
            opciones: [
              "El precio del grano",
              "La rentabilidad de cada sector del lote",
              "La velocidad máxima de la cosechadora",
            ],
            correcta: 1,
          },
          {
            texto: "¿Por qué es importante relacionar rendimiento con costos?",
            opciones: [
              "Porque el rendimiento define automáticamente el precio del grano",
              "Porque no siempre el ambiente de mayor rendimiento es el más rentable",
              "Porque elimina la necesidad de ambientar",
            ],
            correcta: 1,
          },
        ],
      },
      {
        id: "img15",
        nombre: "REUNIÓN DE ANÁLISIS DE CAMPAÑA CON CLIENTE",
        imageName: "REUNION DE ANALISIS DE CAMAPAÑA CON CLIENTE",
        preguntas: [
          {
            texto: "¿Por qué es importante la reunión final con el cliente después del análisis de campaña?",
            opciones: [
              "Porque reemplaza el monitoreo del cultivo",
              "Porque modifica automáticamente los mapas de rendimiento",
              "Porque permite interpretar resultados y definir mejoras",
            ],
            correcta: 2,
          },
          {
            texto: "¿Cuál es el objetivo principal del análisis de datos de campaña?",
            opciones: [
              "Evaluar resultados y mejorar decisiones para la próxima campaña",
              "Cambiar automáticamente el clima del lote",
              "Aumentar la velocidad de cosecha",
            ],
            correcta: 0,
          },
          {
            texto: "¿Qué información suele analizarse al finalizar una campaña agrícola?",
            opciones: [
              "Color de la maquinaria",
              "Cantidad de caminos rurales cercanos",
              "Rendimiento, fertilización y calidad de siembra",
            ],
            correcta: 2,
          },
        ],
      },
    ],
  },
];
