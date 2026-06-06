---
slug: "mercados-diario"
idioma: "en"
titulo: "Mercados Diario — Automated MEFF Analysis with AI"
fecha: 2026-06-06
resumen: "Autonomous system that every business day downloads data from the Spanish Futures Market, processes it, and generates an analytical report with Claude API in an institutional desk tone."
stack: ["Python", "Claude API", "GitHub Actions", "Pandas", "Astro"]
repo: "https://github.com/AnderCortaTH12/mercados-diario"
demo: ""
destacado: true
diagrama: |
  flowchart TD
    A[GitHub Actions cron Mon-Fri 09h] --> B[Download MEFF Excel]
    B --> C{Excel available?}
    C -->|No| D[Look back up to 3 business days]
    D --> B
    C -->|Yes| E[Parse Excel to unified CSV]
    E --> F[Anomaly detection and metrics]
    F --> G[Claude API generates summary]
    G --> H[Auto-commit the summary]
    H --> I[Portfolio syncs and rebuilds]
    I --> J[Homepage widget updated]
---

MEFF (Mercado Español de Futuros y Opciones) publishes an Excel file every afternoon with traded volume and open interest across all its contracts — futures and options on the IBEX35, individual equities, currencies, and interest rates. The problem: that file is only available on the MEFF website for roughly one month. There is no publicly accessible historical archive and no official API. The data simply disappears.

*Mercados Diario* solves this with a fully autonomous pipeline. Every weekday, a GitHub Action downloads the Excel, parses and normalises it into a cumulative historical CSV, calculates derived metrics (daily changes, z-scores, open interest evolution) and detects statistical anomalies. It then calls Claude API with a carefully crafted institutional prompt to generate an executive report in the style of Goldman Sachs or Morgan Stanley derivatives desks: concise, decision-oriented, and free of filler.

The architecture is deliberately modular. Adding a new financial data source — another exchange, a volatility index, FX data — only requires adding an entry to `config/fuentes.yaml` and, if the data format is new, a specific parser. The core (`core/`) is never touched. This extensibility was a design requirement from the start: the system is built to grow.

The analysis engine is optimised to minimise costs. Through top-N ranking filters (by volume, open interest and variation) and inline CSV format instead of Markdown tables, the context sent to Claude was compressed by 75% without loss of relevant information. The cost per summary is approximately $0.02, putting the total monthly cost at around $0.50 for 22 runs per month. The 65 automated tests cover everything from Excel parsing to retry logic and the analyser with a mocked API client.

The system includes automatic failure recovery: if the most recent day's Excel is not yet published (which happens regularly on Saturdays and holidays), the logic looks back up to three business days before giving up. This ensures the workflow never returns a false error due to data not yet published. The portfolio automatically syncs the summaries every morning and rebuilds the static site, so the homepage widget always shows the latest analysis without any manual intervention.
