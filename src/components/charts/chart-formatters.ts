// Localizado a es-ES: los ejes y tooltips de los gráficos son de cara al cliente.
export const shortDateFmt = new Intl.DateTimeFormat("es-ES", {
  month: "short",
});

export const weekdayDateFmt = new Intl.DateTimeFormat("es-ES", {
  month: "long",
});

export const hmsTimeFmt = new Intl.DateTimeFormat("es-ES", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

// `Intl.NumberFormat.prototype.format` is a bound getter — safe to extract.
export const intFmt = new Intl.NumberFormat("es-ES").format;
