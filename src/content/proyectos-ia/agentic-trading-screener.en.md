---
slug: "agentic-trading-screener"
idioma: "en"
titulo: "Agentic Trading Screener"
fecha: 2026-06-01
resumen: "AI trading bot that interprets natural-language queries, screens stocks with real data and justifies each pick grounded in the data."
stack: ["Python", "Anthropic SDK", "yfinance", "pandas", "DuckDB", "Streamlit"]
repo: "https://github.com/AnderCortaTH12/Proyectos/tree/main/agentes/trading-bot"
demo: ""
destacado: true
diagrama: |
  flowchart TD
    Q[Natural-language query] --> PLAN[Planner Haiku · tool use]
    PLAN -->|structured criteria| ORQ[Orchestrator]
    ORQ --> T1[Universe SP 500]
    ORQ --> T2[Fundamentals]
    ORQ --> T3[Technicals RSI/MACD/SMA]
    ORQ --> T4[Sector benchmarks]
    T1 & T2 & T3 & T4 --> CACHE[(DuckDB cache · TTL)]
    CACHE --> FILT[Hard filters]
    FILT --> SCORE[Weighted scoring 0-10]
    SCORE --> REAS[Reasoning Sonnet]
    REAS --> GUARD{Guardrail: numbers verified?}
    GUARD -- No --> DESC[Drop justification]
    GUARD -- Yes --> RANK[Ranking + grounded justification]
    RANK --> UI[Streamlit: ranking, P/L, equity, trace]
---

A **demonstrative** trading bot that understands natural-language queries
(e.g. *"undervalued tech with positive momentum"*) and runs a stock screening
with **explicit, data-grounded reasoning**.

## What it does

- Turns the query into structured screening criteria.
- Downloads real data (yfinance) from the S&P 500 universe.
- Computes technical indicators (RSI, MACD, moving averages) in pure pandas.
- Filters by fundamental criteria (P/E, debt, growth) relative to the sector
  median.
- Scores candidates and **justifies each pick with real figures**, with a
  *guardrail* that checks no cited number is fabricated.

## Stack and architecture

- Multi-turn agent with **tool use** (Anthropic SDK): Haiku to parse the query,
  Sonnet for the final reasoning.
- Screener with weighted scoring + anti-hallucination grounding.
- Simulated **MockBroker** ($100k virtual portfolio), with a template interface
  ready to plug a real broker (Alpaca / IBKR).
- **Streamlit** dashboard with positions, live P&L, equity curve and an agent
  trace panel.

## Productionization

- Local DuckDB cache with TTL.
- Rate limiting with retries and exponential backoff.
- Risk management (max 5% of the portfolio per position, no duplicates).
- 30+ automated tests.

> Educational / portfolio project. **Not financial advice.**
