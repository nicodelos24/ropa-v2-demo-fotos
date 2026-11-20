// Filtros, búsquedas y resúmenes (pases de QA de la v1: homónimos $300,
// búsqueda 90/no-match, flechas+contador de filtros, mixto qty2/$0).
import { nombreItem } from "./pedidos.js";

export const FILTROS = [
  { id: "all", label: "Todos", tono: "neutral" },
  { id: "paid", label: "Pagado", tono: "green" },
  { id: "msg", label: "Mensaje enviado", tono: "orange" },
  { id: "due", label: "En cuotas", tono: "blue" },
  { id: "new", label: "Nuevo", tono: "neutral" },
];

/** Conteo por filtro, para las flechas + contador de la franja de chips. */
export function conteoFiltros(pedidos) {
  const c = { all: pedidos.length, new: 0, msg: 0, due: 0, paid: 0 };
  for (const p of pedidos) if (c[p.estado] !== undefined) c[p.estado]++;
  return c;
}

/** Búsqueda por cliente y producto, insensible a acentos y mayúsculas. */
function norm(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

/** Búsqueda por cliente y producto, como la v1 (inclusión, sin tokenizar). */
export function buscarPedidos(pedidos, q) {
  const t = norm(q).trim();
  if (!t) return pedidos;
  return pedidos.filter((p) => {
    const pajar = norm(p.cliente) + " " + (p.items || []).map((i) => norm(nombreItem(i))).join(" ");
    return pajar.includes(t);
  });
}

export function filtrarPorEstado(pedidos, filtro) {
  if (!filtro || filtro === "all") return pedidos;
  return pedidos.filter((p) => p.estado === filtro);
}

/** Resumen de una clienta: pendientes (no paid) y hechos (paid). */
export function resumenCliente(pedidos, clienteId) {
  const propios = pedidos.filter((p) => p.clienteId === clienteId);
  return {
    pedidos: propios,
    pendientes: propios.filter((p) => p.estado !== "paid"),
    hechos: propios.filter((p) => p.estado === "paid"),
  };
}

/** Total facturado y pendiente (para Inicio). */
export function resumenGeneral(pedidos) {
  let cobrado = 0, pendiente = 0;
  for (const p of pedidos) {
    const t = (p.items || []).reduce((s, i) => s + (Number(i.precio ?? i.price) || 0) * (Number(i.qty) || 1), 0);
    if (p.estado === "paid") cobrado += t;
    else pendiente += t;
  }
  return { cobrado, pendiente, pedidos: pedidos.length };
}

/** Días con entregas para el calendario, agrupados por fecha. */
export function entregasPorDia(pedidos) {
  const dias = {};
  for (const p of pedidos) {
    if (!p.fecha) continue;
    (dias[p.fecha] = dias[p.fecha] || []).push(p);
  }
  return dias;
}

export function ordenarPedidos(pedidos) {
  return [...pedidos].sort((a, b) => (b.created || 0) - (a.created || 0));
}
