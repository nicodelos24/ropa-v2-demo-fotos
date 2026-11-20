import { qs, qsa } from "./ui/dom.js";
import { vista, emitirVista } from "./estado/vista.js";
import { pintarInventario } from "./pantallas/pantalla-inventario.js";
import { pintarPedidos } from "./pantallas/pantalla-pedidos.js";
import { abrirDetallePedido } from "./pantallas/pantalla-pedido-detalle.js";
import { cerrarHoja, marcarCierrePorBack } from "./ui/componentes/hoja.js";

const main = qs("#main");
const hoja = qs("#hoja");
const search = qs("#search");
const nav = qsa("#nav button");

function render() {
  const inventario = vista.seccion === "inventario";
  qs("#subtitle").textContent = inventario ? "Inventario de productos" : "Catálogo de ventas";
  search.placeholder = inventario ? "Buscar un producto…" : "Buscar un pedido o producto…";
  nav.forEach(button => {
    const activa = button.dataset.v === vista.seccion;
    button.classList.toggle("on", activa);
    button.setAttribute("aria-pressed", String(activa));
  });
  qs("#chips").hidden = inventario;
  if (inventario) pintarInventario(main);
  else pintarPedidos(main, abrirDetallePedido);
}

nav.forEach(button => button.onclick = () => {
  if (vista.seccion === button.dataset.v) return;
  vista.seccion = button.dataset.v;
  vista.filtro = "all";
  vista.busqueda = search.value = "";
  window.scrollTo(0, 0);
  emitirVista();
});
search.oninput = () => { vista.busqueda = search.value; emitirVista(); };
hoja.onclick = e => { if (e.target === hoja) cerrarHoja(); };
window.addEventListener("keydown", e => { if (e.key === "Escape" && !e.defaultPrevented) cerrarHoja(); });
window.addEventListener("popstate", () => {
  if (!hoja.classList.contains("abierta")) return;
  marcarCierrePorBack();
  cerrarHoja();
});
document.addEventListener("demo-vista", render);
render();
