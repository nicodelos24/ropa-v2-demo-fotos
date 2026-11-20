// hoja.js — hoja inferior con agarre, cierre por gesto (drag hacia abajo) y Escape.
import { qs } from "../dom.js";
import { espacioToast } from "../dom.js";

const hoja = () => qs("#hoja");
const hojaIn = () => qs("#hoja-in");

/* si true, cerrarHoja NO toca history (porque el cierre ya vino del popstate) */
let cerrandoPorBack = false;
/* true mientras la hoja se está cerrando: evita reentrar desde popstate */
let cerrando = false;
let focoAnterior;
const fondo = () => document.querySelectorAll(".topbar, main, nav");
export function marcarCierrePorBack() { cerrandoPorBack = true; }

export function abrirHoja(html) {
  const h = hoja(), hi = hojaIn();
  const yaAbierta = h.classList.contains("abierta");
  if (!yaAbierta) {
    focoAnterior = document.activeElement;
    fondo().forEach(el => { el.inert = true; });
  }
  hi.innerHTML = html;
  hi.scrollTop = 0;
  h.className = "hoja abierta";
  hi.style.transform = "";
  /* registra la apertura como entrada de history para que "atrás" cierre la hoja */
  if (!yaAbierta && !cerrandoPorBack) {
    try { history.pushState({ hoja: 1 }, "", location.href); } catch (e) { /* sin history */ }
  }
  cerrandoPorBack = false;
  espacioToast();
  engancharGesto();
  const foco = hi.querySelector("h2");
  (foco || hi).setAttribute("tabindex", "-1");
  (foco || hi).focus({ preventScroll: true });
}

export function cerrarHoja() {
  const h = hoja();
  if (!h.classList.contains("abierta") || cerrando) return;
  cerrando = true;
  h.classList.add("cerrando");
  setTimeout(() => {
    h.className = "hoja";
    hojaIn().innerHTML = "";
    fondo().forEach(el => { el.inert = false; });
    if (focoAnterior?.isConnected) focoAnterior.focus({ preventScroll: true });
    focoAnterior = null;
    espacioToast();
    cerrando = false;
  }, 180);
  /* sincroniza el botón atrás del móvil: cerrar la hoja consume su entrada de history */
  if (!cerrandoPorBack) {
    try {
      if (history.state && history.state.hoja) history.back();
    } catch (e) { /* sin history */ }
  }
  cerrandoPorBack = false;
}

/* gesto: agarrar la barra y deslizar hacia abajo cierra */
function engancharGesto() {
  const h = hoja(), hi = hojaIn();
  const agarre = hi.querySelector(".agarre");
  if (!agarre) return;
  let y0 = null, dy = 0;
  const inicio = e => { y0 = (e.touches ? e.touches[0].clientY : e.clientY); h.classList.add("arrastrando"); };
  const mover = e => {
    if (y0 == null) return;
    dy = Math.max(0, (e.touches ? e.touches[0].clientY : e.clientY) - y0);
    hi.style.transform = `translateY(${dy}px)`;
    if (e.cancelable && dy > 10) e.preventDefault();
  };
  const soltar = () => {
    if (y0 == null) return;
    h.classList.remove("arrastrando");
    if (dy > 110) { cerrarHoja(); }
    else hi.style.transform = "";
    y0 = null; dy = 0;
  };
  agarre.onpointerdown = e => { agarre.setPointerCapture(e.pointerId); inicio(e); };
  agarre.onpointermove = mover;
  agarre.onpointerup = soltar;
  agarre.onpointercancel = soltar;
}
