# CLAUDE.md

Guía para trabajar en este proyecto. Léela antes de empezar.

## Qué es

Presentación/dashboard interactivo del **Informe de Canal Digital de Unieduca**
(leads del embudo comercial). Es una SPA de slides que se navegan con los botones
Anterior/Siguiente. Se usa como informe mensual y se despliega en Vercel.

- **Stack:** React 19 + Vite 6 + Tailwind CSS v4 + Recharts + Motion (framer-motion).
- **No hay backend ni base de datos.** Todos los datos están **hardcodeados** como
  strings CSV dentro de `src/data.ts` y se parsean en el cliente.

## Comandos

```bash
npm run dev      # servidor de desarrollo -> http://localhost:3000 (host 0.0.0.0)
npm run build    # build de producción a dist/
npm run lint     # type-check (tsc --noEmit)
```

> Nota: `npm run lint` (tsc) reporta 2 errores preexistentes que **no rompen nada**:
> uno en `fix.ts` (archivo suelto, no se importa en ningún lado) y un `React.ReactNode`
> en Dashboard. Vite usa esbuild e ignora errores de tipos, así que el build sí pasa.
> No pierdas tiempo con esos dos salvo que se pida.

## Estructura

```
src/
  main.tsx                 # entry (monta <App/>)
  App.tsx                  # solo renderiza <Dashboard/>
  index.css                # Tailwind v4 (@import "tailwindcss") + tema oscuro
  utils.ts                 # cn() (clsx + tailwind-merge)
  data.ts                  # << TODOS LOS DATOS y funciones de agregación
  components/
    Dashboard.tsx          # << TODA la UI: un array `slides` de componentes
public/
  logo-unieduca.png        # logo oficial usado en el header
```

- `Dashboard.tsx` es un componente grande con un array `slides` (cada slide es una
  función que devuelve JSX). El header y el footer de navegación son fijos.
- El tema es oscuro verde-negro (`#02120e` fondo, `#00df9a` acento turquesa).

## Modelo de datos (IMPORTANTE)

En `data.ts` hay **tres datasets CSV** independientes, cada uno como template literal,
parseados por la función compartida `parseCsv(raw)`:

| Constante          | Función        | Qué contiene                                             |
|--------------------|----------------|----------------------------------------------------------|
| `rawData`          | `parseData()`  | Pipeline principal del mes (todos los leads, ~167 filas) |
| `ganadosRawData`   | `getGanados()` | Cierres del mes (Ganados). Dataset curado.               |
| `cuponesRawData`   | `getCupones()` | Leads con Cupón / Alta Intención. Dataset curado.        |

**Por qué datasets separados:** los ganados y cupones incluyen leads de convocatorias
anteriores que **no** están en el pipeline principal, por eso no se pueden derivar
filtrando `rawData`. Se mantienen aparte y se usan directamente en sus slides.

### Orden de columnas del CSV (reporte "22 julio" en adelante)

`parseCsv` mapea por **índice de columna**. El orden actual es:

```
0 Nº              9  ÁREA DE ESTUDIO   18 F. PAGO RESERVA   27 TRANSFERIDO
1 ESTADO          10 FACULTAD          19 MES CIERRE        28 INF. CONVENIO
2 ASESOR          11 TÍTULO INTERÉS    20 INICIO CLASES     29 INF. FINANCIERO
3 NOMBRE          12 ÚLTIMOS ESTUDIOS  21 DESCUENTO         30 HOMOLOGACIÓN
4 CANAL           13 DEPARTAMENTO      22 VALOR INICIAL     31 FECHA CREADA
5 # DIGITAL       14 CIUDAD            23 VALOR FINAL        32 ÚLTIMA ACTUALIZACIÓN
6 TELÉFONO        15 EMPRESA           24 PASA CUPÓN
7 UNIVERSIDAD     16 EMAIL             25 COMENTARIO DIR
8 CONVOCATORIA    17 MÉTODO PAGO       26 F. ULT. SEGUIMIENTO
```

⚠️ **El orden de columnas ha cambiado entre exports.** Si llega un CSV nuevo, **revisa
la cabecera primero**. Si difiere, actualiza los índices en `parseCsv` (tienen un
comentario con este mapa) — no basta con pegar los datos.

## Cómo actualizar los datos con un CSV nuevo (workflow probado)

1. **Guarda el CSV en disco y léelo desde ahí**, NO copies el texto pegado en el chat.
   Los CSV pegados llegan con acentos corruptos (mojibake: `MaestrÃ­a` en vez de
   `Maestría`). El archivo real suele ser UTF-8 con BOM y sale limpio con la tool Read.
2. **Compara la cabecera** con el mapa de arriba. Si cambió el orden, ajusta `parseCsv`.
3. **Reemplaza el template literal** correspondiente (`rawData` / `ganadosRawData` /
   `cuponesRawData`) con el contenido nuevo:
   - Quita el BOM, normaliza CRLF→LF, `trim()`.
   - Escapa para template literal JS: `\` → `\\`, `` ` `` → `` \` ``, `${` → `\${`.
   - Los valores de dinero traen `$ 13.147.500` (con espacio/nbsp) — ojo de no dejar
     un `${` accidental.
   - **No olvides el backtick de cierre** del literal (error clásico: "Unterminated
     string literal").
4. **Verifica** con un script temporal en la raíz del proyecto (para que resuelva los
   imports) usando `npx tsx`, p. ej.:
   ```js
   // _verify.mjs  (bórralo al terminar)
   import { parseData, getGanados, getCupones, getKPISummary } from "./src/data.ts";
   console.log(getKPISummary(parseData()));
   ```
   `npx tsx _verify.mjs` y luego `rm _verify.mjs`.
5. `npm run build` para confirmar que compila.

## Números y textos hardcodeados (no derivados de los datos)

Cuando pidan "cambiar X a Y", suele ser un valor fijo en `Dashboard.tsx`:

- **"Leads Total Otoño 2026"** (portada de universidades): número fijo (ej. `673`).
  El otro número grande de esa slide sí es `{kpis.total}` (derivado).
- **Tendencia de Ganados por Mes** (slide ~11): array `ganadosMesData` con valores
  por mes escritos a mano.
- **"N pasan a cupón"** en Distribución Estado de Leads: texto fijo.
- **Distribución Estado – Ganados:** se **sobreescribe** el conteo a `ganadosMes.length`
  (el pipeline solo tiene 2 ganados; el real del mes son 9). Ver `adjustedByStatus`.
- **Eficiencia Comercial:** `getAdvisorStats(leads, ganadosMes)` usa el dataset de
  ganados como fuente **autoritativa** de "won". Ojo: algunos ganados están en el
  pipeline con OTRO estado (p. ej. Jackelin #1856 = Valorando/Cupón), por eso NO basta
  con contar los 'ganado' del pipeline. La función salta los `# Digital` que están en
  el dataset de ganados al clasificar el pipeline (para no meterlos en "en proceso") y
  suma al total solo los ganados que no vienen ya en el pipeline.

## Verificación visual sin abrir el navegador

Hay Chrome instalado. Para confirmar que la página renderiza (no está en blanco) y que
un valor está en el DOM, usar Chrome headless:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless --disable-gpu \
  --no-sandbox --virtual-time-budget=6000 --dump-dom "http://localhost:3000/" \
  | grep -oE "Unieduca|673|logo-unieduca.png"
```

También sirve `curl -s http://localhost:3000/src/components/Dashboard.tsx` para
comprobar que el dev server ya sirve el código actualizado (HMR).

## Assets / logo

- El logo del header es `public/logo-unieduca.png`, referenciado como
  `<img src="/logo-unieduca.png">`. Vite sirve `public/` en la raíz.
- El PNG ya incluye el wordmark "Unieduca", por eso el header NO lleva texto aparte.
- Nombres de archivo en `public/` **sin espacios** (evita problemas de URL).
- ⚠️ Las imágenes que el usuario **pega en el chat** no quedan como archivo en disco:
  no se pueden usar como asset. Hay que pedir que las guarden en `public/`.

## Deploy (GitHub + Vercel)

- **Remote:** `origin` → `https://github.com/josesierraa92/informedigital.git`,
  rama `main`. Las credenciales de git ya están cacheadas en esta máquina.
- `gh` (GitHub CLI) **no está instalado** — usar `git` directamente.
- El repo está conectado a **Vercel**: hacer **push a `main` dispara el redeploy
  automático**. No hay `vercel.json`; Vercel autodetecta Vite (build `vite build`,
  output `dist/`).

Flujo para publicar cambios:
```bash
git add <archivos>
git commit -m "mensaje"
git push origin main         # -> Vercel redeploya solo
```

> Solo commitear/pushear cuando el usuario lo pida. `.gitignore` ya excluye
> `node_modules/`, `dist/`, `.env*`.

## Entorno

- Windows 11, PowerShell + Git Bash disponibles.
- Node v24. Dependencias ya instaladas (`node_modules/` presente).
