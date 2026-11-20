import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";
import { pedidoPorId, pedidos, pedidosFiltrados, productos } from "../src/estado/store.js";

const sitio = new URL("../", import.meta.url);

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
