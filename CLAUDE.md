# CLAUDE.md — Reglas del proyecto "Perfil"

Web personal / portfolio bilingüe (ES por defecto, EN secundario).
Stack: **Astro + Tailwind CSS + Mermaid + i18n nativo de Astro**.
Objetivo: que añadir/editar/borrar contenido sea crear, editar o eliminar archivos en `src/content/`, sin tocar nunca el diseño.

---

## Reglas generales

- Idiomas: **español** (`/es/`, por defecto) e **inglés** (`/en/`). Todo contenido debe existir en ambos idiomas.
- Estética: **elegante y minimalista**. Mucho espacio en blanco, tipografía cuidada, sin recargar.
- Antes de cambios grandes, **pregunta y confírmame** en lugar de asumir.
- Cada vez que añadas contenido, hazlo **solo** dentro de `src/content/` (más imágenes/PDF en `public/`).
- Tras un cambio, recuérdame que puedo previsualizar con `npm run dev`.

## NO tocar sin pedírmelo explícitamente

- `src/components/`, `src/layouts/`, `src/pages/` (diseño y estructura).
- `astro.config.mjs`, `tailwind.config.*`, `package.json`.
- Configuración de i18n.

Si un cambio de contenido obliga a tocar algo de aquí, **avísame antes**.

---

## Dónde vive cada cosa (`src/content/`)

| Carpeta | Sección | Grupo |
|---|---|---|
| `proyectos-ia/` | Proyectos de IA (con diagrama de flujo) | Proyectos IA |
| `github/` | Repos destacados | Github |
| `papers/` | Papers económicos | — |
| `divulgacion/` | Artículos de divulgación/opinión | Divulgación/opinión |
| `prompts/` | Prompts útiles | Prompts útiles |
| `certificaciones/` | Certificaciones (ampliable) | — |

## Convención de archivos (bilingüe)

Cada elemento es **dos archivos** con el mismo nombre base y sufijo de idioma:

```
src/content/proyectos-ia/agente-research.es.md
src/content/proyectos-ia/agente-research.en.md
```

- Nombre base en minúsculas, con guiones, sin acentos ni espacios.
- Ambos archivos comparten el campo `slug` (mismo valor) para enlazarse entre idiomas.
- Las imágenes van en `public/img/` y los PDF de papers en `public/papers/`.

---

## Formato (frontmatter) por sección

### proyectos-ia
```yaml
---
slug: "agente-research"
idioma: "es"            # "es" | "en"
titulo: "Agente de investigación autónomo"
fecha: 2026-01-15
resumen: "Una frase clara de qué hace."
stack: ["Python", "LangGraph", "Claude API"]
repo: "https://github.com/usuario/agente-research"
demo: ""                # opcional
destacado: true
diagrama: |
  flowchart TD
    A[Pregunta] --> B[Planner]
    B --> C[Búsqueda]
    C --> D{¿Suficiente?}
    D -- No --> C
    D -- Sí --> E[Respuesta con citas]
---
Descripción larga, decisiones de diseño, resultados.
```

### github
```yaml
---
slug: ""
idioma: "es"
titulo: ""
descripcion: ""
repo: ""
lenguaje: ""
tags: []
destacado: false
---
```

### papers
```yaml
---
slug: ""
idioma: "es"
titulo: ""
fecha: 2026-01-01
abstract: ""
autores: [""]
publicacion: ""         # revista / venue, opcional
pdf: "/papers/archivo.pdf"
enlace: ""              # DOI o URL, opcional
---
```

### divulgacion
```yaml
---
slug: ""
idioma: "es"
titulo: ""
fecha: 2026-01-01
resumen: ""
tags: []
imagen: ""              # opcional, en /img/
---
Cuerpo del artículo en Markdown.
```

### prompts
```yaml
---
slug: ""
idioma: "es"
titulo: ""
categoria: ""           # p.ej. "Economía", "Código", "Escritura"
descripcion: "Para qué sirve."
tags: []
---
Texto íntegro del prompt (se mostrará con botón de copiar).
```

### certificaciones
```yaml
---
slug: ""
idioma: "es"
titulo: ""
emisor: ""
fecha: 2026-01-01
logo: "/img/cert-logo.png"   # opcional
enlace_verificacion: ""      # opcional
credencial_id: ""            # opcional
---
```

---

## Diagramas Mermaid (proyectos de IA)

- El diagrama va en el campo `diagrama` del frontmatter, como **texto Mermaid**.
- Usa `flowchart TD` (vertical) por defecto; `LR` si el flujo es largo.
- Mantén etiquetas cortas y claras; refleja agentes, herramientas y decisiones.
- Para diagramas de agentes, distingue: entrada del usuario, planificador, herramientas/búsquedas, bucles de revisión y salida.

---

## Al añadir un elemento nuevo

1. Crea **los dos** archivos (`.es.md` y `.en.md`) con el mismo `slug`.
2. Rellena todos los campos obligatorios; deja vacíos los opcionales que no apliquen.
3. Si hay imagen/PDF, colócalos en `public/` y referencia la ruta.
4. Confirma que el contenido aparece tras `npm run dev`.

## Al borrar

- Elimina ambos archivos del idioma (`.es.md` y `.en.md`) y sus imágenes/PDF asociados si no se usan en otro sitio.

---

## Sistema mercados-diario

El repositorio [AnderCortaTH12/mercados-diario](https://github.com/AnderCortaTH12/mercados-diario) genera cada día hábil (lun-vie) a las 08:00-09:00 UTC un resumen del cierre del MEFF con Claude API.

El portfolio sincroniza esos resúmenes automáticamente 30 minutos después y reconstruye el sitio estático. El workflow es `.github/workflows/sync-resumenes-meff.yml` y el script es `scripts/sync_resumenes_meff.py`.

### Añadir un resumen manualmente (raro)

1. Descarga `resumenes/meff/YYYY-MM-DD.md` y `YYYY-MM-DD.json` del repo mercados-diario.
2. Ejecuta `python scripts/sync_resumenes_meff.py` — sincronizará automáticamente los 4 más recientes.
3. O crea el archivo `src/content/resumenes-meff/YYYY-MM-DD.md` a mano siguiendo el frontmatter de los existentes.

### Lanzar la sincronización manualmente desde GitHub Actions

1. Ve a **Actions → Sincronizar resúmenes MEFF**.
2. Pulsa **Run workflow** → **Run workflow**.

### Colección `resumenes-meff`

- **Archivos:** `src/content/resumenes-meff/YYYY-MM-DD.md` (un archivo por día, sin sufijo de idioma).
- **Frontmatter:** `fecha`, `titular`, `movimientos_destacados` (array), `tokens_input`, `tokens_output`, `coste_usd`, `generado_por`.
- **Body:** contenido Markdown completo del resumen (renderizado con Astro `render()`).
- La página del proyecto en `/proyectos-ia/mercados-diario` los muestra como último resumen + acordeones anteriores.
