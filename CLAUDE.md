# castorene.cl — instrucciones completas para una IA

Sitio personal académico de **Bastián Castorene**, candidato a Doctor en Física (UTFSM & PUCV, Chile).
Este archivo es la fuente de verdad. Léelo entero antes de tocar nada.

> Guardado como `CLAUDE.md` porque las herramientas de IA lo leen solas. Si usas otra, apúntala aquí.

---

## 0. Qué es esto y qué NO es

**Sitio estático puro: HTML + CSS + JavaScript. Sin frameworks, sin build, sin dependencias, sin npm.**
Se edita con un editor de texto y se publica con `git push`. No inventes un pipeline: no lo hay ni se quiere.

- **Dominio:** www.castorene.cl (NIC Chile)
- **DNS:** zona alojada en Netlify. El proyecto de Netlify está deshabilitado; **la zona DNS NO se toca**.
- **Hosting:** GitHub Pages · repo `bastiancastorene/castorene-web` · rama `main` · carpeta raíz
- **Idiomas:** 4 simultáneos (EN · ES · DE · 中文) en el mismo HTML
- **Temas:** oscuro (por defecto) y claro
- **Peso:** ~3 MB. Los PDF pesados viven en Google Drive, no en el repo.

---

## 1. ⚠️ REGLAS QUE NO SE ROMPEN

### 1.1 Los borradores nunca se publican
Todo archivo de trabajo queda fuera del repo. GitHub Pages sirve lo que se sube, así que un borrador
sería una URL pública e indexable. Patrones ya cubiertos en `.gitignore`:

```
borrador-*.md    *.draft.md    *_borrador.*    borradores/
```

Antes de cada push: `git status --short | grep -i borrador` → no debe devolver nada.

### 1.2 Los 4 idiomas van siempre balanceados
Cada texto se escribe **cuatro veces**, en spans consecutivos, **siempre en el orden `en → es → de → zh`**:

```html
<span class="lang-en">Publications</span><span class="lang-es">Publicaciones</span><span class="lang-de">Publikationen</span><span class="lang-zh">论文</span>
```

`app.js` fija `<html data-lang="xx">` según el idioma del dispositivo o `localStorage`, y el CSS oculta
los demás. **Si los contadores no cuadran, el sitio se ve roto en ese idioma.** Es el error más frecuente.

### 1.3 Nunca reemplaces bloques HTML por índice de posición
Usa búsqueda de texto exacto y verifica el balance de `<div>` después. Un corte por índices ya destruyó
el hero completo una vez. Ojo también con anclas ambiguas: `'  </div>'` coincide dentro de `'    </div>'`.
Ancla con salto de línea: `'\n  </div>\n'`.

### 1.4 Verifica siempre antes de dar por terminado
```bash
for f in *.html blog/*.html card/*.html; do
  printf "%-34s" $f
  python3 -c "
import re,sys
s=open('$f',encoding='utf-8').read()
o,c=len(re.findall(r'<div\b',s)),len(re.findall(r'</div>',s))
sp=[s.count('lang-'+l) for l in ('en','es','de','zh')]
print('div %d/%d spans %s %s'%(o,c,sp,'OK' if o==c and len(set(sp))<=1 else '*** REVISAR ***'))"
done
node --check app.js && node --check posts.js && echo "JS OK"
python3 -c "s=open('styles.css').read(); print('CSS llaves',s.count('{'),'/',s.count('}'))"
```

---

## 2. Mapa de archivos

```
index.html              Portada · 11 secciones
publications.html       Artículos peer-reviewed + preprints
talks.html              Charlas y congresos
team.html               Equipo
notes-theses.html       Material › Tesis y papers
notes-lectures.html     Material › Apuntes (13 documentos)
notes-teaching.html     Material › Docencia y ayudantías
notes-developments.html REDIRECCIÓN → /notes-lectures (categoría fusionada)
paper-entropy-ising.html REDIRECCIÓN → /blog/paper-entropy-ising (URL antigua)

blog/index.html                  Lista del blog · se sirve como /blog
blog/paper-entropy-ising.html    Post: paper Entropy 2026 (Ising)
blog/paper-3qubits.html          Post: paper Phys. Rev. E 2025 (3 qubits)
blog/surface-charge.html         Post: nota sobre carga en conductores
blog/butterfly.html              Post: paper Nano Letters 2026 (Hofstadter)

card/index.html         Tarjeta de contacto · se sirve como /card · NOINDEX
assets/                 Recursos de /card y figuras de los posts

styles.css              TODO el CSS (~750 líneas)
app.js                  TODO el JS compartido (~370 líneas, 14 módulos)
posts.js                Datos del blog · lo leen /blog y la portada

sitemap.xml robots.txt CNAME .nojekyll .gitignore 404.html og-image.jpg
CV_Bastian_Castorene_2026.pdf + cv-thumb-2026.jpg
Castorene_2026_Entropy_Ising.pdf + _SI.pdf
badge-*.jpg    miniaturas de publicaciones (300×400)
profile.jpg profile2.jpg talk1-2.jpg group1-2.jpg pv1-3.jpg fp1-6.jpg mg1-2.jpg
```

**`styles.css` y `app.js` son compartidos por TODAS las páginas.** Un cambio ahí afecta al sitio entero.

---

## 3. Paleta, tipografía y estilo

```css
--v1:#7c3aed  violeta        --bg:#0a0713   fondo oscuro
--v2:#d946ef  magenta        --bg2:#120a24
--v3:#4f46e5  índigo         --txt:#ece9f5  texto
--v4:#6453a1  violeta apagado--muted:#a99fc4 texto secundario
                             --accent:#d946ef
                             --panel:rgba(255,255,255,.04)
                             --panel-brd:rgba(168,120,255,.16)
--radius:18px   --maxw:1080px
```

**Degradado característico:** `linear-gradient(100deg, var(--v1), var(--v2), var(--v3))`.
Se usa en botones principales, títulos de sección, subrayados del nav y barras de acento.

**Tipografía:** Georgia serif para `h1`, `h2`, `h3` de sección. `system-ui` sans para el resto.

**Tema claro:** toda regla nueva con color necesita su contraparte `html[data-theme="light"] .clase{}`.
Las animaciones se atenúan en claro: `#energy{opacity:.4;filter:blur(1px)}`.

### Jerarquía de botones — respétala, costó afinarla

| Nivel | Clase | Aspecto |
|---|---|---|
| Máximo | `.qlink` | Degradado pleno + destello diagonal al hover |
| Alto | `.btn-primary` | Degradado sólido |
| Medio | `.btn.gsoft` / `.gsoft2` | Degradado semitransparente |
| Bajo | `.btn-ghost` | Solo contorno |
| Mínimo | `.tag` | Muy sutil, casi sin hover |

**Convención de flechas:** `↓` descarga · sin flecha enlace externo · `↘` explicación divulgativa · `→` navegación interna.

---

## 4. Animaciones y JavaScript (`app.js`, 14 módulos en orden)

1. **Idioma** — `detectLang()` `setLang()` `pickLang()` `toggleLangMenu()`. Menú con banderas SVG inline.
2. **Tema** — `detectTheme()` `setTheme()` `toggleTheme()`. Actualiza `meta[theme-color]`.
3. **Init** — aplica tema e idioma al cargar.
4. **Hero photo crossfade** — alterna `profile.jpg` / `profile2.jpg` cada 5 s.
5. **Reveal on scroll** — IntersectionObserver `threshold:0`, `rootMargin:'0px 0px -8%'`, más un pase de
   seguridad a los 400 ms. **NO subir el threshold:** con secciones más altas que la pantalla no dispara
   nunca y quedan invisibles en móvil.
6. **Cierre del menú móvil** — con 340 ms de retardo para que se vea la animación del tap.
7. **Canvas de partículas** (`#energy`) — el módulo más delicado. Ver §5.
8. **Carruseles** — cualquier `.carousel` con `.cslide` rota solo cada 4–5,6 s.
9. **Pulso de los enlaces del nav** al tocar.
10. **Pulso de los botones del hero** al tocar.
11. **Submenús del nav** — `toggleSub()`, cierra al hacer clic fuera.
12. **Scroll peek** — franja difuminada abajo con doble galón SVG degradado. Solo en páginas con ≥3
    secciones tituladas (o sea, solo la portada) y **solo cuando no hay texto en la franja inferior**.
13. **Último post en la portada** — lee `posts.js`, llena `#homeblog`.
14. **Novedades limitadas a 4** — muestra 4, o más si comparten mes con la cuarta.

**Orden de carga obligatorio:**
```html
<script src="/posts.js"></script>
<script src="/app.js"></script>
```

---

## 5. El canvas de partículas (`#energy`)

Es el elemento más ajustado del sitio. Comportamiento actual:

- Densidad por área: `innerWidth*innerHeight/11000`, acotada entre 30 y 95 partículas.
- Se conectan con líneas de degradado si la distancia < `min(w,h)*0.22`.
- **Fusión:** al solaparse un 80 % de sus radios (`MERGE_SLACK`) se funden conservando **área**
  (`√(r₁²+r₂²)`) y **momento** (promedio ponderado por masa). Tope `RMAX` para que no crezcan como bolas.
- **Fisión:** ocasional (`SPLIT_RATE = 0.006`), solo si la población está bajo el objetivo. Reparte el
  área en dos y las separa para que no se re-fusionen al instante.
- **Tinte por cercanía:** cada partícula acumula "calor" según vecinos próximos; su color se mezcla hacia
  `NEAR=[168,132,228]` con factor 0.50. Transición suave al 7 % por cuadro.
- **Blindaje:** valores no finitos → la partícula se reemplaza; canales RGB acotados 0–255; segmentos
  < 1,5 px descartados; `source-over` fijado cada cuadro (nunca aditivo); `try/catch` en el degradado.
- **`resize`:** debounce 150 ms; **reescala** las partículas existentes, **nunca las re-sortea**
  (re-sortearlas provocaba saltos en móvil al colapsar la barra de direcciones).
- Respeta `prefers-reduced-motion`.
- CSS: `transform:translateZ(0)` para darle capa propia en GPU y evitar costuras del compositor.

**Si compite con el texto**, baja en este orden: opacidad del halo → luminancia de `NEAR` →
opacidad de las líneas → grosor.

---

## 6. Estructura de la portada

Orden de secciones (el nav lo refleja):

```
#top(hero) → #about → #latest → #blog → #notes → #research
→ #publications → #conferences → #awards → #team → #contact
```

**Hero:** rol · nombre · resumen · 2 `.qlink` (Apuntes y notas / Blog y opiniones) ·
3 botones (Ver publicaciones / Descargar CV / Escríbeme) · foto con crossfade.
En escritorio `min-height:82vh` y anclado arriba.

**Nav:** 9 entradas. Cinco tienen submenú (`.navgroup` + `.subcaret` + `.submenu`):
Blog, Apuntes, Publicaciones, Congresos, Equipo. En subpáginas hay un "← Inicio" extra que
**se oculta en escritorio** (`@media(min-width:761px)`) para que el menú no se parta en dos líneas.

---

## 7. Cómo hacer cada cosa

### 7.1 Agregar una publicación

En `publications.html`, dentro de `<div id="articles">`, en orden cronológico inverso:

```html
<div class="pub">
  <img class="pubthumb" src="badge-pX.jpg" alt="Paper preview" loading="lazy" />
  <span class="year">2026</span>
  <h3>Título exacto del paper</h3>
  <p class="authors"><b>B. Castorene</b>, F. J. Peña, P. Vargas</p>
  <p class="venue">Physical Review E 114, 014132 (2026)</p>
  <div class="links">
    <a href="URL_PDF" target="_blank" rel="noopener">&darr; PDF</a>
    <a href="https://doi.org/XXX" target="_blank" rel="noopener">DOI</a>
  </div>
</div>
```

El nombre propio **siempre en `<b>`**.

**Miniatura** desde la primera página del PDF:
```bash
pdftoppm -jpeg -r 110 -f 1 -l 1 paper.pdf /tmp/out
python3 -c "
from PIL import Image
im=Image.open('/tmp/out-01.jpg').convert('RGB')
w,h=im.size; im=im.resize((300,int(300*h/w)),Image.LANCZOS).crop((0,0,300,400))
im.save('badge-pX.jpg',quality=88,optimize=True)"
```

**Y actualiza los contadores** en `index.html` (se olvidan siempre):
la banda de estadísticas `<span class="num">N</span>` y los textos "N artículos publicados" /
"N preprints" de los dos `.biglink`.

Agrega también una novedad al principio de `<div class="news">`.

### 7.2 Agregar un post al blog

Se edita **`posts.js`**, nunca el HTML del blog:

```js
{
  date: "2026-07-30",              // ordena la línea de tiempo, más nuevo primero
  dateLabel: "Jul 2026",           // lo que se muestra
  category: { en:"…", es:"…", de:"…", zh:"…" },
  featured: true,                  // aparece también en Destacados
  title: { en:"…", es:"…", de:"…", zh:"…" },
  body:  { en:"…\n…", es:"…", de:"…", zh:"…" },   // \n separa párrafos
  link:  { url:"/blog/mi-post", label:{ en:"…", es:"…", de:"…", zh:"…" } },  // opcional
  images: ["DRIVE_FILE_ID", …],    // opcional
  video: "DRIVE_FILE_ID"           // o youtube:"VIDEO_ID"
},
```

Se refleja solo en `/blog` (destacados + timeline) y en la portada (el más reciente).
Verifica: `node -e "global.window={};require('./posts.js');console.log(window.POSTS.length)"`

### 7.3 Crear la página de explicación de un paper — FORMATO DE DOS CAPAS

Es el formato insignia del sitio, inspirado en gist.science. **Dos textos independientes**, no un texto
que se va complicando. El lector elige con un interruptor Divulgación / Especialista.

**Procedimiento:**
1. **Leer el paper completo** (`pdftotext paper.pdf -`). Si no lo tienes, búscalo en arXiv. **No inventes
   física jamás.** Si falta un dato, pregunta.
2. Copiar `blog/butterfly.html` como plantilla (es la más completa: tiene figuras).
3. Reemplazar: `<title>`, `canonical`, `meta description`, `.eyebrow` (revista y año),
   `.section-title`, `.paperorig` (título original del paper, sin traducir), `.papermeta`
   (autores + DOI + PDF) y los dos paneles `#p-pop` y `#p-tech`.
4. Agregar el post en `posts.js` apuntando a la nueva URL.
5. Agregar el botón en `publications.html` (§7.4).
6. Agregar la URL a `sitemap.xml`.

**Capa divulgativa (`#p-pop`):**
- Abrir con una **imagen cotidiana**, nunca con el problema científico.
- **Una analogía sostenida por sección**, repetida, no comparaciones sueltas.
  Las que funcionaron: monedas cara/sello para espines · butacas de cine donde nadie puede sentarse
  junto a otro para la no-adyacencia de Fibonacci · tres amigos cantando en armonía para el
  entrelazamiento · una multitud que se cae mal apretada contra las paredes para la carga superficial ·
  el brócoli romanesco para los fractales.
- **Cero ecuaciones. Cero unidades con símbolos** (nada de "2J" ni "λ_D").
- Negrita solo en el concepto clave de cada párrafo.
- Cerrar con "En resumen" en viñetas.
- 500–700 palabras por idioma.

**Capa técnica (`#p-tech`):**
- **Va dirigida a un físico que no conoce ESTE subcampo.** Explica la jerga propia del área al pasar,
  pero **NUNCA con frases que anuncien que estás explicando**. Prohibido: "un repaso rápido para quien
  no trabaje en esta área", "el mecanismo es simple una vez que lo ves", "nada exótico en la maquinaria".
  El texto explica sin avisar que explica. No trates al lector de tonto.
- Registro de colega a colega, no abstract formal.
- Decir explícitamente **qué corrige o aporta** frente a la literatura previa.
- Anclar lo nuevo en algo conocido de otra área cuando se pueda ("parecido en espíritu a
  De Haas–van Alphen, pero en cantidades térmicas").
- Cerrar conectando con la línea mayor: motores térmicos cuánticos.

**Figuras** (`.pfig`) — van en ambas capas:
```html
<figure class="pfig"><img src="/assets/xxx.jpg" alt="…" loading="lazy" />
<figcaption>SPANS_4_IDIOMAS</figcaption></figure>
```
Extraer del PDF con `pdfimages -png -f N -l M paper.pdf fig`, recortar con PIL, guardar como JPG
de calidad 86–88 en `/assets`. Elegir figuras que **sostengan el argumento** del bloque donde van,
no que solo decoren.

**Aviso obligatorio al final** (`.aidisc`): versión divulgativa redactada con asistencia de IA y
revisada por los autores.

**El interruptor:** `.modeswitch` con `.ms-glow` deslizante. Arrastrable y clickeable. En móvil está
**fijo abajo desde el inicio** (nunca en el flujo, para que no salte el texto); en escritorio se ancla
al salir de pantalla. `.mspanel{padding-bottom:86px}` en móvil para que el texto no quede tapado.

### 7.4 Botón "Léelo en π min"

En la entrada de `publications.html` del paper que tenga explicación:

```html
<a class="explain" href="/blog/mi-post" title="&#8776; 3.14 min">
  <span class="lang-en">Read it in &pi; min</span><span class="lang-es">Léelo en &pi; min</span>
  <span class="lang-de">In &pi; Min lesen</span><span class="lang-zh">&pi; 分钟读懂</span>
  <span class="exar">&#8600;</span></a>
```

### 7.5 Agregar material (Google Drive)

Los PDF **no van al repo**. Van a Drive para no engordar el sitio.

1. Subir a la carpeta que corresponda en Drive.
2. La carpeta debe estar compartida como **"Cualquiera con el enlace → Lector"**. Los archivos heredan.
3. FILE_ID sale de la URL: `drive.google.com/file/d/FILE_ID/view`.
4. Agregar el bloque `.docitem` en el `notes-*.html` que corresponda, con miniatura
   `https://drive.google.com/thumbnail?id=FILE_ID&sz=w300` y resumen de 2–3 líneas en 4 idiomas.
5. **Renumerar** los `.docnum` de la página (01, 02, 03…) y mantener el orden cronológico inverso.

Las miniaturas se sirven desde Drive: **no pesan nada en el repo**.

**Carpetas actuales** (los IDs no cambian aunque renombres las carpetas):
| Drive | Página | ID |
|---|---|---|
| 1 · Tesis / Papers | `/notes-theses` | `1dVtwfA1cjRg1PWtwadWLppZZMvlZrUVA` |
| 2 · Material | `/notes-lectures` | `18nsrCbxVNHp9IyyOyV7ydHHVyO6nVxwH` |
| 3 · Docencia / Teaching | `/notes-teaching` | `1LqTPzkJuTX_FJV825k3yxFDKsLCTa2wu` |

### 7.6 La tarjeta digital `/card`

Tarjeta de contacto para congresos. **Existe pero no se enlaza desde ningún menú.**

- `<meta name="robots" content="noindex, nofollow">` para que no la indexen.
- **NO** bloquearla en `robots.txt`: si bloqueas el rastreo, el buscador no puede leer el noindex.
- No va en el sitemap.
- Instalable: `card.webmanifest` + `apple-touch-icon` → "Añadir a pantalla de inicio" la abre a pantalla
  completa, sin barra de navegador.
- `assets/bastian-castorene.vcf` lleva foto embebida y enlaces con etiqueta propia (sintaxis Apple
  `item1.URL` + `item1.X-ABLabel`). Es la que se usa para "Mi ficha" en iOS Contactos, que es lo que
  viaja por NameDrop.
- **NFC:** el iPhone no puede emitir NFC a otro teléfono. iPhone→iPhone se hace con NameDrop (nativo).
  Para Android, QR o una etiqueta NTAG215 física.

---

## 8. Publicar

```bash
cd "/Users/bastiancastorene/Desktop/Proyects/Pagina Web castorene.cl"
git add -A          # -A es obligatorio: sin él los archivos NUEVOS no entran
git status          # revisa; que no aparezca ningún borrador
git commit -m "descripción"
git push
```

Deploy ~1 min. **Verificar en incógnito**: el caché de `styles.css` y `app.js` es agresivo y varias veces
ha parecido que "no se subió" algo ya publicado. `Cmd+Shift+R` en escritorio.

Si aparece `Unable to create '.git/index.lock'` → `rm -f .git/index.lock`.

**URLs limpias:** todos los enlaces internos son **absolutos y sin `.html`** (`/publications`, `/blog`,
`/blog/butterfly`). GitHub Pages resuelve solo. Cada subpágina lleva su `<link rel="canonical">`.
Consecuencia: abrir los archivos con doble clic (`file://`) rompe la navegación; para probar en local
usa `python3 -m http.server`.

---

## 9. Errores ya cometidos — NO REPETIR

1. **Reemplazar bloques HTML por índice de posición.** Se comió el `.hero-cta` completo y un `</div>`,
   descuadrando toda la portada. Búsqueda de texto exacto + verificar balance de `<div>`.
2. **Ancla de cierre ambigua.** Buscar `'  </div>'` encontró el `'    </div>'` de un item y destruyó
   `notes-lectures.html`. Anclar con salto de línea.
3. **Regex de rutas relativas que tocó una cadena dentro de un `<script>`** → quedó `href="//blog/…"`,
   que el navegador lee como otro dominio.
4. **`posts.js` cargado después del código que lo usa** → blog vacío.
5. **IntersectionObserver con `threshold:.12`** → secciones más altas que la pantalla nunca aparecían
   en móvil.
6. **Re-sortear las partículas en cada `resize`** → saltos en móvil al mover la barra de direcciones.
7. **`og:image` en SVG** → WhatsApp no lo acepta, debe ser JPG/PNG de 1200×630.
8. **Miniaturas con el título impreso** en las tarjetas de la portada → el título se veía dos veces.
9. **Contadores de publicaciones desactualizados** al agregar un paper.
10. **Comandos `git` desde herramientas externas** dejaron un `.git/index.lock` trabado.
11. **Caché.** Varias veces pareció que un cambio "no se subió" cuando ya estaba publicado.
12. **Lenguaje condescendiente en la capa técnica** ("un repaso rápido para quien no trabaje en esta
    área"). Explica sin anunciar que explicas.

---

## 10. SEO y redes

- `sitemap.xml`: 12 URLs. Actualizar al crear páginas. **`/card` NO va.**
- Open Graph con `og-image.jpg` **raster 1200×630**.
- JSON-LD tipo `Person` en `index.html` con ORCID, Scholar y LinkedIn.
- Google Search Console verificado con `google09efd01ef6fab10d.html` — **no borrar**.

---

## 11. Datos fijos (para no buscarlos)

- **Nombre en el sitio:** Bastian Castorene (sin tilde)
- **Email:** bastian.castorene@gmail.com
- **ORCID:** 0009-0002-9075-5716
- **Scholar:** https://scholar.google.com/citations?hl=es&user=NQpSh18AAAAJ
- **LinkedIn:** https://www.linkedin.com/in/bastiancastorene/
- **Cargo:** **Representante** de los estudiantes de Doctorado (NO "Presidente")
- **Fondecyt:** Técnico de Investigación 1250173 · Estudiante de Tesis Doctoral 1240582
- **Beca:** ANID Doctorado Nacional 21250015
- **Equipo:** Dr. Patricio Vargas · Francisco J. Peña (USS, francisco.pena@uss.cl) ·
  Martin HvE Groves (doctorando UTFSM/PUCV)
- **Línea de investigación:** termodinámica cuántica · motores térmicos cuánticos · sistemas magnéticos ·
  criticalidad · materiales 2D
- **Motor de Castorene:** motor cuasiestático que opera a máxima eficiencia usando entropía, no energía,
  como "combustible". Es el resultado insignia de la tesis.

---

## 12. Estado actual y pendientes

**Publicaciones:** 9 peer-reviewed + 2 preprints.
**Blog:** 4 posts (Hofstadter · carga superficial · 3 qubits · Ising).
**Posts con explicación de dos capas:** Entropy/Ising, 3 qubits, Nano Letters/Hofstadter.

Pendientes conocidos:
- Los `badge-*.jpg` de casi todas las publicaciones son **tarjetas generadas**, no portadas reales.
  Solo `badge-p8.jpg` (Entropy) es portada real. Se pueden regenerar con `pdftoppm`.
- El preprint *Coupling-response thermodynamic density of states for bosonic working media* está como
  "Enviado" sin arXiv; cuando salga el número, agregarle PDF y enlace.
- Considerar versionar los assets (`app.js?v=3`) para matar los problemas de caché.
- La tesis doctoral aún no está en `/notes-theses` (dice "próximamente").
- En `blog/butterfly.html`, la cifra "unos pocos kelvin" del efecto magnetocalórico es una lectura del
  paper **sin confirmar**. Verificar contra el texto original.

---

## 13. Cómo trabajar con Bastián

- Escribe en español chileno, directo. Prefiere concisión.
- **Revisa los textos con comentarios sobre el borrador en markdown.** Genera siempre un
  `borrador-*.md` con la capa en español para que pueda comentarla, y aplica sus cambios a las cuatro
  traducciones a la vez.
- Cuando corrige física, **tiene razón**: es su paper. Aplica el cambio y propaga a los 4 idiomas.
- Si detectas un error factual o una inconsistencia, **dilo aunque no lo haya pedido**. Ya evitó
  publicar un epígrafe que decía "red cuadrada" sobre una figura de red de panal.
- No inventes números, unidades ni resultados. Si no está en el paper, pregunta.
