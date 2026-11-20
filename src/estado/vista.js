export const vista = { seccion: "inventario", filtro: "all", busqueda: "" };
export const emitirVista = () => document.dispatchEvent(new Event("demo-vista"));
