// iconos.js — SVG inline del design system (trazo 1.8, linecap round).
// Todo ícono de UI es SVG propio: cero emojis de texto en la interfaz.
const SVG = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;

export const ICONO = {
  cash: SVG(`<rect x="2.5" y="6" width="19" height="13" rx="2.5"/><circle cx="12" cy="12.5" r="3"/><path d="M6 9.5h.01M18 15.5h.01"/>`),
  check: SVG(`<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5.5"/>`),
  checkSolo: SVG(`<path d="M5 12.5l4.5 4.5L19 7.5"/>`),
  clock: SVG(`<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>`),
  cal: SVG(`<rect x="3" y="4.5" width="18" height="17" rx="3"/><path d="M3 9.5h18M8 2.5v4m8-4v4"/>`),
  lista: SVG(`<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>`),
  tag: SVG(`<path d="M3 11.5V4a1 1 0 0 1 1-1h7.5L21 12.5a1.5 1.5 0 0 1 0 2.1l-6.4 6.4a1.5 1.5 0 0 1-2.1 0L3 11.5z"/><circle cx="7.5" cy="7.5" r="1.4"/>`),
  people: SVG(`<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><path d="M17 8.5a3 3 0 1 1 .5 5.9M17.5 14.5c2.6.3 4 2 4 4.5"/>`),
  plus: SVG(`<path d="M12 5v14M5 12h14"/>`),
  moon: SVG(`<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>`),
  sun: SVG(`<circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2m0 15v2M2.5 12h2m15 0h2M4.8 4.8l1.4 1.4m11.6 11.6 1.4 1.4M19.2 4.8l-1.4 1.4M6.2 17.8l-1.4 1.4"/>`),
  wa: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.05 2.25c-5.4 0-9.78 4.38-9.78 9.78 0 1.72.45 3.34 1.24 4.74L2.25 21.5l4.85-1.27a9.74 9.74 0 0 0 4.95 1.35c5.4 0 9.78-4.38 9.78-9.78s-4.38-9.55-9.78-9.55zm0 17.84c-1.6 0-3.1-.48-4.36-1.3l-.31-.19-3.24.85.86-3.16-.2-.33a8.06 8.06 0 0 1-1.24-4.32c0-4.48 3.65-8.12 8.12-8.12 4.48 0 8.12 3.64 8.12 8.12 0 4.48-3.64 8.45-8.12 8.45z"/><path d="M15.1 13.9c-.15-.08-.9-.45-1.05-.5-.14-.05-.24-.08-.35.07-.1.16-.4.5-.5.6-.09.1-.18.12-.33.04-.15-.07-.63-.23-1.2-.74-.44-.4-.74-.88-.83-1.03-.09-.15-.01-.23.06-.31.07-.07.15-.18.22-.27.08-.09.1-.15.15-.25.05-.1.03-.19-.02-.27-.05-.07-.35-.85-.48-1.16-.13-.31-.26-.27-.35-.27h-.3c-.1 0-.27.04-.4.19-.14.16-.53.52-.53 1.26 0 .74.54 1.46.62 1.56.07.1 1.06 1.62 2.56 2.27.36.16.64.25.85.32.36.11.69.1.95.06.29-.05.9-.37 1.02-.72.13-.36.13-.66.09-.72-.04-.07-.14-.1-.28-.17z"/></svg>`,
  pencil: SVG(`<path d="M4 20l.8-3.2L16.6 5a2 2 0 0 1 2.8 0l-.4-.4a2 2 0 0 1 0 2.8L7.2 19.2 4 20z"/><path d="M14.5 6.5l3 3"/>`),
  trash: SVG(`<path d="M4 7h16M9.5 4h5M6.5 7l.9 13h9.2l.9-13M10 11v5.5M14 11v5.5"/>`),
  x: SVG(`<path d="M6 6l12 12M18 6L6 18"/>`),
  alert: SVG(`<path d="M12 3.5 21.5 20h-19L12 3.5z"/><path d="M12 10v4.5M12 17.2v.3"/>`),
  camera: SVG(`<path d="M8.5 7 10 4.5h4L15.5 7"/><rect x="3" y="7" width="18" height="13" rx="3"/><circle cx="12" cy="13.5" r="3.5"/>`),
  image: SVG(`<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="M4.5 17.5 10 12l4 4 3-3 2.5 2.5"/>`),
  buscar: SVG(`<circle cx="11" cy="11" r="7"/><path d="M20.5 20.5 16 16"/>`),
  logout: SVG(`<path d="M14 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2"/><path d="M9 12h11l-3.5-3.5M20 12l-3.5 3.5"/>`),
  download: SVG(`<path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16"/>`),
  upload: SVG(`<path d="M12 17V5m0 0 4 4m-4-4-4 4M4 19h16"/>`),
  chevIzq: SVG(`<path d="M14.5 5.5 8 12l6.5 6.5"/>`),
  chevDer: SVG(`<path d="M9.5 5.5 16 12l-6.5 6.5"/>`),
  chevDerChico: SVG(`<path d="M9.5 6.5 15 12l-5.5 5.5"/>`),
  chevAbajo: SVG(`<path d="M6.5 9.5 12 15l5.5-5.5"/>`),
  chevArriba: SVG(`<path d="M6.5 14.5 12 9l5.5 5.5"/>`),
  tel: SVG(`<path d="M5.5 3.5h3.6l1.5 4.2-2 1.6a12.5 12.5 0 0 0 5.9 5.9l1.6-2 4.2 1.5v3.6a1.6 1.6 0 0 1-1.8 1.6C10.5 19.3 4.7 13.5 4 5.3a1.6 1.6 0 0 1 1.5-1.8z"/>`),
  flecha: SVG(`<path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5"/>`),
  pedido: SVG(`<path d="M6 2.5h9.5L20 7v14.5H6a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2z"/><path d="M14.5 2.5V7H20M9 12h6M9 16h6"/>`),
  borrar: SVG(`<path d="M4 7h16M9.5 4h5M6.5 7l.9 13h9.2l.9-13"/>`),
  dolar: SVG(`<circle cx="12" cy="12" r="9"/><path d="M14.8 9.2c-.5-1-1.5-1.5-2.8-1.5-1.6 0-2.8.8-2.8 2.1 0 2.9 5.6 1.4 5.6 4.4 0 1.4-1.2 2.2-2.8 2.2-1.4 0-2.5-.6-3-1.7M12 6.2v11.6"/>`),
  paquete: SVG(`<path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5M12 13v9"/>`),
  nota: SVG(`<path d="M5 4.5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1z"/><path d="M8.5 9h7M8.5 12.5h7M8.5 16h4"/>`),
  espejo: SVG(`<path d="M12 3.5 21.5 20h-19L12 3.5z"/>`),
  historial: SVG(`<path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/><path d="M12 8v4l3 2"/>`),
  ajustes: SVG(`<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.1 2.1m10 10l2.1 2.1M19.1 4.9L17 7m-10 10l-2.1 2.1"/>`),
  flask: SVG(`<path d="M10 3h4M10 3v5.5L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 8.5V3"/><path d="M7.5 14.5h9"/>`),
  mega: SVG(`<path d="M3 11v3a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M14.5 8.5a5 5 0 0 1 0 7M17 6a8.5 8.5 0 0 1 0 12"/>`),
};

/* categorías del inventario: íconos SVG por prenda (reemplazo del set emoji) */
export const CAT_SVG = {
  vestido:  SVG(`<path d="M9 3l3 3 3-3M9 3c-1 3.5-2.5 5.5-4.5 7L6 12l-2 8.5c5.2 2 10.8 2 16 0L18 12l1.5-2C17.5 8.5 16 6.5 15 3"/>`),
  top:      SVG(`<path d="M8 3.5 12 6l4-2.5L20 7l-2.5 3V20.5h-11V10L4 7l4-3.5z"/>`),
  pantalon: SVG(`<path d="M7 3h10l1 18h-4.5L12 9.5 10.5 21H6L7 3z"/>`),
  short:    SVG(`<path d="M6.5 3h11L19 15.5h-4.5L12 7l-2.5 8.5H5L6.5 3z"/>`),
  interior: SVG(`<path d="M4 4c0 6 3 8 8 8s8-2 8-8M6.5 4.5 5.5 9M17.5 4.5l1 4.5M10 12l2 3.5L14 12M12 15.5V20"/>`),
  camisa:   SVG(`<path d="M9 3l3 2.5L15 3M9 3 4.5 5.5 6 20.5h12L19.5 5.5 15 3M12 5.5V20"/>`),
  abrigo:   SVG(`<path d="M9 3l3 2.5L15 3M9 3 4.5 5.5 6 20.5h12l1.5-15L15 3M12 5.5V11m0 0-2.5 9.5M12 11l2.5 9.5"/>`),
  media:    SVG(`<path d="M8 3h8v7c0 3-4 4-4 7a3.5 3.5 0 0 1-7 0M16 10c0 3 0 7 0 7M8 6.5h8"/>`),
  otro:     SVG(`<path d="M6 8h12l1.5 12.5h-15L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>`),
};

/* íconos de estados vacíos por sección */
export const VACIO_SVG = {
  buscar: ICONO.buscar,
  pedidos: SVG(`<path d="M6.5 3.5h11L19 20.5H5L6.5 3.5z"/><path d="M9 7.5h6M9 11h6M9 14.5h3.5"/>`),
  contactos: ICONO.people,
  inventario: ICONO.paquete,
  historial: ICONO.historial,
};

/* log del historial: ícono SVG por acción (reemplazo del set emoji de LOG_META) */
export const LOG_SVG = {
  order_new:    { i: ICONO.pedido,  tono: "yellow" },
  order_edit:   { i: ICONO.pencil,  tono: "orange" },
  order_del:    { i: ICONO.trash,   tono: "red" },
  quota:        { i: ICONO.dolar,   tono: "blue" },
  order_paid:   { i: ICONO.check,   tono: "green" },
  inv_new:      { i: ICONO.tag,     tono: "yellow" },
  inv_edit:     { i: ICONO.pencil,  tono: "orange" },
  inv_del:      { i: ICONO.trash,   tono: "red" },
  event_new:    { i: ICONO.cal,     tono: "blue" },
  event_edit:   { i: ICONO.pencil,  tono: "orange" },
  event_del:    { i: ICONO.trash,   tono: "red" },
  client_new:   { i: ICONO.people,  tono: "yellow" },
  client_edit:  { i: ICONO.pencil,  tono: "orange" },
  client_del:   { i: ICONO.trash,   tono: "red" },
  user_switch:  { i: ICONO.espejo,  tono: "neutral" },
  backup:       { i: ICONO.download,tono: "neutral" },
};

/** Mapa id → SVG para categorías del inventario (misma firma de uso que iconoCategoria). */
export function svgCategoria(id) {
  return CAT_SVG[id] || CAT_SVG.otro;
}
