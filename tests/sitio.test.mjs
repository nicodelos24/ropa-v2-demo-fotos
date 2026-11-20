import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";
import { pedidoPorId, pedidos, pedidosFiltrados, productos } from "../src/estado/store.js";

import { nivelCarta } from "../src/pantallas/pantalla-pedido-detalle.js";

const sitio = new URL("../", import.meta.url);

test("la carta activa queda delante y el resto se ordena por cercanía", () => {
  const niveles = (cantidad, activa) => Array.from({ length: cantidad }, (_, i) => nivelCarta(i, activa, cantidad));
  assert.deepEqual(niveles(3, -1), [1, 2, 3]);
  assert.deepEqual(niveles(3, 0), [3, 2, 1]);
  assert.deepEqual(niveles(3, 1), [2, 3, 2]);
  assert.deepEqual(niveles(3, 2), [1, 2, 3]);
  assert.deepEqual(niveles(2, 0), [2, 1]);
  assert.deepEqual(niveles(2, 1), [1, 2]);
  assert.deepEqual(niveles(1, 0), [1]);
  assert.deepEqual(niveles(5, 1), [4, 5, 4, 3, 2]);
});

test("hay seis JPEG sintéticos y los pedidos muestran fotos del inventario", async () => {
  const fotos = new Set(productos().map(p => p.photo));
  assert.equal(fotos.size, 6);
  for (const foto of fotos) {
    assert.match(foto, /^fotos\/[a-z]+\.jpg$/);
    const jpg = await readFile(new URL(foto, sitio));
    assert.equal(jpg.readUInt16BE(0), 0xffd8);
    assert.equal(jpg.readUInt16BE(jpg.length - 2), 0xffd9);
  }
  assert.deepEqual(new Set(pedidos().flatMap(p => p.items.map(i => i.foto))), fotos);
  assert.ok(pedidos().every(p => p.items.length >= 2));
  assert.equal(pedidoPorId(pedidos()[0].id), pedidos()[0]);
  assert.equal(pedidosFiltrados("paid", "laguna").length, 1);
  assert.equal(pedidosFiltrados("due", "laguna").length, 0);
});

test("el sitio sirve solo recursos propios y no llama servicios ni almacenamiento", async () => {
  const archivos = ["index.html", "demo.css", ...(await readdir(new URL("src/", sitio), {recursive: true})).filter(f => /\.(?:css|js)$/.test(f)).map(f => `src/${f}`)];
  for (const archivo of archivos) {
    const url = new URL(archivo, sitio);
    const texto = await readFile(url, "utf8");
    assert.doesNotMatch(texto, /\b(?:serviceWorker|localStorage|sessionStorage|indexedDB|XMLHttpRequest)\b|\bfetch\s*\(|https?:\/\//i, archivo);
    const referencias = archivo.endsWith(".js") ? /\bfrom "([^"]+)"/g
      : archivo.endsWith(".css") ? /url\("([^"]+)"\)/g : /\b(?:src|href)="([^"]+)"/g;
    for (const [, ref] of texto.matchAll(referencias)) {
      if (ref === "data:,") continue;
      const destino = new URL(ref, url);
      assert.ok(destino.href.startsWith(sitio.href), `${archivo}: ${ref}`);
      await readFile(destino);
    }
  }
});
