// lightbox.js — foto ampliada accesible (Tab queda en el botón, Escape cierra).
import { ICONO } from "../iconos.js";

export function abrirLightbox(src) {
  if (!src || document.querySelector(".lightbox")) return;
  const prev = document.activeElement;
  const ov = document.createElement("div");
  ov.className = "lightbox";
  ov.setAttribute("role", "dialog");
  ov.setAttribute("aria-modal", "true");
  ov.setAttribute("aria-label", "Foto ampliada");
  ov.innerHTML = `<span class="demo-marca demo-marca-foto">Demo · Solo lectura</span><button class="lbx" aria-label="Cerrar imagen ampliada">${ICONO.x}</button><img src="${src}" alt="Foto ampliada">`;

  const fondo = [...document.querySelectorAll(".topbar, main, nav, .fab, .hoja")];
  const inertAntes = fondo.map(el => el.inert);
  const overflowAntes = document.body.style.overflow;
  fondo.forEach(el => (el.inert = true));
  document.body.style.overflow = "hidden";

  const cerrar = () => {
    ov.remove();
    document.removeEventListener("keydown", onKey);
    fondo.forEach((el, i) => (el.inert = inertAntes[i]));
    document.body.style.overflow = overflowAntes;
    if (prev && prev.isConnected) prev.focus({ preventScroll: true });
  };
  const onKey = e => {
    if (e.key === "Escape") { e.preventDefault(); cerrar(); }
    if (e.key === "Tab") { e.preventDefault(); ov.querySelector("button").focus(); }
  };
  ov.querySelector("button").onclick = cerrar;
  ov.onclick = e => { if (e.target === ov) cerrar(); };
  document.body.appendChild(ov);
  document.addEventListener("keydown", onKey);
  ov.querySelector("button").focus({ preventScroll: true });
}
