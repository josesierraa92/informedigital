# CLAUDE.md — guiones-app

Motor de guiones de video corto para universidades. No es una app web: **Claude Code es el motor**
(sin API key, sin deploy). La inteligencia vive en archivos `knowledge/` y en el skill `guiones`.

## Cómo se usa

Abrir Claude Code en esta carpeta (`guiones-app/`) y pedir, por ejemplo:

- "Guion de 30 s para Maestría en X de <universidad>, objetivo captar leads, público profesional que trabaja"
- "Desmonta este video: <link o transcripción>" y luego "hazlo para <programa>"
- "Dame 5 variantes del gancho"
- "Revisa este guion: …"

El skill es `.claude/skills/guiones/SKILL.md`. Léelo antes de generar cualquier guion.

## Estructura

```
.claude/skills/guiones/SKILL.md   # orquestador (flujo, modos, reglas)
knowledge/
  ganchos.md            # biblioteca de ganchos por disparador psicológico
  estructuras.md        # estructuras de guion por objetivo/duración
  ventas-educacion.md   # objeciones, embudo, CTAs del sector educativo
  cumplimiento.md       # qué no se puede prometer
  desmontaje.md         # cómo analizar un video de referencia
  revisor.md            # rúbrica de puntaje y autocrítica
config/
  formatos.md           # duraciones, plataformas, ritmo
  defaults.md           # valores por defecto cuando falta algo del brief
  frases-prohibidas.json# lo usa tools/revisar.mjs
marcas/                 # un perfil por universidad (_plantilla.md)
briefs/_plantilla.md    # todas las opciones configurables
guiones/                # salida
referencias/            # informes de ADN de videos analizados
resultados/             # métricas reales de lo publicado (memoria)
tools/revisar.mjs       # verifica duración + cumplimiento + formato
```

## Skills especialistas instaladas

Además de `guiones` (orquestador) hay 6 skills de terceros en `.claude/skills/` (licencias en `NOTICE.md`):
`studio-script` (guionista y paso que quita el tono de IA), `viral-hooks`, `marketing-psychology`, `copy-editing`,
`offers` y `caption-generator`. La tabla de cuándo usar cada una está en `.claude/skills/guiones/SKILL.md`.

`studio-script` lee `video-agent/voice.md`: se genera desde `marcas/<slug>.md` con `video-agent/_voice-plantilla.md`
cada vez que cambia la marca activa.

Medir qué es viral no está disponible aquí (necesita YouTube o Treg, bloqueados). Si hay un video de referencia, se
trabaja con su transcripción en el modo desmontar.

## Panel visual

El artifact "Estudio de Guiones" en claude.ai muestra todas las tandas en tarjetas y sirve de vitrina. Se arma desde
`panel/template.html` con `node tools/panel.mjs <archivo>` (que también escribe `panel/index.html`) y se republica tras cada
tanda. Los guiones se piden por el chat de Claude Code, donde corren las skills completas.

## Reglas de trabajo

- Idioma de todo: español (neutro latinoamericano salvo que la marca pida otro regionalismo).
- Antes de entregar un guion, corre `node tools/revisar.mjs` (ver SKILL.md).
- Los datos de cada universidad salen **solo** de `marcas/`. Lo desconocido se marca `[CONFIRMAR]`.
- No copiar texto ni media de videos de terceros; se toma la estructura.
- Para agregar conocimiento nuevo (un gancho que funcionó, una estructura nueva) edita los archivos de
  `knowledge/`; el skill los lee en cada corrida.
- Cuando un video publicado tenga métricas, anótalas en `resultados/registro.md`; así el motor aprende qué repetir.

## Origen del conocimiento

Metodología adaptada de repos públicos (ver `NOTICE.md`). No se instalan ni se llaman sus servicios externos.
