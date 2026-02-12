// Modelo del inicio: define datos base y tipos del dominio de la pagina principal.

export type HomeKpi = {
  label: string;
  value: string;
};

export type HomeService = {
  title: string;
  description: string;
  bullets: string[];
};

export type HomeCategory = {
  name: string;
  summary: string;
};

export type HomeStep = {
  title: string;
  detail: string;
};

export type HomeModel = {
  badge: string;
  title: string;
  subtitle: string;
  kpis: HomeKpi[];
  services: HomeService[];
  categories: HomeCategory[];
  process: HomeStep[];
  ctaTitle: string;
  ctaText: string;
};

// Fuente unica de contenido de negocio para el inicio.
export const homeModel: HomeModel = {
  badge: "SERCOMIN | MAQUINARIA Y REFACCIONES INDUSTRIALES",
  title: "Soluciones industriales para mantener tu operacion en movimiento",
  subtitle:
    "Integramos suministro de refacciones, fabricacion metalmecanica y servicios tecnicos para reducir paros, mejorar rendimiento y asegurar continuidad operativa.",
  kpis: [
    { label: "Atencion", value: "24/7" },
    { label: "Cobertura", value: "Nacional" },
    { label: "Lineas", value: "+120" },
  ],
  services: [
    {
      title: "Refacciones y componentes",
      description:
        "Surtido para transportadores, rodillos, poleas, chumaceras y elementos de transmision.",
      bullets: [
        "Marcas comerciales y equivalencias",
        "Asesoria de seleccion tecnica",
        "Entrega prioritaria para urgencias",
      ],
    },
    {
      title: "Fabricacion y paileria",
      description:
        "Desarrollo y ajuste de piezas especiales para condiciones reales de planta.",
      bullets: [
        "Ingenieria y levantamiento en campo",
        "Fabricacion sobre plano o muestra",
        "Control de calidad dimensional",
      ],
    },
    {
      title: "Servicio y mantenimiento",
      description:
        "Intervenciones enfocadas en confiabilidad: diagnostico, reparacion y puesta a punto.",
      bullets: [
        "Atencion a equipos criticos",
        "Mantenimiento preventivo y correctivo",
        "Recomendaciones de mejora continua",
      ],
    },
  ],
  categories: [
    {
      name: "Bandas y empalmes",
      summary: "Suministro, vulcanizado y reparacion para lineas de transporte continuo.",
    },
    {
      name: "Poleas y rodilleria",
      summary: "Conjuntos motrices y de retorno con opciones para servicio pesado.",
    },
    {
      name: "Chumaceras y soportes",
      summary: "Componentes de soporte para reducir vibracion y desgaste prematuro.",
    },
    {
      name: "Reductores y transmision",
      summary: "Refacciones para torque, velocidad y eficiencia en procesos de carga.",
    },
  ],
  process: [
    {
      title: "1. Diagnostico tecnico",
      detail:
        "Definimos causa raiz, criticidad y alcance con base en datos de operacion.",
    },
    {
      title: "2. Propuesta integral",
      detail:
        "Presentamos una solucion con materiales, tiempos y plan de ejecucion.",
    },
    {
      title: "3. Implementacion en sitio",
      detail:
        "Ejecutamos instalacion o servicio minimizando impacto en produccion.",
    },
    {
      title: "4. Seguimiento y respaldo",
      detail:
        "Documentamos resultados y dejamos ruta de mantenimiento recomendada.",
    },
  ],
  ctaTitle: "Tu operacion necesita continuidad, no improvisacion",
  ctaText:
    "Cuentanos tu necesidad y te proponemos una ruta clara de suministro, fabricacion y servicio para tu planta.",
};
