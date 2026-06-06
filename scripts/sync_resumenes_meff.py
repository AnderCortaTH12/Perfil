#!/usr/bin/env python3
"""
Sincroniza los 4 resúmenes MEFF más recientes desde el repositorio
AnderCortaTH12/mercados-diario y los convierte en archivos Markdown con
frontmatter para la colección src/content/resumenes-meff/ del portfolio.

Sin dependencias externas: solo usa urllib y json de la stdlib.
"""

from __future__ import annotations

import json
import logging
import re
import urllib.error
import urllib.request
from pathlib import Path

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
logger = logging.getLogger(__name__)

API_URL = (
    "https://api.github.com/repos/AnderCortaTH12/mercados-diario"
    "/contents/resumenes/meff"
)
RAW_BASE = (
    "https://raw.githubusercontent.com/AnderCortaTH12/mercados-diario"
    "/main/resumenes/meff"
)
# Ruta relativa al directorio raíz del portfolio
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "src" / "content" / "resumenes-meff"
MAX_FILES = 4
GENERADO_POR = "Claude Sonnet 4.5 vía mercados-diario"


# ---------------------------------------------------------------------------
# HTTP helpers
# ---------------------------------------------------------------------------

def _request(url: str) -> bytes:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "portfolio-sync/1.0",
            "Accept": "application/vnd.github+json",
        },
    )
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read()


def fetch_json(url: str) -> dict | list:
    return json.loads(_request(url).decode("utf-8"))


def fetch_text(url: str) -> str:
    return _request(url).decode("utf-8")


# ---------------------------------------------------------------------------
# Markdown parsers
# ---------------------------------------------------------------------------

def extract_titular(md: str) -> str:
    """Extrae el texto del primer párrafo bajo ## TITULAR EJECUTIVO."""
    m = re.search(
        r"##\s+TITULAR\s+EJECUTIVO\s*\n+([^\n#][^\n]*)",
        md,
        re.IGNORECASE,
    )
    if m:
        return m.group(1).strip()
    # Fallback: primera línea no-encabezado no vacía
    for line in md.split("\n"):
        stripped = line.strip()
        if stripped and not stripped.startswith("#") and not stripped.startswith("---"):
            return stripped[:200]
    return "Análisis diario MEFF"


def extract_movimientos(md: str, n: int = 3) -> list[str]:
    """Extrae los primeros `n` movimientos de ## MOVIMIENTOS DESTACADOS.

    Soporta dos formatos:
    - Bullets: `- texto` / `* texto`
    - Párrafos con negrita: `**Nombre:** descripción`
    """
    m = re.search(
        r"##\s+MOVIMIENTOS?\s+DESTACADOS?\s*\n(.*?)(?=\n##|\Z)",
        md,
        re.DOTALL | re.IGNORECASE,
    )
    if not m:
        return []
    bullets: list[str] = []
    for line in m.group(1).split("\n"):
        stripped = line.strip()
        if stripped.startswith("- ") or stripped.startswith("* "):
            text = stripped[2:].strip()
            text = re.sub(r"\*{1,2}|_{1,2}", "", text)
            if text:
                bullets.append(text)
        elif re.match(r"\*\*[^*]+\*\*[:\s]", stripped):
            # Formato **Nombre (Tipo):** descripción breve
            # Quitar énfasis y truncar a 120 chars
            text = re.sub(r"\*{1,2}|_{1,2}", "", stripped)
            text = text[:120].rstrip() + ("…" if len(text) > 120 else "")
            if text:
                bullets.append(text)
        if len(bullets) >= n:
            break
    return bullets


# ---------------------------------------------------------------------------
# YAML helpers (sin librería, para cumplir restricción de stdlib)
# ---------------------------------------------------------------------------

def _yaml_str(s: str) -> str:
    """Devuelve el string como valor YAML seguro (entre comillas dobles)."""
    escaped = s.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def build_frontmatter(
    fecha: str,
    titular: str,
    movimientos: list[str],
    tokens_input: int | None,
    tokens_output: int | None,
    coste_usd: float | None,
    generado_por: str,
) -> str:
    lines = ["---"]
    lines.append(f"fecha: {fecha}")
    lines.append(f"titular: {_yaml_str(titular)}")
    if movimientos:
        lines.append("movimientos_destacados:")
        for mv in movimientos:
            lines.append(f"  - {_yaml_str(mv)}")
    if tokens_input is not None:
        lines.append(f"tokens_input: {tokens_input}")
    if tokens_output is not None:
        lines.append(f"tokens_output: {tokens_output}")
    if coste_usd is not None:
        # Formato con 4 decimales para evitar notación científica
        lines.append(f"coste_usd: {coste_usd:.6f}")
    lines.append(f"generado_por: {_yaml_str(generado_por)}")
    lines.append("---")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    logger.info("Consultando API de GitHub: %s", API_URL)
    try:
        files = fetch_json(API_URL)
    except urllib.error.HTTPError as e:
        logger.error("Error HTTP %s accediendo a la API: %s", e.code, e)
        raise SystemExit(1)

    if not isinstance(files, list):
        logger.error("Respuesta inesperada de la API: %s", type(files))
        raise SystemExit(1)

    # Filtrar .md (excluir .json y otros)
    md_files = sorted(
        [f for f in files if isinstance(f, dict) and f.get("name", "").endswith(".md")],
        key=lambda f: f["name"],
        reverse=True,
    )[:MAX_FILES]

    if not md_files:
        logger.warning("No se encontraron archivos .md en el repositorio.")
        return

    logger.info("Archivos a sincronizar: %s", [f["name"] for f in md_files])

    synced = 0
    unchanged = 0

    for f in md_files:
        filename = f["name"]          # YYYY-MM-DD.md
        fecha = filename[:-3]         # YYYY-MM-DD
        output_path = OUTPUT_DIR / filename

        # Descargar markdown
        md_url = f"{RAW_BASE}/{filename}"
        logger.info("Descargando %s...", filename)
        try:
            md_content = fetch_text(md_url)
        except Exception as exc:
            logger.error("Error descargando %s: %s", filename, exc)
            continue

        # Descargar JSON de métricas
        json_url = f"{RAW_BASE}/{fecha}.json"
        tokens_input: int | None = None
        tokens_output: int | None = None
        coste_usd: float | None = None
        try:
            meta = fetch_json(json_url)
            if isinstance(meta, dict):
                tokens_input = meta.get("tokens_input")
                tokens_output = meta.get("tokens_output")
                coste_usd = meta.get("coste_estimado_usd")
        except Exception as exc:
            logger.warning("JSON no disponible para %s: %s", fecha, exc)

        # Parsear campos
        titular = extract_titular(md_content)
        movimientos = extract_movimientos(md_content)

        # Construir archivo de salida
        frontmatter = build_frontmatter(
            fecha, titular, movimientos,
            tokens_input, tokens_output, coste_usd, GENERADO_POR,
        )
        # El body del archivo es el markdown completo (renderizado con Content)
        full_content = frontmatter + "\n\n" + md_content

        # Escribir solo si hay cambios
        if output_path.exists() and output_path.read_text(encoding="utf-8") == full_content:
            logger.info("Sin cambios: %s", filename)
            unchanged += 1
            continue

        output_path.write_text(full_content, encoding="utf-8")
        logger.info(
            "Sincronizado: %s — titular: %.60s…",
            filename, titular,
        )
        synced += 1

    logger.info(
        "Sincronización completada: %d nuevo(s)/actualizado(s), %d sin cambios.",
        synced, unchanged,
    )


if __name__ == "__main__":
    main()
