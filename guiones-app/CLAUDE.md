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

Además de `guiones` (orquestador) hay 14 skills de terceros en `.claude/skills/` (lista y licencias en `NOTICE.md`).
La tabla de cuándo usar cada una está en `.claude/skills/guiones/SKILL.md`. Las clave:
`studio-script` (guionista + quitar tono de IA), `outliers` / `studio-script viral` (qué es viral en el nicho, medido),
`marketing-psychology`, `offers`, `ad-creative`, `copywriting`, `frontend-design` (diseño del panel).

`studio-script`, `outliers` e `insta-audit` leen `video-agent/voice.md`: se genera desde `marcas/<slug>.md`
con `video-agent/_voice-plantilla.md` cada vez que cambia la marca activa.

Red: la búsqueda de virales necesita acceso a YouTube (yt-dlp) o Treg (TikTok/Instagram, de pago y con login).
Si el entorno no lo permite, se trabaja con transcripciones pegadas.

## Panel visual

`panel/index.html` es el Taller de Guiones (configurar pedido, ganchos, estructuras, revisión rápida). Se abre en el
navegador sin servidor. La versión publicada está en claude.ai como artifact privado.

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
