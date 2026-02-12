// Modelo de Sobre Nosotros: concentra contenido y estructura de negocio de la pagina.

export type AboutPillar = {
  title: string;
  description: string;
};

export type AboutTimelineItem = {
  phase: string;
  text: string;
};

export type AboutModel = {
  badge: string;
  title: string;
  subtitle: string;
  mission: string;
  vision: string;
  values: string[];
  pillars: AboutPillar[];
  timeline: AboutTimelineItem[];
  ctaTitle: string;
  ctaText: string;
};

export const aboutModel: AboutModel = {
  badge: "SERCOMIN | SOBRE NOSOTROS",
  title: "Especialistas en maquinaria y refacciones industriales",
  subtitle:
    "Acompanamos a la industria con soluciones tecnicas en suministro, fabricacion y mantenimiento para mejorar disponibilidad de equipos criticos.",
  mission:
    "Entregar soluciones industriales confiables que reduzcan riesgos de paro y eleven el rendimiento operativo de nuestros clientes.",
  vision:
    "Ser un aliado tecnico referente en Mexico por capacidad de respuesta, calidad de ejecucion y enfoque en continuidad operativa.",
  values: [
    "Compromiso con tiempos de respuesta reales",
    "Calidad tecnica en cada intervencion",
    "Seguridad en planta como prioridad",
    "Mejora continua basada en datos",
  ],
  pillars: [
    {
      title: "Ingenieria aplicada",
      description:
        "Analizamos condiciones reales de operacion para proponer soluciones viables y sostenibles.",
    },
    {
      title: "Suministro estrategico",
      description:
        "Aseguramos refacciones clave para mantener lineas productivas en funcionamiento.",
    },
    {
      title: "Ejecucion en campo",
      description:
        "Implementamos servicios tecnicos y ajustes con enfoque en seguridad, precision y rapidez.",
    },
  ],
  timeline: [
    {
      phase: "Diagnostico",
      text: "Levantamiento tecnico y definicion de criticidad de equipos.",
    },
    {
      phase: "Planeacion",
      text: "Propuesta con alcance, materiales, tiempos y riesgos controlados.",
    },
    {
      phase: "Implementacion",
      text: "Fabricacion, suministro o servicio con supervision tecnica.",
    },
    {
      phase: "Seguimiento",
      text: "Cierre documental y recomendaciones para estabilidad operativa.",
    },
  ],
  ctaTitle: "Trabajamos como extension tecnica de tu operacion",
  ctaText:
    "Si tu planta requiere soporte en maquinaria, refacciones o mantenimiento especializado, coordinamos una propuesta alineada a tu proceso.",
};
