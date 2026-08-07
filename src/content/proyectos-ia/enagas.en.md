---
slug: "enagas"
idioma: "en"
titulo: "Spanish Gas System Observatory"
fecha: 2026-08-07
resumen: "Autonomous pipeline that extracts, validates and publishes monthly data from the Spanish gas system out of Enagás's PDF reports, using Claude as a visual reader and a static dashboard built with Apache ECharts."
stack: ["Python", "Claude API", "GitHub Actions", "Apache ECharts", "GitHub Pages"]
repo: "https://github.com/AnderCortaTH12/Enagas"
demo: "https://andercortath12.github.io/Enagas/"
destacado: true
diagrama: |
  flowchart TD
    A[GitHub Actions daily cron 07h UTC] --> B{New Enagas PDF?}
    B -->|No| A
    B -->|Yes| C[PDF to PNG image per page]
    C --> D[Claude reads the images and maps figures to the catalog]
    D --> E[Deterministic normalization: ES numbers, units, dimensions]
    E --> F{Cross-validation matches?}
    F -->|No| G[Abort: nothing gets written]
    F -->|Yes| H[Writes data/gas.csv versioned in Git]
    H --> I[Exports JSON: catalog, series, latest values]
    I --> J[Static dashboard on GitHub Pages: ECharts]
---

Every month Enagás publishes two PDF reports — the Gas Statistical Bulletin and the Monthly Demand Progress report — with the official figures of the Spanish gas system. There's no API or structured download: just tables inside a styled PDF that break any plain-text extraction. This project turns that source into a living dashboard, with zero manual intervention.

## How it's built

Every day, a GitHub Action checks with `HEAD` requests whether Enagás has published a new PDF. When it has, each page is converted to a PNG image and sent to **Claude** in multimodal mode: the model *reads* the image the way a person would and maps every figure to an identifier in the metrics catalog, copying it literally — no calculating, no inferring. That's the key design decision: the LLM only interprets the table visually, where plain text gets scrambled by the PDF's styling, while all normalization (Spanish-format numbers, TWh→GWh unit conversion, region names) is handled by deterministic Python code.

Before anything is written, a validator checks that the aggregates match internally and across both sources (bulletin and monthly progress). If anything doesn't add up, the process stops without touching the data — it's all or nothing, so the historical record never contains a half-written row. Validated data accumulates in `data/gas.csv`, a tidy-format CSV (one row per observation) versioned in Git, acting as a database with free, auditable history and diffs. Finally, a script exports the catalog and series to JSON, which a vanilla HTML/JS static dashboard built with **Apache ECharts** consumes directly, with no build step and no backend.

## What the dashboard shows

The observatory has six views: KPI summary, hierarchical demand breakdown (conventional → residential-commercial / industrial / tankers), year-over-year comparison, demand by autonomous region, supply origin (Algeria, Russia, LNG...) and infrastructure (regasification plants, international connections). Two examples with real data from the latest period:

![Gas demand by sector in GWh: conventional, industrial, power sector and tankers](/proyectos/enagas/enagas-demanda-sectores.svg)

![Power sector demand by Spanish autonomous region in GWh, led by Andalucía and Cataluña](/proyectos/enagas/enagas-demanda-ccaa.svg)

## Robustness

The project ships its own monitoring: if 45 days pass without a successful ingestion, an alert fires, including detection of changes in the URL pattern Enagás uses to publish reports (including "rev" revision variants). Any month can be idempotently reprocessed with `--force`. A pytest suite covers Spanish number parsing, unit conversion, dimension normalization, candidate URL construction, and the cross-validation logic.
