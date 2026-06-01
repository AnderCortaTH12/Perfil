---
slug: "agentic-trading-screener"
idioma: "es"
titulo: "Agentic Trading Screener"
fecha: 2026-06-01
resumen: "Bot de trading con IA que interpreta consultas en lenguaje natural, hace screening de acciones con datos reales y justifica cada elección anclada a los datos."
stack: ["Python", "Anthropic SDK", "yfinance", "pandas", "DuckDB", "Streamlit"]
repo: "https://github.com/AnderCortaTH12/Proyectos/tree/main/agentes/trading-bot"
demo: ""
destacado: true
diagrama: |
  flowchart TD
    Q[Consulta en lenguaje natural] --> PLAN[Planner Haiku · tool use]
    PLAN -->|criterios estructurados| ORQ[Orquestador]
    ORQ --> T1[Universo SP 500]
    ORQ --> T2[Fundamentales]
    ORQ --> T3[Tecnicos RSI/MACD/SMA]
    ORQ --> T4[Benchmarks por sector]
    T1 & T2 & T3 & T4 --> CACHE[(Cache DuckDB · TTL)]
    CACHE --> FILT[Filtros duros]
    FILT --> SCORE[Scoring ponderado 0-10]
    SCORE --> REAS[Razonamiento Sonnet]
    REAS --> GUARD{Guardrail: numeros verificados?}
    GUARD -- No --> DESC[Descarta justificacion]
    GUARD -- Si --> RANK[Ranking + justificacion anclada]
    RANK --> UI[Streamlit: ranking, P/L, equity, traza]
---

Un bot de trading **demostrativo** que entiende consultas en lenguaje natural
(p. ej. *"tech infravalorada con momentum positivo"*) y ejecuta un screening de
acciones con **razonamiento explícito y anclado a los datos**.

## Qué hace

- Interpreta la consulta y la convierte en criterios estructurados.
- Descarga datos reales (yfinance) del universo S&P 500.
- Calcula indicadores técnicos (RSI, MACD, medias móviles) con pandas puro.
- Filtra por criterios fundamentales (P/E, deuda, crecimiento) relativos a la
  mediana del sector.
- Puntúa los candidatos y **justifica cada elección con cifras reales**, con un
  *guardrail* que verifica que ningún número citado esté inventado.

## Stack y arquitectura

- Agente multi-turno con **tool use** (Anthropic SDK): Haiku para parsear la
  consulta, Sonnet para el razonamiento final.
- Screener con scoring ponderado + *grounding* anti-alucinación.
- **MockBroker** simulado (cartera virtual de $100k), con interfaz template
  lista para conectar un broker real (Alpaca / IBKR).
- Dashboard en **Streamlit** con posiciones, P&L en vivo, equity curve y panel
  de traza del agente.

## Productivización

- Caché local en DuckDB con TTL.
- Rate limiting con reintentos y *backoff* exponencial.
- Gestión de riesgo (máx. 5% del portfolio por posición, anti-duplicado).
- Más de 30 tests automatizados.

> Proyecto educativo / de portfolio. **No es asesoramiento financiero.**
