// moneda.js — parser de precio con gramática validada y formato.
// Corrige por diseño los hallazgos monetarios P1 (UX36-01 / UX35-02):
// rechaza "1.2.3", "12..00", "abc", "-10" y "1e3"; el cero válido se preserva.

export const MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];

const NUMERO = /^\d{1,6}([.,]\d{1,2})?$/;          // 12 | 12.50 | 1.200 (gramática estricta)
const SOLO_DIGITOS = /^\d+$/;

/** Normaliza entrada de precio: "" → null (sin dato), inválido → null, válido → número. */
export function parseMoneda(texto) {
  const t = String(texto ?? "").trim().replace(/\s|\$/g, "");
  if (t === "") return null;
  if (!NUMERO.test(t)) return null;
  const limpio = t.replace(",", ".");
  return Number(limpio);
}

/** ¿La entrada es un precio válido (o vacía)? Para validar al guardar. */
export function esPrecioValido(texto) {
  const t = String(texto ?? "").trim().replace(/\s|\$/g, "");
  return t === "" || NUMERO.test(t);
}

/** Formato $1.234 (es-MX, números tabulares en CSS). */
export function fmt(n) {
  const v = Number(n || 0);
  const tieneDecimales = v % 1 !== 0;
  return "$" + v.toLocaleString("es-MX", tieneDecimales
    ? { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    : { maximumFractionDigits: 0 });
}

/** Monto con decimales solo si existen: $1.234,50 */
export function fmtMonto(n) {
  const v = Number(n || 0);
  return "$" + v.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}
