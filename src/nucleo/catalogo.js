// Catálogo de categorías del inventario (9, con ícono emoji) y meta de log.
// Datos puros de presentación, sin DOM.

export const CATEGORIAS = [
  { id: "vestido", icono: "👗", label: "Vestido" },
  { id: "top", icono: "👚", label: "Top / Remera" },
  { id: "pantalon", icono: "👖", label: "Pantalón / Leggin" },
  { id: "short", icono: "🩳", label: "Short / Bermuda" },
  { id: "interior", icono: "🩲", label: "Ropa interior" },
  { id: "camisa", icono: "👔", label: "Camisa / Blusa" },
  { id: "abrigo", icono: "🧥", label: "Abrigo / Chaqueta" },
  { id: "media", icono: "🧦", label: "Medias" },
  { id: "otro", icono: "👜", label: "Accesorio / Otro" },
];

export const CATEGORIAS_IDS = CATEGORIAS.map((c) => c.id);
export const CATEGORIA_DEFECTO = "otro";

export function esCategoria(id) {
  return CATEGORIAS_IDS.includes(id);
}

export function categoria(id) {
  return CATEGORIAS.find((c) => c.id === id) || CATEGORIAS[CATEGORIAS.length - 1];
}

export function iconoCategoria(id) {
  return categoria(id).icono;
}

/* ── Log de historial (misma familia de acciones que la v1) ── */
export const LOG_META = {
  order_new: { icono: "🧾", label: "Pedido creado" },
  order_edit: { icono: "✏️", label: "Pedido editado" },
  order_del: { icono: "🗑️", label: "Pedido eliminado" },
  quota: { icono: "💵", label: "Cuota registrada" },
  order_paid: { icono: "✅", label: "Pedido pagado" },
  inv_new: { icono: "👗", label: "Producto agregado" },
  inv_edit: { icono: "✏️", label: "Producto editado" },
  inv_del: { icono: "🗑️", label: "Producto eliminado" },
  event_new: { icono: "📅", label: "Evento agendado" },
  event_edit: { icono: "✏️", label: "Evento editado" },
  event_del: { icono: "🗑️", label: "Evento eliminado" },
  client_new: { icono: "🧑", label: "Cliente creado" },
  client_edit: { icono: "✏️", label: "Cliente editado" },
  client_del: { icono: "🗑️", label: "Cliente eliminado" },
  user_switch: { icono: "🔄", label: "Cambio de cuenta" },
  backup: { icono: "📥", label: "Respaldo" },
};

export const LOG_ACCIONES = Object.keys(LOG_META);
