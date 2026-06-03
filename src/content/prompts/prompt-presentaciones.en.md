---
slug: "generador-presentaciones"
idioma: "en"
titulo: "Elegant Presentation Generator"
categoria: "Productivity"
descripcion: "Builds consultancy-grade HTML or PPTX presentations through a guided questionnaire. Supports logos, corporate palettes, chart data and visual references. Includes 6 premium layouts and anti-generic design rules."
tags: ["Presentations", "PowerPoint", "HTML", "Design", "Productivity"]
github: "https://github.com/AnderCortaTH12/Perfil/blob/main/prompts/prompt-presentaciones-v2.md"
demo: "/Perfil/prompts/demo-presentacion.html"
---

A prompt designed to turn any model into a **McKinsey/Accenture-grade presentation consultant**. Instead of dumping a generic deck all at once, it runs a guided block-by-block questionnaire —topic and goal, context, visual assets, style and confirmation— to truly understand what you need before producing anything.

### How to use it

1. Paste the full prompt into your model (Claude, GPT, etc.).
2. Answer the questionnaire block by block: the model won't move on until you confirm.
3. Provide whatever you have —documents, chart data, logos, a corporate palette or a reference deck—. Everything is optional.
4. Review the final summary (slide-by-slide structure, palette, style) and confirm or adjust.
5. The model generates the deck applying premium design rules.

### What it produces

- **Self-contained HTML**: a single file with animations, keyboard navigation, Chart.js charts and Google Fonts typography. Ideal for presenting on screen.
- **Editable PPTX**: Python code using `python-pptx` that outputs a `.pptx` with the same layouts, colors and typography. Ideal for editing afterwards.

### What makes it different

- **6 premium layouts** (hero, split, KPI grid, chart focus, timeline, editorial list) with a rule against repeating a layout on consecutive slides.
- **Anti-generic rules**: no gray boxes for metrics, no default Chart.js colors, chart titles that state the conclusion rather than the description.
- **Predefined palettes** with CSS variables for tech, business, investment, startup and minimalist styles.
- **Corporate identity**: integrates the logos, brand palettes and visual references you provide.

### When it's useful

Investor pitches, client proposals, results presentations, internal training, academic defenses, or any occasion where the deck needs to look polished and professional without spending hours on design.
