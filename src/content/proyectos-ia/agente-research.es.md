---
slug: "agente-research"
idioma: "es"
titulo: "Agente de investigación autónomo"
fecha: 2026-01-15
resumen: "Un agente que responde preguntas complejas buscando, leyendo y citando fuentes hasta tener evidencia suficiente."
stack: ["Python", "LangGraph", "Claude API", "Tavily"]
repo: "https://github.com/usuario/agente-research"
demo: ""
destacado: true
diagrama: |
  flowchart TD
    A[Pregunta del usuario] --> B[Planner]
    B --> C[Búsqueda web]
    C --> D[Lectura y extracción]
    D --> E{¿Evidencia suficiente?}
    E -- No --> F[Refina la consulta]
    F --> C
    E -- Sí --> G[Síntesis]
    G --> H[Respuesta con citas]
---

## Qué hace

**Agente de investigación autónomo** descompone una pregunta abierta en sub-objetivos,
busca en la web, lee las fuentes más relevantes y decide si tiene evidencia suficiente
para responder. Si no, refina la consulta y repite el ciclo. La respuesta final incluye
**citas verificables** a cada afirmación.

## Decisiones de diseño

- **Grafo de estados con LangGraph** en lugar de una cadena lineal: permite modelar el
  bucle de revisión (búsqueda → lectura → evaluación → nueva búsqueda) de forma explícita.
- **Planner separado del ejecutor**: el planificador propone el siguiente paso y un crítico
  decide si la evidencia basta, evitando que el modelo "se conforme" demasiado pronto.
- **Límite de iteraciones** para acotar coste y latencia; si se alcanza, el agente responde
  con lo que tiene y señala la incertidumbre.
- **Citas obligatorias**: cada párrafo de la salida referencia las fuentes leídas, lo que
  facilita auditar el resultado.

## Resultados

- Reduce las alucinaciones frente a una respuesta directa del modelo, porque toda afirmación
  se ancla a una fuente.
- Tiempo medio por consulta: entre 2 y 4 ciclos de búsqueda según la dificultad.
- Útil para *due diligence* rápida y revisiones de literatura preliminares.
