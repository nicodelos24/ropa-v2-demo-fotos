// plantilla.js — mini motor de plantillas del design system.
// El markup de cada pantalla vive en una plantilla legible con {{claves}}; acá sólo se rellena.
// Nada de estilos inline en pantallas: el estilo vive en src/ui/**/*.css.
export function plantilla(tpl, datos) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (datos[k] ?? ""));
}

/** Contadores que cuentan (~500 ms). Respeta prefers-reduced-motion. */
export function animarContadores(root) {
  const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.querySelectorAll("[data-cuenta]").forEach(el => {
    const final = Number(el.dataset.cuenta) || 0;
    if (quieto || final === 0) return;
    const formato = el.dataset.formato || "monto";
    const inicio = performance.now();
    const dur = 520;
    const pintar = ahora => {
      const t = Math.min(1, (ahora - inicio) / dur);
      const v = final * (1 - Math.pow(1 - t, 3));          // ease-out cúbico
      el.textContent = formato === "n" ? String(Math.round(v)) : "$" + Math.round(v).toLocaleString("es-MX");
      if (t < 1) requestAnimationFrame(pintar);
      else el.textContent = el.dataset.final || el.textContent;
    };
    el.classList.add("cuenta");
    requestAnimationFrame(pintar);
  });
}
