export type AppData = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  status: string;
  color: string;
  coverImage: string;
  images: string[];
};

export const apps: AppData[] = [
  {
    slug: "vbstats",
    name: "VBStats",
    tagline: "Estadísticas de voleibol en tiempo real",
    description:
      "Aplicación móvil para el seguimiento detallado de estadísticas de partidos de voleibol. Tracking por jugador, desglose por categoría (ataque, recepción, bloqueo, saque, defensa) y estadísticas por set.",
    longDescription:
      "VBStats es una aplicación móvil desarrollada en React Native que permite a entrenadores y cuerpos técnicos registrar y analizar estadísticas de partidos de voleibol en tiempo real. Cada acción —ataque, recepción, bloqueo, saque o defensa— se registra por jugador y por set, generando informes automáticos al finalizar el partido. La interfaz está diseñada para ser usada durante el juego con una mano, con botones grandes y feedback táctil inmediato. Los datos se sincronizan en la nube y pueden exportarse para análisis posteriores.",
    tags: ["React Native", "Estadísticas", "Deportes", "Tiempo real", "Cloud sync"],
    status: "Activa",
    color: "#E91E8C",
    coverImage: "/vbstats-screenshot.png",
    images: Array.from({ length: 15 }, (_, i) => `/vbstats/${i + 1}.jpeg`),
  },
  {
    slug: "alignme",
    name: "AlignMe",
    tagline: "Gestión de rotaciones para árbitros y entrenadores",
    description:
      "App móvil adoptada por la Federación Asturiana y Balear de Voleibol. Permite gestionar hojas de rotación 6×6 con generación de códigos QR para compartir alineaciones entre equipos en tiempo real.",
    longDescription:
      "AlignMe es la app oficial de rotaciones adoptada por la Federación de Voleibol del Principado de Asturias (FVPA) y la Federació de Voleibol de les Illes Balears (FVBIB). Permite a entrenadores y árbitros gestionar hojas de rotación 6×6 de forma digital, eliminando el papel. Al completar la alineación, la app genera un código QR que el equipo contrario puede escanear para importar la rotación directamente, reduciendo errores y acelerando el inicio de los sets. Desarrollada en React Native y distribuida a través de las federaciones autonómicas.",
    tags: ["React Native", "Voleibol", "QR", "Federaciones", "FVPA", "FVBIB"],
    status: "Federaciones FVPA · FVBIB",
    color: "#0892D0",
    coverImage: "/alignme-screenshot.jpeg",
    images: Array.from({ length: 5 }, (_, i) => `/alignme/${i + 1}.jpeg`),
  },
  {
    slug: "liga-fantasy",
    name: "DreamLeague",
    tagline: "Fútbol fantasy con mercado y ligas privadas",
    description:
      "Plataforma completa de fútbol fantasy con gestión de plantillas, mercado de fichajes entre usuarios y creación de ligas privadas.",
    longDescription:
      "DreamLeague es una plataforma completa de fútbol fantasy desarrollada como proyecto experimental. Incluye gestión de plantillas con presupuesto limitado, un mercado de fichajes en tiempo real entre usuarios de la misma liga, sistema de puntuación automático basado en actuaciones reales, y creación de ligas privadas con invitación por código. El proyecto demostró la capacidad de Bluedebug para construir plataformas con múltiples usuarios, lógica de negocio compleja y sincronización en tiempo real en un plazo muy reducido.",
    tags: ["React Native", "Fútbol", "Fantasy", "Tiempo real", "Mercado"],
    status: "Proyecto concluido",
    color: "#22c55e",
    coverImage: "/dreamleague-screenshot.jpg",
    images: [
      "/dreamleague/1.png",
      "/dreamleague/2.jpg",
      "/dreamleague/3.jpg",
      "/dreamleague/4.jpg",
      "/dreamleague/5.jpg",
      "/dreamleague/6.jpg",
      "/dreamleague/7.jpg",
    ],
  },
];

export function getApp(slug: string): AppData | undefined {
  return apps.find((a) => a.slug === slug);
}
