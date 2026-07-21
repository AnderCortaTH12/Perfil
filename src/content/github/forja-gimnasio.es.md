---
slug: "forja-gimnasio"
idioma: "es"
titulo: "Gimnasio - FORJA"
descripcion: "PWA de seguimiento de entrenamiento offline-first con plantillas de ejercicios, registro de sesiones, análisis de progreso y métricas corporales."
repo: "https://github.com/AnderCortaTH12/Gimnasio"
demo: "https://gimnasio-seven-khaki.vercel.app/"
lenguaje: "React + TypeScript"
tags: ["PWA", "Fitness", "Tracking", "IndexedDB", "Offline-first"]
skills: ["React 18", "TypeScript", "Tailwind CSS 3", "Dexie", "IndexedDB", "Zustand", "Recharts", "framer-motion"]
destacado: true
capturas:
  - src: "/proyectos/forja/forja-today.png"
    alt: "Pantalla de hoy con el entrenamiento actual"
  - src: "/proyectos/forja/forja-session.png"
    alt: "Registro de sesión con series y pesos"
  - src: "/proyectos/forja/forja-progress.png"
    alt: "Gráficas de progreso y volumen"
  - src: "/proyectos/forja/forja-catalog.png"
    alt: "Catálogo de ejercicios o perfil con métricas"
---

**FORJA** es una aplicación web progresiva (PWA) monousuario para el seguimiento de entrenamientos de resistencia. Toda la persistencia es en el navegador mediante IndexedDB, sin backend ni login: los datos nunca salen del dispositivo.

## Arquitectura offline-first

La capa de datos está completamente aislada en `src/db/`, con un modelo de datos normalizado y queries directas a IndexedDB a través de Dexie. De esta forma, el interfaz de usuario es agnóstico respecto a dónde viven los datos, y la app funciona sin conexión con la misma fluidez que online. El estado global está centralizado en Zustand, y Astro garantiza build-time routing y code-splitting automático.

## Funcionalidades destacadas

- **Onboarding inicial** personalizable: altura, peso, sexo y objetivos.
- **Catálogo de ~1.324 ejercicios** con GIFs demostrativos, organizados por grupo muscular.
- **Plantillas de entrenamiento** semanales con días preconfigurados.
- **Registro de sesiones** en tiempo real con gestos táctiles, temporizador de descanso automático y detección de récords personales.
- **Análisis de progreso** con gráficas de volumen total (kg × reps), fuerza máxima y tendencias.
- **Métricas corporales**: peso, altura, IMC y evolución a lo largo del tiempo.
- **Export/import de backup** en JSON para cambiar de dispositivo o hacer restore.
