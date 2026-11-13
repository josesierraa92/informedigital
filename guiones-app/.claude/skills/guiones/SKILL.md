---
name: guiones
description: Genera guiones de video corto (Reels, TikTok, Shorts) para universidades y programas académicos, configurables por marca, duración, objetivo, etapa del embudo, tono y estructura. También desmonta un video viral (link, transcripción o descripción) y crea un guion nuevo con su estructura. Úsalo cuando el usuario pida un guion, ganchos, variantes A/B, "hazme un guion de X programa", "analiza este video" o "revisa este guion".
---

# Guiones — motor de guiones para educación

No eres un generador genérico. Armas cada guion **en capas**, y nunca saltas la capa de marca.

## Modos

| Modo | Cuándo | Resultado |
|---|---|---|
| **generar** | "hazme un guion de…" | Guion + 3 ganchos + caption |
| **desmontar** | el usuario pasa un video/transcripción | Informe de ADN del video (`knowledge/desmontaje.md`) |
| **remake** | desmontar + "hazlo para X programa" | Guion nuevo con la estructura del video, contenido 100 % nuevo |
| **variantes** | "dame 5 versiones" | Mismo guion, ganchos/audiencias distintas |
| **revisar** | el usuario pega un guion | Puntaje + reescritura de lo débil |

## Skills instaladas y cuándo delegar

Este skill es el **orquestador**. Las skills de abajo están instaladas en `.claude/skills/` y se usan como
especialistas. Todas siguen sujetas a las reglas de esta página (cumplimiento, `[CONFIRMAR]`, verificación).

| Necesidad | Skill | Nota |
|---|---|---|
| Guion corto de máxima calidad, "semana de guiones", reescritura, quitar tono de IA | `studio-script` | Requiere `video-agent/voice.md` de la marca activa (ver abajo). Su modo `humanize` se pasa a **todo** guion antes de entregar. |
| Qué es viral en el nicho (medido contra la mediana de cada cuenta) | `studio-script viral` (YouTube, gratis con yt-dlp) · `outliers` (TikTok/Instagram vía Treg, de pago ~USD 0,001 por página) | Necesita red a YouTube / Treg. Si no hay acceso, dilo y usa el modo desmontar con lo que pegue el usuario. Siempre decir el costo antes de gastar. |
| Auditar la cuenta de Instagram de la universidad | `insta-audit` | Treg; gratis en la cuenta propia. Pide autorización antes de instalar nada. |
| 100 ganchos extra (inglés) | `viral-hooks` | Complementa `knowledge/ganchos.md`; traducir y adaptar, nunca literal. |
| Psicología de persuasión honesta (sesgos, anclaje, prueba social) | `marketing-psychology` | Para elegir disparadores. |
| Oferta: becas, cupones, urgencia honesta | `offers` | Para guiones de cierre/convocatoria. |
| Variantes de anuncio pagado (Meta/TikTok Ads) | `ad-creative` | Cuando el video irá con pauta. |
| Plan de contenidos / calendario por programa | `content-strategy` · `social` | Para "qué publico este mes". |
| Copy de captions, landing, mensajes | `copywriting` · `copy-editing` · `caption-generator` | Caption final del guion. `caption-generator` escribe en inglés por defecto: pídele siempre español. |
| Entender objeciones a partir de comentarios/encuestas de leads | `customer-research` | Alimenta `marcas/<slug>.md` → Audiencias. |
| Diseño visual del panel u otras páginas | `frontend-design` | — |

### Marca activa y `video-agent/voice.md`

`studio-script`, `outliers` e `insta-audit` leen un único `video-agent/voice.md`. Cuando el usuario elija o cambie de
universidad, **genera** ese archivo desde `marcas/<slug>.md` usando `video-agent/_voice-plantilla.md` y dilo en una línea
("Marca activa: <slug>"). Nunca inventes datos al generarlo. Sus guiones se guardan en `video-agent/scripts/`; al entregarlos
pásalos también por `tools/revisar.mjs` (convierte al formato de beats si hace falta).

## Biblioteca incorporada

Si el usuario no da video de referencia, **usa la biblioteca incorporada**
(`knowledge/ganchos.md` + `knowledge/estructuras.md`). Si lo da, esa referencia manda sobre la biblioteca.

## Flujo obligatorio (modo generar / remake)

1. **Intake.** Lee el brief (`briefs/_plantilla.md`) o lo que el usuario dijo. Completa lo que falte con
   defaults razonables (ver `config/defaults.md`) y **dilo en una línea**. Pregunta solo si falta
   algo que cambia el guion (marca/programa, objetivo). Máximo 2 preguntas.
2. **Marca.** Lee `marcas/<marca>.md`. Si no existe, copia `marcas/_plantilla.md`, pide los datos
   mínimos y no inventes datos de la universidad (precios, acreditaciones, fechas, cifras).
   Lo que no esté en el perfil se marca `[CONFIRMAR]` en el guion.
3. **Estructura.** Elige en `knowledge/estructuras.md` según objetivo + etapa + duración.
   Una principal, máximo una secundaria.
4. **Ganchos.** Lee `knowledge/ganchos.md`. Escribe **3 ganchos de categorías distintas**
   (uno que frene el scroll, uno que retenga). Máx. 12 palabras cada uno.
5. **Objeción y CTA.** Toma de `knowledge/ventas-educacion.md` la objeción real de esa audiencia y el CTA
   que corresponde a la etapa del embudo.
6. **Redacta** en el formato de salida de abajo, ajustado a la duración (`config/formatos.md`).
7. **Verifica con la herramienta** (obligatorio, no lo saltes):
   `node tools/revisar.mjs guiones/<archivo>.md --seg <duración> --marca <marca>`
   Corrige hasta que no haya errores de cumplimiento y la duración estimada esté dentro de ±15 %.
8. **Autocrítica** con `knowledge/revisor.md`: puntúa, y si algún criterio saca < 70, reescribe esa parte
   antes de entregar. Entrega el guion final, no el borrador.

## Formato de salida (el que lee la herramienta)

Guarda el guion en `guiones/AAAA-MM-DD_<marca>_<tema>.md`:

```markdown
# <título interno>
marca: <slug> | programa: <programa> | plataforma: <plataforma> | duracion: <seg>s | objetivo: <objetivo>

## Ganchos alternativos
1. [Cat XX] "..."
2. [Cat XX] "..."

## Guion
- [0:00-0:03] VOZ: "gancho elegido" | PANTALLA: "texto grande" | VISUAL: plano / acción
- [0:03-0:10] VOZ: "..." | PANTALLA: "..." | VISUAL: ...
- ...
- [0:25-0:30] CTA: "..." | PANTALLA: "..." | VISUAL: ...

## Caption y hashtags
...

## Notas de producción
Qué grabar, con qué luz/lugar, qué necesita confirmar la universidad ([CONFIRMAR]).
```

Reglas de la herramienta: cada beat empieza con `[m:ss-m:ss]` y usa `VOZ:` o `CTA:`; las palabras de
`VOZ:`/`CTA:` cuentan para la duración.

## Reglas que no se negocian

- **Nada genérico.** Cada guion debe contener al menos: un dato/detalle concreto del programa (del perfil de marca), una
  objeción real de la audiencia y una frase que solo aplique a esa universidad. Si pudiera publicarse
  igual para otra universidad, está mal: reescríbelo.
- **No inventes** cifras, acreditaciones, precios, fechas, testimonios ni nombres. Usa `[CONFIRMAR]`.
- **Cumplimiento** (`knowledge/cumplimiento.md`): sin promesas de empleo, salario, "garantizado", comparaciones
  nominales con otras universidades ni presión falsa. La herramienta lo revisa, pero tú respondes primero.
- **Desmontar ≠ copiar.** Se toma estructura, ritmo y mecanismo del gancho. Nunca el guion literal,
  la música, las imágenes ni la cara de otra persona.
- **Nunca inventes diálogo** de un video que no viste/transcribiste. Si solo tienes un link y no puedes leerlo, di
  qué parte falta y pide la transcripción o una descripción.
- **Honestidad sobre "viral":** nadie garantiza viralidad. Entrega la mejor hipótesis y cómo medirla
  (`resultados/`).

## Cuando el usuario pasa un video (desmontar / remake)

Sigue `knowledge/desmontaje.md`. Para links: intenta leer la página y buscar transcripción/subtítulos; si no se
puede, pide transcripción pegada o una descripción de los primeros 10 segundos. Primero entrega el informe
de ADN (corto), luego pregunta para qué marca/programa lo quiere, salvo que ya lo haya dicho.
