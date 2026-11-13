# Guiones App

Motor de guiones de video corto para universidades. Combina:

- **Biblioteca incorporada** de ganchos, estructuras y ventas en educación (no necesitas buscar videos).
- **Desmontaje** de cualquier video que le pases (transcripción, descripción o link) para extraer su ADN y rehacerlo con tu marca.
- **Perfiles por universidad y programa**, para que el guion nunca sea genérico.
- **Revisión automática** de duración, cumplimiento y formato.

No hay servidor ni API key: el motor es Claude Code trabajando en esta carpeta.

**Especialistas incluidos** (skills de terceros, ver `NOTICE.md`): guionista con 22 fórmulas de gancho y paso
anti-IA (`studio-script`), buscador de videos que rompen la media de cada cuenta (`outliers`, `studio-script viral`),
auditoría de Instagram (`insta-audit`), psicología de persuasión, ofertas, anuncios, copywriting, captions,
estrategia de contenido, investigación de audiencia y diseño de interfaz (`frontend-design`).

**Panel visual:** abre `panel/index.html` en el navegador.

## Empezar

1. Copia `marcas/_plantilla.md` a `marcas/<tu-universidad>.md` y llénalo (lo que no sepas, déjalo vacío).
2. Pide un guion, por ejemplo:
   > "Guion de 30 s para [programa] de [universidad], captar leads, profesional que trabaja, objeción tiempo, TikTok."
3. O pasa un video:
   > "Desmonta este video: [transcripción o link]" → luego → "Hazlo para [programa]".
4. Verifica a mano si quieres: `node tools/revisar.mjs guiones/<archivo>.md --seg 30 --marca <slug>`

Todas las opciones configurables están en `briefs/_plantilla.md`.

## Qué es configurable

Marca y programa · objetivo · etapa del embudo · audiencia · objeción principal · plataforma · duración ·
ritmo de voz · nivel de producción · con/sin cara · persona que habla · tono · regionalismo · estructura ·
estilo de gancho · n.º de variantes · CTA y palabra clave · fecha límite · referencia y qué tomar de ella ·
cosas a evitar/obligatorias.

## Límites honestos

- Nadie garantiza que un video sea viral; el motor entrega la mejor hipótesis y un registro (`resultados/`) para medir.
- No tiene acceso a datos de tendencias en tiempo real; las tendencias entran cuando tú traes un video o dato.
- Los datos de cada universidad salen solo de `marcas/`; lo que falta queda como `[CONFIRMAR]`.

## Hoja de ruta

- v1 (esto): perfiles, ganchos, estructuras, desmontaje, revisor, variantes, registro manual.
- v2: análisis automático del registro de resultados, conexión con el dashboard de leads para priorizar programas, importador de transcripciones.
