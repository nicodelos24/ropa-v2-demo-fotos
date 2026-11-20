// pedidos.js — dominio puro de pedidos: total, cuotas, estados y transiciones.

export const ESTADOS = {
  new:  { l: "Nuevo",           c: "yellow", t: "nuevo" },
  msg:  { l: "Mensaje enviado", c: "orange", t: "mensaje" },
  due:  { l: "En cuotas",       c: "blue",   t: "cuotas" },
  paid: { l: "Pagado",          c: "green",  t: "pagado" },
};

export const ORDEN_ESTADOS = ["new", "msg", "due", "paid"];

export const FILTROS = [
  ["all",  "Todos",           "neutral"],
  ["paid", "Pagado",          "green"],
  ["msg",  "Mensaje enviado", "orange"],
  ["due",  "En cuotas",       "blue"],
  ["new",  "Nuevo",           "neutral"],
];

export function total(o) {
  return (o.items || []).reduce((s, i) => s + subtotalItem(i), 0);
}

export function totalLista(lista) {
  return (lista || []).reduce((s, o) => s + total(o), 0);
}

export function cuotasDe(o) { return Number(o.cuotas) || 2; }

export function cuotasPagadasDe(o) { return Number(o.cuotasPagadas) || 0; }

/** Cuota +1: el pedido pasa a pagado solo al completar la última. */
export function alPagarCuota(o, delta = 1) {
  const cuotas = cuotasDe(o);
  const pagadas = Math.min(Math.max(cuotasPagadasDe(o) + delta, 0), cuotas);
  return { ...o, cuotasPagadas: pagadas, estado: pagadas >= cuotas ? "paid" : "due" };
}

/** ¿Se llega a pagado con estas cuotas pagadas? */
export function completaCuotas(o) {
  return cuotasPagadasDe(o) >= cuotasDe(o);
}

export function estadoDe(o) { return ESTADOS[o.estado] || ESTADOS.new; }

/** Puntos de agenda por estado (color semántico). */
export function colorEstado(o) { return estadoDe(o).c; }

/** Fija cuotas (2–12) y re-normaliza pagadas al nuevo techo. */
export function setCuotasDe(o, cuotas) {
  const c = cuotasValidas(cuotas);
  return c === null ? null : { ...o, cuotas: c, cuotasPagadas: Math.min(cuotasPagadasDe(o), c) };
}

/* ---- Reglas de transición (P1: confirmación en cambio de estado, piso 0,
   auto-paso a Pagado al completar cuotas) ---- */

export const CUOTAS_MIN = 2;
export const CUOTAS_MAX = 12;
export const ES_ESTADO = (s) => Object.prototype.hasOwnProperty.call(ESTADOS, s);

export function cuotasValidas(n) {
  const i = Math.floor(Number(n));
  return Number.isFinite(i) && i >= CUOTAS_MIN && i <= CUOTAS_MAX ? i : null;
}

export function cuotasPagadasValidas(n, cuotas) {
  const i = Math.floor(Number(n));
  if (!Number.isFinite(i) || i < 0) return 0;
  return Math.min(i, cuotas);
}

export function cuotasCompletas(o) {
  return cuotasPagadasDe(o) >= cuotasDe(o);
}

/** Cambio directo de estado; al pasar a Pagado se sellan las cuotas. */
export function cambiarEstado(o, nuevo) {
  if (!ES_ESTADO(nuevo)) return o;
  const p = { ...o, estado: nuevo };
  if (nuevo === "paid") {
    p.cuotasPagadas = Math.max(cuotasPagadasValidas(p.cuotasPagadas, cuotasDe(p)), cuotasDe(p));
  }
  return p;
}

/** +1/−1 cuota pagada con piso 0; completa la última → paid. */
export function cuotaStep(o, delta) {
  const cuotas = cuotasDe(o);
  const despues = cuotasPagadasValidas(cuotasPagadasDe(o) + delta, cuotas);
  const p = { ...o, cuotasPagadas: despues };
  if (despues >= cuotas) p.estado = "paid";
  return p;
}

/** Estado final al guardar (P1: due completo → paid). */
export function estadoAlGuardar(o) {
  if (o.estado === "due" && cuotasCompletas(o)) return "paid";
  return o.estado;
}

/** ¿La transición pide confirmación explícita? (paid → otro) */
export function requiereConfirmacion(desde, hasta) {
  return desde === "paid" && hasta !== "paid";
}

/** Precio efectivo de un ítem, en v2 (precio) o v1 (price). */
export function precioItem(i) {
  return Number(i && (i.precio !== undefined ? i.precio : i.price)) || 0;
}

/** Nombre efectivo de un ítem, en v2 (nombre) o v1 (name). */
export function nombreItem(i) {
  return String(i && (i.nombre !== undefined ? i.nombre : i.name)) || "";
}

/** Cantidad efectiva (piso 1). */
export function qtyDe(i) {
  const n = Number(i && i.qty);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}

export function subtotalItem(i) {
  return precioItem(i) * qtyDe(i);
}
