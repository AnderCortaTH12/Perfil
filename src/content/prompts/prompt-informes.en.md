---
slug: "generador-informes"
idioma: "en"
titulo: "Data Report Generator"
categoria: "Productivity"
descripcion: "Turns raw data (CSV, Excel, PDF, text, table screenshots) into a professional report with narrative, charts and interpretation. Output: interactive HTML or editable Word. Senior McKinsey analyst mindset: finds the story the data tells."
tags: ["Reports", "Data", "Excel", "HTML", "Word", "Analysis"]
github: "https://github.com/AnderCortaTH12/Perfil/blob/main/prompts/prompt-informes.md"
demo: "/Perfil/prompts/demo-informe-ventas.html"
---

## What it does

Turns any raw dataset into a professional report ready to present. Rather than describing numbers, the model adopts the mindset of a senior consulting analyst: it finds the story the data tells, backs it up with charts, and delivers actionable conclusions.

Accepts data in any format: CSV, Excel, tables pasted as text, PDFs with figures, table screenshots, or multiple sources combined.

---

## How to use it

The prompt works in question blocks. The model waits for your answer before moving to the next block, ensuring the report fits exactly what you need.

**Block 1 — Objective and context**
What question the report must answer, who will read it and what decision it should support. You can also share hypotheses you want to confirm or refute.

**Block 2 — The data**
Upload or paste the data. The model analyses it, detects quality issues (missing values, anomalies, ambiguous columns) and presents a summary before continuing.

**Block 3 — Scope and depth**
Report length (one-page summary, standard or exhaustive), whether you want recommendations or analysis only, must-have metrics and whether you need projections.

**Block 4 — Format and brand**
Interactive HTML (navigable charts, exportable to PDF from the browser) or editable Word (Python code using python-docx). You can supply a logo, brand colours or a corporate template.

**Block 5 — Confirmation**
Before generating, the model presents the full structure, planned charts and key findings already detected in the data. You confirm or adjust.

---

## What it generates

**Interactive HTML** — Single self-contained file with Chart.js, professional typography, navigable index, KPIs displayed as large figures and a visually distinct executive summary. Optimised to print as PDF.

**Editable Word** — Executable Python code (python-docx + matplotlib) that produces a `.docx` with a cover page, header/footer, styled tables, embedded charts and a standalone executive summary page.

In both cases: each chart title = the conclusion (not the description), key data highlighted with an accent colour and zero visual noise.

---

## Use cases

- Monthly sales, marketing or operations reports
- Campaign results analysis to present to clients
- KPI reports for executive committees
- Survey or research data analysis
- Any recurring dataset where you want format consistency and speed
