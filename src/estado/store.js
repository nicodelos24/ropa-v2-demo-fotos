import { buscarPedidos, conteoFiltros, filtrarPorEstado } from "../nucleo/filtros.js";

const inventario = [
  ["campera", "Campera Duna", "abrigo", 43900],
  ["remera", "Remera Bruma", "top", 16900],
  ["vestido", "Vestido Mora", "vestido", 36800],
  ["jean", "Jean Laguna", "pantalon", 32900],
  ["buzo", "Buzo Bosque", "abrigo", 28900],
  ["bolso", "Bolso Arcilla", "otro", 24900],
].map(([id, name, cat, price]) => ({ id, name, cat, price, photo: `fotos/${id}.jpg` }));

const ordenes = [
  ["Envío de muestra A", "due", "2026-11-20", [0, 1, 2]],
  ["Envío de muestra B", "paid", "2026-11-19", [3, 4]],
  ["Envío de muestra C", "new", "2026-11-18", [5, 1]],
].map(([cliente, estado, fecha, indices], i) => ({
  id: `demo-${i + 1}`, cliente, estado, fecha, cuotas: 3, cuotasPagadas: i === 1 ? 3 : i === 0 ? 1 : 0,
  items: indices.map(idx => {
    const { name, price, photo, cat } = inventario[idx];
    return { nombre: name, precio: price, foto: photo, categoria: cat, qty: 1 };
  }),
}));

export const productos = () => inventario;
export const pedidos = () => ordenes;
export const pedidoPorId = id => ordenes.find(p => p.id === id);
export const conteo = () => conteoFiltros(ordenes);
export const pedidosFiltrados = (filtro, busqueda) => buscarPedidos(filtrarPorEstado(ordenes, filtro), busqueda);
