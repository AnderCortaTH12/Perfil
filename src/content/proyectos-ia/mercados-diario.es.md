---
slug: "mercados-diario"
idioma: "es"
titulo: "Mercados Diario — Análisis automático del MEFF con IA"
fecha: 2026-06-06
resumen: "Sistema autónomo que cada día hábil descarga datos del Mercado Español de Futuros, los procesa y genera un informe analítico con Claude API en tono de mesa institucional."
stack: ["Python", "Claude API", "GitHub Actions", "Pandas", "Astro"]
repo: "https://github.com/AnderCortaTH12/mercados-diario"
demo: ""
destacado: true
diagrama: |
  flowchart TD
    A[GitHub Actions cron L-V 09h] --> B[Descarga Excel MEFF]
    B --> C{Excel disponible?}
    C -->|No| D[Retrocede hasta 3 dias habiles]
    D --> B
    C -->|Si| E[Parser Excel a CSV unificado]
    E --> F[Deteccion de anomalias y metricas]
    F --> G[Claude API genera resumen]
    G --> H[Commit automatico del resumen]
    H --> I[Portfolio sincroniza y rebuild]
    I --> J[Widget portada actualizado]
---

El MEFF (Mercado Español de Futuros y Opciones) publica cada tarde un Excel con volumen negociado y open interest de todos sus contratos — futuros y opciones sobre el IBEX35, acciones individuales, divisas y tipos de interés. El problema: ese archivo solo permanece disponible en la web del MEFF durante aproximadamente un mes. No existe ningún histórico público accesible ni API oficial. Los datos simplemente desaparecen.

*Mercados Diario* resuelve esto con un pipeline completamente autónomo. Cada día hábil de lunes a viernes, un GitHub Action descarga el Excel, lo parsea y normaliza a un CSV histórico acumulativo, calcula métricas derivadas (variaciones diarias, z-scores, evolución del open interest) y detecta anomalías estadísticas. A continuación invoca Claude API con un prompt institucional cuidadosamente construido para generar un informe ejecutivo en el tono de las mesas de derivados de Goldman Sachs o Morgan Stanley: conciso, orientado a decisiones y sin relleno.

La arquitectura es deliberadamente modular. Añadir una nueva fuente financiera —otra bolsa, un índice de volatilidad, datos de divisas— solo requiere añadir una entrada al fichero `config/fuentes.yaml` y, si el formato de datos es nuevo, un parser específico. El núcleo (`core/`) no se toca. Esta extensibilidad fue un requisito de diseño desde el principio: el sistema está pensado para crecer.

El motor de análisis está optimizado para minimizar costes. Mediante filtros de ranking top-N (por volumen, open interest y variación) y formato CSV en línea en lugar de tablas Markdown, el contexto enviado a Claude se comprimió un 75 % sin pérdida de información relevante. El coste por resumen es de aproximadamente $0,02, lo que sitúa el coste mensual total en torno a $0,50 para 22 ejecuciones al mes. Los 65 tests automatizados cubren desde el parseo del Excel hasta la lógica de retry y el analizador con cliente simulado.

El sistema incluye recuperación automática ante fallos: si el Excel del día más reciente aún no está publicado (lo que ocurre con regularidad en sábados y festivos), la lógica retrocede hasta tres días hábiles hacia atrás antes de rendirse. Esto garantiza que el workflow nunca devuelve un falso error por datos no publicados todavía. El portfolio sincroniza los resúmenes automáticamente cada mañana y reconstruye el sitio estático, de modo que el widget de portada siempre muestra el análisis más reciente sin intervención manual.
