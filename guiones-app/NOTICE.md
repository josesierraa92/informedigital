# NOTICE — fuentes de la metodología

Este proyecto reescribe y adapta al sector educativo, en español, ideas de estos repos públicos.
No incluye su código ni depende de sus servicios.

| Repo | Licencia | Qué se tomó |
|---|---|---|
| rediumvex/viral-hooks-skill | MIT (© 2026 Roman Knox) | Idea de organizar ganchos por 10 disparadores psicológicos y el flujo "3 ganchos de categorías distintas". Las fórmulas de `knowledge/ganchos.md` están reescritas para educación. |
| dungnotnull/viral-video-script-builder-agent-skill | sin LICENSE visible en el repo | Solo la idea del proceso intake → estructura → puntaje → crítica → mejoras y la ponderación de la rúbrica. Texto propio. |
| beatra-ai/viral-video-remake-skill | MIT-0 | Principios del desmontaje: no inventar diálogo, tablas de evidencia, "no puntajes absolutos sin base", jerarquía de fuentes del diálogo. No se usa su conector de pago. |
| fendouai/ViralForge | Apache-2.0 | Separar "estructura que se conserva" de "contenido que se reemplaza", reporte de ADN, variantes. No se usa su CLI ni nube. |

## Skills de terceros instaladas tal cual en `.claude/skills/`

Copiadas sin modificar (salvo quitar sus carpetas `evals/`). Licencias completas en `third_party_licenses/`.

| Skills | Repo | Licencia |
|---|---|---|
| copy-editing, marketing-psychology, offers | coreyhaines31/marketingskills | MIT |
| studio-script | Melvynx/video-agent-skills | MIT |
| viral-hooks | rediumvex/viral-hooks-skill | MIT |
| caption-generator (`social-captions`) | rediumvex/social-media-caption-generator-claude | MIT |

Revisadas y **no** instaladas: superdesign (depende de su canvas en la nube), beatra viral-video-remake (conector de pago),
ViralForge (CLI y nube propios), oil-ui (scripts y documentación en chino).

Instaladas y luego quitadas por no funcionar aquí o no usarse (siguen en el historial de git): outliers e insta-audit
(necesitan Treg/YouTube, bloqueados), ad-creative, content-strategy, customer-research, social, copywriting y frontend-design.

Marcos clásicos citados en `knowledge/estructuras.md` (AIDA, PAS, Cialdini, Fogg, Berger/STEPPS, Loewenstein)
son conocimiento público de sus autores.
