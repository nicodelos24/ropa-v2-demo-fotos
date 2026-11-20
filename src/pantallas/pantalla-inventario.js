// Variante de solo lectura de la pantalla de Inventario de Ropa v2.
import { esc, qsa } from "../ui/dom.js";
import { fmt } from "../nucleo/moneda.js";
import { productos } from "../estado/store.js";
import { vista } from "../estado/vista.js";
import { abrirLightbox } from "../ui/componentes/lightbox.js";
import { pintarStats } from "./pantalla-pedidos.js";
import { categoria } from "../nucleo/catalogo.js";
import { VACIO_SVG, svgCategoria } from "../ui/iconos.js";

export function pintarInventario(main) {
  const lista = productos().filter(i => !vista.busqueda || i.name.toLowerCase().includes(vista.busqueda.toLowerCase()));
  pintarStats([{ b: productos().length, s: "Productos" }]);

  if (!lista.length) {
    main.innerHTML = vista.busqueda
      ? `<div class="vacio anim-entra"><div class="viso">${VACIO_SVG.buscar}</div><b>Sin resultados</b><p>Nada coincide con “${esc(vista.busqueda)}”. Probá con otro nombre.</p></div>`
      : `<div class="vacio anim-entra"><div class="viso">${VACIO_SVG.inventario}</div><b>Inventario vacío</b><p>Todavía no hay productos de muestra.</p></div>`;
  } else {
    main.innerHTML = `<div class="inv stagger">${lista.map(i => `
      <div class="inv-card" tabindex="0" role="button" aria-label="Ver foto de ${esc(i.name)}" data-id="${i.id}">
        ${i.photo ? `<img class="inv-foto" src="${esc(i.photo)}" alt="">` : `<div class="inv-ph">${svgCategoria(i.cat)}</div>`}
        <div class="inv-cuerpo"><h4>${esc(i.name)}</h4><p>${fmt(i.price)}${i.cat ? ` · ${esc(categoria(i.cat).label)}` : ""}</p></div>
      </div>`).join("")}</div>`;

    qsa(".inv-card", main).forEach(card => {
      card.onclick = () => {
        card.focus({ preventScroll: true });
        abrirLightbox((productos().find(x => x.id === card.dataset.id) || {}).photo);
      };
      card.onkeydown = e => { if (e.target === card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); card.click(); } };
    });
  }
}
