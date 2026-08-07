---
slug: "enagas"
idioma: "es"
titulo: "Observatorio del Sistema Gasista Español"
fecha: 2026-08-07
resumen: "Pipeline autónomo que extrae, valida y publica cada mes los datos del sistema gasista español a partir de los PDF de Enagás, usando Claude como lector visual y un dashboard estático con Apache ECharts."
stack: ["Python", "Claude API", "GitHub Actions", "Apache ECharts", "GitHub Pages"]
repo: "https://github.com/AnderCortaTH12/Enagas"
demo: "https://andercortath12.github.io/Enagas/"
destacado: true
diagrama: |
  flowchart TD
    A[GitHub Actions cron diario 07h UTC] --> B{Nuevo PDF de Enagas?}
    B -->|No| A
    B -->|Si| C[PDF a imagen PNG por pagina]
    C --> D[Claude lee las imagenes y mapea cifras al catalogo]
    D --> E[Normalizacion determinista: numeros ES, unidades, dimensiones]
    E --> F{Validacion cruzada cuadra?}
    F -->|No| G[Aborta: no se escribe nada]
    F -->|Si| H[Escribe data/gas.csv versionado en Git]
    H --> I[Exporta JSON: catalogo, series, ultimos valores]
    I --> J[Dashboard estatico GitHub Pages: ECharts]
---

Enagás publica cada mes dos informes en PDF —el Boletín Estadístico del Gas y el Progreso Mensual de la Demanda— con las cifras oficiales del sistema gasista español. No hay API ni descarga estructurada: solo tablas dentro de un PDF con estilos que rompen cualquier extracción de texto plano. Este proyecto convierte esa fuente en un dashboard vivo, sin intervención manual.

## Cómo está montado

Cada día, un GitHub Action comprueba mediante peticiones `HEAD` si Enagás ha publicado un PDF nuevo. Cuando lo hay, cada página se convierte en imagen PNG y se envía a **Claude** en modo multimodal: el modelo *lee* la imagen igual que lo haría una persona y mapea cada cifra a un identificador del catálogo de métricas, copiándola literalmente, sin calcular ni inferir nada. Esa es la decisión de diseño clave: el LLM solo interpreta la tabla visualmente —donde el texto plano se desordena por el estilado del PDF—, mientras que toda la normalización (números en formato español, conversión de unidades TWh→GWh, nombres de comunidades autónomas) la hace código Python determinista.

Antes de escribir nada, un validador comprueba que los agregados cuadren internamente y entre las dos fuentes (boletín y progreso mensual). Si algo no cuadra, el proceso se detiene sin tocar los datos: es todo o nada, para que el histórico nunca contenga una fila a medias. Los datos validados se acumulan en `data/gas.csv`, un CSV en formato *tidy* (una fila por observación) versionado en Git, que actúa como base de datos con historial y diffs auditables gratis. Por último, un script exporta el catálogo y las series a JSON, que un dashboard estático en HTML/JS vanilla con **Apache ECharts** consume directamente, sin build step ni backend.

## Qué muestra el dashboard

El observatorio tiene seis vistas: resumen de KPIs, desglose jerárquico de la demanda (convencional → doméstico-comercial / industrial / cisternas), comparativa interanual, demanda por comunidad autónoma, aprovisionamiento por origen (Argelia, Rusia, GNL...) e infraestructuras (plantas de regasificación, conexiones internacionales). Dos ejemplos con datos reales del último periodo:

![Demanda de gas por sector en GWh: convencional, industrial, sector eléctrico y cisternas](/proyectos/enagas/enagas-demanda-sectores.svg)

![Demanda del sector eléctrico por comunidad autónoma en GWh, encabezada por Andalucía y Cataluña](/proyectos/enagas/enagas-demanda-ccaa.svg)

## Robustez

El proyecto incluye monitorización propia: si pasan 45 días sin una ingesta exitosa, salta una alerta, con detección de cambios en el patrón de URLs que usa Enagás para publicar (incluyendo variantes "rev" de revisión). Cualquier mes puede reprocesarse de forma idempotente con `--force`. Una suite de pytest cubre el parseo de números en español, la conversión de unidades, la normalización de dimensiones, la construcción de URLs candidatas y la lógica de validación cruzada.
