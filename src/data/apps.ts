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
  /** Encuadre de las capturas: móvil en vertical o web en horizontal. */
  orientation: "portrait" | "landscape";
  /** `contain` para logos y capturas que no deben recortarse. */
  coverFit?: "cover" | "contain";
  images: string[];
  link?: { label: string; href: string };
};

export const apps: AppData[] = [
  {
    slug: "club-voleibol-oviedo",
    name: "Club Voleibol Oviedo",
    tagline: "La web del club, de la cantera a Superliga 2",
    description:
      "Web completa del Club Voleibol Oviedo: equipos, calendario de competición actualizado solo, noticias, tienda, inscripciones y un escaparate para patrocinadores.",
    longDescription:
      "El club llegaba a cada temporada repartiendo información por WhatsApp y redes: horarios que cambiaban, familias preguntando lo mismo veinte veces y patrocinadores sin ningún sitio donde ver qué recibían a cambio. Construimos la web del club en React y Vite, con los datos de competición actualizándose de forma automática desde las federaciones, tres formularios que llegan directos al buzón correcto (contacto, patrocinio e inscripción) y una sección de patrocinadores pensada como argumento de venta y no como un listado de logos. Está desplegada y en uso por el club.",
    tags: ["React", "Vite", "Web a cliente", "Datos automáticos", "Formularios"],
    status: "En producción · clubvoleiboloviedo.com",
    color: "#0B6EB4",
    coverImage: "/cvo/01.png",
    orientation: "landscape",
    // Sin galería a propósito: para una web, entrar a verla vale más que once capturas.
    images: [],
    link: { label: "clubvoleiboloviedo.com", href: "https://clubvoleiboloviedo.com" },
  },
  {
    slug: "alignme",
    name: "AlignMe",
    tagline: "Rotaciones de voleibol para árbitros y entrenadores",
    description:
      "App móvil adoptada por la Federación Asturiana y la Balear de Voleibol. Gestiona hojas de rotación 6×6 y genera códigos QR para pasar la alineación al equipo contrario al momento.",
    longDescription:
      "AlignMe es la app oficial de rotaciones adoptada por la Federación de Voleibol del Principado de Asturias (FVBPA) y la Federació de Voleibol de les Illes Balears (FVBIB). Entrenadores y árbitros gestionan las hojas de rotación 6×6 en digital, sin papel. Al cerrar la alineación la app genera un QR que el equipo contrario escanea para importarla directamente, lo que quita errores de transcripción y acelera el arranque de cada set. Desarrollada en React Native y distribuida a través de las federaciones autonómicas.",
    tags: ["React Native", "Voleibol", "QR", "Federaciones", "FVBPA", "FVBIB"],
    status: "Federaciones FVBPA · FVBIB",
    color: "#0892D0",
    coverImage: "/alignme-screenshot.jpeg",
    orientation: "portrait",
    images: Array.from({ length: 5 }, (_, i) => `/alignme/${i + 1}.jpeg`),
  },
  {
    slug: "vbstats",
    name: "VBStats",
    tagline: "Estadísticas de voleibol en tiempo real",
    description:
      "App móvil para seguir las estadísticas de un partido de voleibol mientras se juega. Registro por jugador, por acción y por set, con informes automáticos al acabar.",
    longDescription:
      "VBStats es una aplicación móvil en React Native que permite a entrenadores y cuerpos técnicos registrar y analizar estadísticas de voleibol en tiempo real. Cada acción —ataque, recepción, bloqueo, saque o defensa— se registra por jugador y por set, y al terminar el partido se generan los informes solos. La interfaz está pensada para usarse con una mano durante el juego: botones grandes y respuesta táctil inmediata. Los datos se sincronizan en la nube y se pueden exportar para analizarlos después.",
    tags: ["React Native", "Estadísticas", "Deportes", "Tiempo real", "Cloud sync"],
    status: "Producto propio · activo",
    color: "#E91E8C",
    coverImage: "/vbstats-screenshot.png",
    orientation: "portrait",
    images: Array.from({ length: 15 }, (_, i) => `/vbstats/${i + 1}.jpeg`),
  },
  {
    slug: "cokitchen",
    name: "CoKitchen",
    tagline: "El inventario compartido de la cocina de casa",
    description:
      "App móvil para saber qué hay en casa, qué está a punto de caducar y qué falta comprar, con la lista sincronizada entre todos los que viven allí.",
    longDescription:
      "CoKitchen nació de un problema doméstico y muy repetido: nadie sabe qué hay en la nevera, se compra dos veces lo mismo y se tira comida caducada. La app mantiene un inventario compartido entre las personas que conviven, avisa de lo que está a punto de caducar y arma sola la lista de la compra con lo que falta. Es producto propio, y la captación de los primeros usuarios se hizo con contenido de alto guardado en Instagram y TikTok, sin invertir un euro en publicidad.",
    tags: ["React Native", "Producto propio", "Inventario", "Growth"],
    status: "Producto propio · 2025",
    color: "#5A7D5A",
    coverImage: "/cokitchen-logo.png",
    orientation: "portrait",
    coverFit: "contain",
    images: [],
    link: { label: "instagram.com/cokitchen_app", href: "https://instagram.com/cokitchen_app" },
  },
];

export function getApp(slug: string): AppData | undefined {
  return apps.find((a) => a.slug === slug);
}
