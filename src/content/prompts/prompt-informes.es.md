---
slug: "generador-informes"
idioma: "es"
titulo: "Generador de Informes a partir de Datos"
categoria: "Productividad"
descripcion: "Convierte datos en bruto (CSV, Excel, PDF, texto, imágenes de tablas) en un informe profesional con narrativa, gráficos e interpretación. Output: HTML interactivo o Word editable. Mentalidad de analista senior de McKinsey: encuentra la historia que cuentan los datos."
tags: ["Informes", "Datos", "Excel", "HTML", "Word", "Análisis"]
github: "https://github.com/AnderCortaTH12/Perfil/blob/main/prompts/prompt-informes.md"
demo: "/Perfil/prompts/demo-informe-ventas.html"
---

## Para qué sirve

Convierte cualquier conjunto de datos en bruto en un informe profesional listo para presentar. En lugar de describir números, el modelo adopta la mentalidad de un analista senior de consultora: busca la historia que cuentan los datos, la respalda con gráficos y entrega conclusiones accionables.

Acepta datos en cualquier formato: CSV, Excel, tablas pegadas como texto, PDF con cifras, capturas de pantalla de tablas o varias fuentes combinadas.

---

## Cómo usarlo

El prompt funciona por bloques de preguntas. El modelo espera tu respuesta antes de pasar al siguiente bloque, lo que garantiza que el informe se ajuste exactamente a lo que necesitas.

**Bloque 1 — Objetivo y contexto**
Qué pregunta debe responder el informe, quién lo va a leer y qué decisión debe apoyar. También puedes anticipar hipótesis que quieres confirmar o refutar.

**Bloque 2 — Los datos**
Sube o pega los datos. El modelo los analiza, detecta problemas de calidad (valores faltantes, anomalías, columnas ambiguas) y te presenta un resumen antes de continuar.

**Bloque 3 — Alcance y profundidad**
Extensión del informe (resumen de una página, estándar o exhaustivo), si quieres recomendaciones o solo análisis, métricas que no pueden faltar y si necesitas proyecciones.

**Bloque 4 — Formato y marca**
HTML interactivo (gráficos navegables, exportable a PDF desde el navegador) o Word editable (código Python con python-docx). Puedes aportar logo, colores o plantilla corporativa.

**Bloque 5 — Confirmación**
Antes de generar, el modelo presenta la estructura completa, los gráficos previstos y los hallazgos principales detectados en los datos. Confirmas o ajustas.

---

## Qué genera

**HTML interactivo** — Archivo único autocontenido con Chart.js, tipografía profesional, índice navegable, KPIs destacados como cifras grandes y resumen ejecutivo diferenciado visualmente. Optimizado para imprimir como PDF.

**Word editable** — Código Python ejecutable (python-docx + matplotlib) que genera un `.docx` con portada, cabecera/pie, tablas con estilo, gráficos incrustados y resumen ejecutivo en página propia.

En ambos casos: título de cada gráfico = la conclusión (no la descripción), datos clave resaltados con color de acento y cero ruido visual.

---

## Casos de uso

- Informes mensuales de ventas, marketing o operaciones
- Análisis de resultados de campañas para presentar a clientes
- Informes de KPIs para comité de dirección
- Análisis de encuestas o datos de investigación
- Cualquier dataset recurrente donde quieras consistencia de formato y rapidez
