# Ropa v2 · Demo de fotos

Versión de solo lectura de Inventario, Pedidos y sus detalles a partir de la interfaz de Ropa v2 en `9c47289`. Los productos, pedidos e imágenes JPEG son ficticios. Las vistas y sus recursos se sirven desde este directorio; no usan servicios externos, almacenamiento, datos de la app ni un service worker propio.

Para probarla de manera aislada: `python -m http.server 8769 --bind 127.0.0.1 --directory demo-fotos` y abrir `http://127.0.0.1:8769/`. Tests: `node --test demo-fotos/tests/sitio.test.mjs`.

No publicar bajo `/Aplicacion-ropa/` en el Pages de la app: el `sw.js` de producción controla ese prefijo y agrega el HTML y los recursos de la demo a su caché si el navegador ya visitó la app. Servir este directorio desde un sitio separado, fuera del alcance de ese service worker.
