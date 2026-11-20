// Variante de solo lectura del detalle de pedido de Ropa v2.
import { esc, qs, qsa } from "../ui/dom.js";
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
      thumb: foto ? `<img class="dthumb" src="${esc(foto)}" alt="">` : `<div class="dthumb">${svgCategoria(i.categoria)}</div>`,
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
  if (dstack) {
    /* Abanico tipo carta: thumb arriba y texto abajo, rotación suave (tope 4°),
       tarjetas ~120–150px de ancho por ~110–140px de alto. La seleccionada sube y
       crece sin desbordar: el alto del stack se mide contra la caja ya rotada. */
    const ROT_MAX = 4;            /* tope duro, Nico pidió ~3° con máximo 4° */
    const CARD_W = 132;           /* ancho base en el rango 120–150 */
    const CARD_H = 122;           /* alto base en el rango 110–140 */
    const CRECE = 12;             /* px extra de ancho/alto al seleccionar */
    const SUBE = 14;              /* px que sube la seleccionada */
    const SOLAPE = 34;            /* solapamiento entre cartas */
    const relayout = () => {
      const cs = [...dstack.querySelectorAll(".dcard")];
      const n = cs.length;
      if (!n) return;
      const anchoCaja = dstack.clientWidth || CARD_W * 3;
      const anchoSel = CARD_W + CRECE;
      const rotMax = n > 1 ? Math.min(ROT_MAX, 9 / (n - 1)) : 0;
      /* ancho total: cartas + solapes + la proyección horizontal de la rotación */
      const paso = Math.min(CARD_W - SOLAPE, Math.max(18, (anchoCaja - anchoSel - 24) / Math.max(1, n - 1)));
      const projX = (CARD_H / 2) * Math.abs(Math.sin(rotMax * Math.PI / 180));
      const total = CARD_W + paso * (n - 1) + projX * 2 + CRECE;
      const escala = total > anchoCaja ? anchoCaja / total : 1;
      const off = paso * escala;
      const w = (CARD_W * escala) | 0;
      const h = (CARD_H * escala) | 0;
      const grow = CRECE * escala;
      const grados = i => (i - (n - 1) / 2) * rotMax;
      /* Centrado del conjunto: se mide la caja rotada de cada carta (con su
         proyección horizontal exacta) y se desplaza todo el abanico para que su
         bounding box quede centrada en el canal. Se calcula con la geometría base
         (sin contar el crecimiento de la seleccionada) para que al tocar una carta
         el conjunto no salte: la seleccionada crece alrededor de su propio centro. */
      let minX = Infinity, maxX = -Infinity;
      cs.forEach((_, i) => {
        const th = grados(i) * Math.PI / 180;
        const cx = i * off + w / 2;
        const semi = (Math.abs(w * Math.cos(th)) + Math.abs(h * Math.sin(th))) / 2;
        minX = Math.min(minX, cx - semi);
        maxX = Math.max(maxX, cx + semi);
      });
      const shiftX = (anchoCaja - (maxX - minX)) / 2 - minX;
      cs.forEach((c, i) => {
        const sel = c.classList.contains("sel");
        const rot = grados(i);
        const th = rot * Math.PI / 180;
        const yBase = Math.abs(i - (n - 1) / 2) * 1.2;
        const y = sel ? -SUBE : yBase;
        c.style.width = (w + (sel ? grow : 0)) + "px";
        c.style.height = (h + (sel ? grow : 0)) + "px";
        c.style.transformOrigin = "50% 50%";
        c.style.transform = `translate(${shiftX + i * off}px, ${y}px) rotate(${rot}deg)`;
        c.style.zIndex = sel ? 120 : i + 2;
        /* compensa la proyección vertical de la rotación para no recortar esquinas */
        const alto = h + (sel ? grow : 0);
        const hProy = Math.abs(w * Math.sin(th)) + alto * Math.cos(th);
        c.style.marginTop = Math.max(0, (hProy - alto) / 2) + "px";
      });
      /* alto del stack medido contra su caja, con respiro para la que sobresale */
      const base = dstack.getBoundingClientRect().top;
      let bottom = 0;
      cs.forEach(c => { bottom = Math.max(bottom, c.getBoundingClientRect().bottom); });
      dstack.style.height = Math.ceil(bottom - base + 18) + "px";
    };
    relayout();
    let sel = null;
    qsa(".dcard", dstack).forEach(c => {
      c.onclick = () => {
        c.focus({ preventScroll: true });
        if (sel === c) { abrirLightbox(c.dataset.ph); return; }
        qsa(".dcard", dstack).forEach(x => { x.classList.remove("sel"); x.setAttribute("aria-pressed", "false"); });
        c.classList.add("sel"); c.setAttribute("aria-pressed", "true"); sel = c; relayout();
      };
      c.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); c.click(); } };
    });
    setTimeout(relayout, 60);
  }

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
    <div class="dcard" role="button" tabindex="0" aria-pressed="false" aria-label="Seleccionar {{label}}" data-ph="{{ph}}">
      {{thumb}}
      <div class="dcard-txt">
        <div class="dprecio monto">{{precio}}</div>
        <div class="dnombre contenedor-texto">{{nombre}}</div>
      </div>
    </div>`;

const BLOQUE_CUOTAS = `
      <div class="barra-cuotas barra-det" data-r="{{r}}"><div class="relleno"></div></div>
      <div class="cuotas-ctrl">
        <div class="cuotas-mid">Pagó <b>{{pagadas}} de {{cuotas}}</b></div>
      </div>`;
