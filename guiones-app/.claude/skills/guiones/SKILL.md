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
| **tanda** | el usuario da ideas, temas, anécdotas o intereses sueltos y pide varios guiones | N guiones distintos (ver "Modo tanda") |

## Forma de trabajo principal: conversación

El usuario habla como con cualquier IA: "creemos guiones de <universidad> para <programa>". La respuesta por defecto es una
**tanda de 6 opciones muy distintas entre sí** (cada una con gancho, estructura y fórmula ganadora diferentes), numeradas,
para que elija. No le pidas llenar formularios; lo que falte se decide con `config/defaults.md` y se dice en una línea.

**"Me gusta el N" / "más como este":** guarda el ganador en `guiones/favoritos.md` con su ADN (tipo de gancho, estructura,
fórmula, duración, tono, CTA). Luego genera variantes que **conservan ese ADN** y cambian el contenido: otro programa, otra
universidad, otro ángulo u otra objeción. Si el usuario dice "ahora para <programa>", aplica el ADN del favorito a ese programa.

Cada tanda se guarda en `guiones/AAAA-MM-DD_<marca>_<programa>.md`.

**Nivel profesional, obligatorio en cada tanda** (la primera tanda de prueba salió básica por saltarse esto):
1. Antes de escribir, lee `studio-script/references/hooks.md`, `script-rules.md`, `funnel.md`, `viral.md` y `ai-tells.md`.
2. Cada opción usa una fórmula distinta de `hooks.md` (nómbrala) y saca 7/10 o más en su puntaje de gancho.
3. Al menos la mitad de la tanda va en **embudo**: abre con un tema que le importa a mucha gente (dinero, la DIAN, la IA,
   el trabajo, una escena cotidiana) y gira al programa entre el 20 % y el 35 % del guion. Pocas opciones hablan del programa desde el segundo 0.
4. Cada gancho lleva un dato concreto (número, marca, escena) y dice qué se ve en el segundo 0. Hay un reenganche entre el 40 % y el 60 %.
5. Nada de frases de IA (`ai-tells.md`): sin "no es X, es Y", sin tríadas de adjetivos, sin "¿el resultado?".
6. Datos del sector (impuestos, normas, cifras) solo si son ciertos; lo que dependa del año va `[CONFIRMAR]`.
7. Al terminar: `node tools/panel.mjs <ruta del artifact>` y republica el panel para que la tanda aparezca ahí.

## Modo tanda (ideas libres → muchos guiones)

Es el modo por defecto cuando el usuario escribe ideas en vez de un brief. **No todo guion es sobre un programa**:
puede ser sobre vida universitaria, hábitos de estudio, dudas de aspirantes, una tendencia, una anécdota, una opinión.

1. **Lee todas las ideas** y extrae los temas de fondo (los "intereses"). Una idea puede dar varios guiones con ángulos distintos.
2. **Arma el plan** como tabla: n.º, idea de origen, ángulo, estructura (`knowledge/estructuras.md`), tipo de gancho
   (`knowledge/ganchos.md` / `studio-script` hooks), duración, objetivo y CTA. Reglas de variedad:
   - nunca el mismo tipo de gancho dos veces seguidas, ni la misma estructura tres veces en la tanda;
   - mezcla objetivos: la mayoría de alcance/valor y pocos de venta (en 5 guiones: máx. 1 de cierre);
   - si el usuario pidió "serie", misma estructura en todos y cambian ganchos y ángulos.
3. Si el usuario pidió ver el plan primero, muéstralo y espera. Si no, escribe todos de una.
4. **Escribe cada guion** con el flujo normal (pasos 4–8 de abajo). Sin universidad o programa: la especificidad sale de la
   idea (el detalle concreto, la anécdota, la frase real del público). Con universidad: añade su dato o CTA solo donde encaje.
5. Guarda la tanda en un solo archivo `guiones/AAAA-MM-DD_tanda_<tema>.md` con la tabla del plan arriba y cada guion debajo,
   en el formato de beats. Corre `tools/revisar.mjs` por guion (puedes separar cada uno en un archivo temporal).
6. Cierra con un resumen corto: cuántos, qué ángulos y qué hay que confirmar.

Para tandas de 5 o más, puedes escribir los guiones en paralelo con subagentes, uno por guion, cada uno con el plan, la idea
y estas reglas; luego revísalos tú.

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

- **Nada genérico.** Cada guion debe tener al menos un detalle concreto que no saldría de una IA cualquiera: un dato del
  programa (si el guion es de un programa), la anécdota o frase real que dio el usuario, o una situación precisa de la audiencia.
  Si el guion es de una universidad, debe tener algo que solo aplique a ella. Si podría publicarlo cualquier cuenta igual, reescríbelo.
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
