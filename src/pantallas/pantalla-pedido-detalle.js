// Variante de solo lectura del detalle de pedido de Ropa v2.
import { esc, qs } from "../ui/dom.js";
import { ICONO, svgCategoria } from "../ui/iconos.js";
import { fmt } from "../nucleo/moneda.js";
import { fdateShort } from "../nucleo/fechas.js";
import {
  ESTADOS, total, cuotasDe, cuotasPagadasDe, nombreItem, precioItem, qtyDe,
} from "../nucleo/pedidos.js";
import { pedidoPorId } from "../estado/store.js";
import { abrirHoja, cerrarHoja } from "../ui/componentes/hoja.js";
import { abrirLightbox } from "../ui/componentes/lightbox.js";
import { stackHTML } from "../ui/componentes/stack.js";
import { plantilla } from "../ui/plantilla.js";

/* fracción "pagadas/total" para la barra de cuotas (en 8avos, sin estilo inline) */
function fraccion(pagadas, cuotas, pasos = 24) {
  const p = Math.max(0, Math.min(1, pagadas / cuotas));
  const n = Math.round(p * pasos);
  return n === 0 ? "" : `${n}/24`;
}

export function nivelCarta(indice, activa, cantidad) {
  return activa < 0 ? indice + 1 : cantidad - Math.abs(indice - activa);
}

export function abrirDetallePedido(id) {
  const o = pedidoPorId(id);
  if (!o) return;
  const st = ESTADOS[o.estado] || ESTADOS.new;
  const items = o.items || [];
  const hero = items.find(i => i.foto || i.photo);

  const dcards = items.map(i => {
    const foto = i.foto ?? i.photo;
    return plantilla(DCARD, {
      ph: esc(foto ?? ""),
      thumb: foto ? `<img class="dthumb" src="${esc(foto)}" alt="">` : `<span class="dthumb" aria-hidden="true">${svgCategoria(i.categoria)}</span>`,
      precio: fmt(precioItem(i) * qtyDe(i)),
      nombre: esc(nombreItem(i)) || "Producto",
      label: esc(nombreItem(i)) || "producto",
    });
  }).join("");

  const estados = `<span class="b b-${st.c}">${st.l}</span>`;

  const pagadas = cuotasPagadasDe(o);
  const cuotas = cuotasDe(o);

  abrirHoja(plantilla(HOJA, {
    stack: stackHTML(o),
    cliente: esc(o.cliente) || "Cliente",
    estados,
    fecha: o.fecha ? `<span class="det-fecha">${ICONO.cal} ${fdateShort(o.fecha)}</span>` : "",
    dcards,
    ayuda: (items.length > 1 || hero)
      ? `<p class="ayuda ayuda-izq">Tocá una tarjeta para traerla al frente${hero ? " · otro toque amplía su foto" : ""}</p>` : "",
    total: fmt(total(o)),
    cuotasHtml: o.estado === "due" ? plantilla(BLOQUE_CUOTAS, {
      r: fraccion(pagadas, cuotas),
      pagadas,
      cuotas,
    }) : "",
    icX: ICONO.x,
  }));

  const dstack = qs("#dstack");
  const cartas = [...dstack.querySelectorAll(".dcard")];
  const huecos = cartas.length - 1;
  let activa = -1;
  dstack.style.setProperty("--huecos", Math.max(1, huecos));
  cartas.forEach((c, i) => {
    const lado = i - huecos / 2;
    c.style.setProperty("--lado", lado);
    c.style.setProperty("--giro", `${huecos > 0 ? 8 * lado / huecos : 0}deg`);
    c.style.setProperty("--nivel", nivelCarta(i, activa, cartas.length));
    c.onclick = () => {
      c.focus({ preventScroll: true });
      if (activa === i) { abrirLightbox(c.dataset.ph); return; }
      cartas[activa]?.setAttribute("aria-pressed", "false");
      activa = i;
      c.setAttribute("aria-pressed", "true");
      cartas.forEach((carta, j) => carta.style.setProperty("--nivel", nivelCarta(j, activa, cartas.length)));
    };
  });

  qs("#hClose").onclick = cerrarHoja;
  qs("#dCerrar").onclick = cerrarHoja;
}

const HOJA = `
  <div class="detail">
    <div class="agarre"></div>
    <div class="dclose">
      <span class="demo-marca">Demo · Solo lectura</span>
      <button class="btn-mini" id="hClose" aria-label="Cerrar detalle">{{icX}}</button>
    </div>
    {{stack}}
    <h2 class="contenedor-texto">{{cliente}}</h2>
    <div class="det-est">
      <div class="strow">{{estados}}</div>
      {{fecha}}
    </div>
    <div class="dcards" id="dstack">{{dcards}}</div>
    {{ayuda}}
    <div class="totalbar"><span>Total</span><b class="monto">{{total}}</b></div>
    {{cuotasHtml}}
    <button class="btn btn-ghost" id="dCerrar">Cerrar</button>
  </div>`;

const DCARD = `
    <button type="button" class="dcard" aria-pressed="false" aria-label="Seleccionar {{label}}, {{precio}}" data-ph="{{ph}}">
      {{thumb}}
      <span class="dcard-txt">
        <span class="dprecio monto">{{precio}}</span>
        <span class="dnombre contenedor-texto">{{nombre}}</span>
      </span>
    </button>`;

const BLOQUE_CUOTAS = `
      <div class="barra-cuotas barra-det" data-r="{{r}}"><div class="relleno"></div></div>
      <div class="cuotas-ctrl">
        <div class="cuotas-mid">Pagó <b>{{pagadas}} de {{cuotas}}</b></div>
      </div>`;
