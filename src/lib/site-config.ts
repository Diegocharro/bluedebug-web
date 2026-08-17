export const site = {
  name: "Bluedebug",
  domain: "https://bluedebug.com",
  tagline: "Ingeniería de procesos y automatización",
  email: "bluedebug.contact@gmail.com",
  founded: "2025",
  claim:
    "Auditamos el trabajo manual que hace tu equipo, lo medimos en horas y construimos el sistema que lo sustituye.",
  stats: {
    hoursSaved: 40,
    roi: 3.2,
    appsLive: 4,
    federations: 2,
  },
  nav: [
    { label: "El problema", href: "#problema" },
    { label: "Qué hacemos", href: "#servicios" },
    { label: "Método", href: "#metodo" },
    { label: "Calculadora", href: "#calculadora" },
    { label: "Trabajos", href: "#trabajos" },
  ],
} as const;
