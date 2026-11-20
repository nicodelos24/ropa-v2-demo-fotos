// dom.js — helpers del design system (capa UI; sin lógica de dominio).
export const qs = (sel, root = document) => root.querySelector(sel);
export const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

/** Escapa HTML. */
export function esc(s) {
  return (s ?? "").toString().replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/** Crea elemento con HTML interior. */
export function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}

/** Espacio para el toast cuando la hoja está abierta (UX34: pie accesible). */
export function espacioToast() {
  const t = qs("#toast");
  if (!t) return;
  const visible = t.classList.contains("mostrar") && !t.classList.contains("hoja-oculto");
  t.classList.toggle("hoja-oculto", !visible);
  document.body.style.setProperty("--toast-space", visible ? t.offsetHeight + "px" : "0px");
}
