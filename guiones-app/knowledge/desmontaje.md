# Desmontaje de un video de referencia

Objetivo: entender **por qué funciona** y extraer una estructura reutilizable, **sin copiar** el contenido.

## Qué entrega el usuario (de mejor a peor fuente)

1. **Transcripción pegada** (mejor). 
2. **Descripción** de los primeros 10 s + texto en pantalla + duración + métricas visibles.
3. **Link**: intenta leer la página (título, descripción, subtítulos si hay). Muchas plataformas no entregan el audio.
   Si no se puede obtener el diálogo, **dilo y pide transcripción o descripción**. No lo supongas.
4. **Archivo de video**: solo se puede analizar lo que se describa/transcriba; no hay herramienta de video integrada.

**Nunca inventes una línea de diálogo.** Si no la tienes, la fila queda `[NO DISPONIBLE]`.
No afirmes nada sobre audio/música que no se haya dicho.

## Informe de ADN (formato)

```markdown
# ADN — <título corto> (<plataforma>, <duración>s)
Fuente: <link/usuario> · Calidad de la fuente: transcripción | descripción | solo link

## 1. Veredicto en 2 líneas
Por qué funciona (hipótesis) y qué se puede transferir.

## 2. Mapa por tiempos
| t (s) | Qué pasa | Texto en pantalla | Función (gancho / retención / pago / CTA) |
|---|---|---|---|

## 3. Gancho
- Texto/acción literal de los primeros 3 s (cita corta, no el guion entero)
- Mecanismo: curiosidad / contrario / identidad / prueba / negación…  (ver `ganchos.md`)
- Tiempo hasta la primera promesa:

## 4. Ritmo
- N.º aproximado de cambios de plano/texto, duración media, aceleración o pausas.
- Dónde se reengancha (bucles abiertos, giros).

## 5. Disparadores
Emociones/sesgos usados y cómo (identidad, prueba social, escasez real o falsa, humor…).

## 6. CTA
Qué pide, cuándo, qué tan fácil es.

## 7. Estructura a conservar  ←→  Contenido a reemplazar
| Conservar | Reemplazar |
|---|---|
| orden de beats, duración por beat, tipo de gancho, ritmo | tema, datos, frases, imágenes, música, cara, marca |

## 8. Límites del análisis
Qué no se pudo ver y qué es hipótesis.
```

## Reglas del análisis

- **Sin puntajes absolutos.** Una nota "8,5/10" sin base de comparación es precisión inventada. Usa juicios direccionales
  ("más fuerte que lo habitual en X porque …", citando la fila del mapa).
- **Distingue observación de inferencia:** lo que se ve/oye vs. lo que se supone sobre por qué funcionó.
- Una sola muestra no prueba un patrón. Si el usuario da 3–5 videos, busca lo que **se repite** y presenta eso como
  patrón; lo de un solo video, como hipótesis.
- Guarda el informe en `referencias/AAAA-MM-DD_<nombre>.md` para reutilizarlo.

## Remake (de ADN a guion nuevo)

1. Fija la estructura a conservar (tabla 7).
2. Pide marca/programa/objetivo si faltan.
3. Redacta el guion nuevo con el mismo orden de beats y ritmo, pero **frases, ejemplos y datos propios** de la marca.
4. Verifica que ninguna frase repita el original (más de 4 palabras seguidas iguales = reescribir).
5. No copiar música, imágenes, voz ni rostro del original. Si el original usa un meme/trend, sugiere la versión propia o un audio con licencia.
6. Pasa `tools/revisar.mjs` y la rúbrica `revisor.md`.

## Legal/ético

Analizar un video público para aprender su estructura es práctica normal de la industria; replicar su contenido no.
Los links a otras plataformas pueden tener términos que limiten la descarga: no descargar, analizar lo que el usuario aporte.
