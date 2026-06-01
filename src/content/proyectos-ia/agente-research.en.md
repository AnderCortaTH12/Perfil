---
slug: "agente-research"
idioma: "en"
titulo: "Autonomous research agent"
fecha: 2026-01-15
resumen: "An agent that answers complex questions by searching, reading and citing sources until it has enough evidence."
stack: ["Python", "LangGraph", "Claude API", "Tavily"]
repo: "https://github.com/usuario/agente-research"
demo: ""
destacado: true
diagrama: |
  flowchart TD
    A[User question] --> B[Planner]
    B --> C[Web search]
    C --> D[Read & extract]
    D --> E{Enough evidence?}
    E -- No --> F[Refine query]
    F --> C
    E -- Yes --> G[Synthesis]
    G --> H[Answer with citations]
---

## What it does

The **autonomous research agent** breaks an open-ended question into sub-goals,
searches the web, reads the most relevant sources and decides whether it has enough
evidence to answer. If not, it refines the query and repeats the loop. The final answer
includes **verifiable citations** for every claim.

## Design decisions

- **State graph with LangGraph** instead of a linear chain: it makes the review loop
  (search → read → evaluate → search again) explicit.
- **Planner separated from executor**: the planner proposes the next step and a critic
  decides whether the evidence is sufficient, preventing the model from settling too early.
- **Iteration limit** to bound cost and latency; if reached, the agent answers with what it
  has and flags the remaining uncertainty.
- **Mandatory citations**: every paragraph of the output references the sources it read,
  which makes the result easy to audit.

## Results

- Fewer hallucinations than a direct model answer, because every claim is anchored to a source.
- Average of 2 to 4 search cycles per query depending on difficulty.
- Useful for quick due diligence and preliminary literature reviews.
