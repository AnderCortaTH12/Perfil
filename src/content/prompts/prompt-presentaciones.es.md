---
slug: "generador-presentaciones"
idioma: "es"
titulo: "Generador de Presentaciones Elegantes"
categoria: "Productividad"
descripcion: "Crea presentaciones HTML o PPTX de nivel consultora con un cuestionario guiado. Soporta logos, paletas corporativas, datos para gráficos y referencias visuales. Incluye 6 layouts premium y reglas de diseño anti-genérico."
tags: ["Presentaciones", "PowerPoint", "HTML", "Diseño", "Productividad"]
github: "https://github.com/AnderCortaTH12/Perfil/blob/main/prompts/prompt-presentaciones-v2.md"
demo: "/Perfil/prompts/demo-presentacion.html"
---

Un prompt diseñado para convertir a cualquier modelo en un **consultor experto en presentaciones de nivel McKinsey/Accenture**. En lugar de generar una presentación genérica de golpe, conduce un cuestionario guiado por bloques —tema y objetivo, contexto, assets visuales, estilo y confirmación— para entender de verdad qué necesitas antes de producir nada.

### Cómo se usa

1. Pega el prompt completo en tu modelo (Claude, GPT, etc.).
2. Responde al cuestionario bloque a bloque: el modelo no avanza hasta que confirmas.
3. Aporta lo que tengas —documentos, datos para gráficos, logos, paleta corporativa o una presentación de referencia—. Todo es opcional.
4. Revisa el resumen final (estructura slide a slide, paleta, estilo) y confirma o ajusta.
5. El modelo genera la presentación aplicando reglas de diseño premium.

### Qué genera

- **HTML autocontenido**: un único archivo con animaciones, navegación por teclado, gráficos con Chart.js y tipografía de Google Fonts. Ideal para presentar en pantalla.
- **PPTX editable**: código Python con `python-pptx` que produce un `.pptx` con los mismos layouts, colores y tipografía. Ideal para editar después.

### Qué lo hace diferente

- **6 layouts premium** (hero, split, KPI grid, chart focus, timeline, lista editorial) con la regla de no repetir layout en slides consecutivas.
- **Reglas anti-genérico**: nada de cajas grises para métricas, nada de los colores por defecto de Chart.js, títulos de gráfico que son la conclusión y no la descripción.
- **Paletas predefinidas** con CSS variables para tech, negocio, inversión, startup y minimalista.
- **Identidad corporativa**: integra logos, paletas de marca y referencias visuales que aportes.

### Para qué casos sirve

Pitches a inversores, propuestas a cliente, presentación de resultados, formaciones internas, defensas académicas o cualquier ocasión donde la presentación tenga que verse cara y profesional sin pasar horas en diseño.
