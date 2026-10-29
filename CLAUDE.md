# castorene.cl — guía de continuidad para IA

Revisión: 2026-10-29. Estado local inspeccionado: commit `bc66582` más cambios sin
publicar de esa fecha (auditoría de errores y CV actualizado).
Lee esta guía completa antes de editar. Es la guía versionada; `AGENTS.md` es un
punto de entrada local ignorado por Git. No mantengas dos manuales contradictorios.
Las instrucciones actuales del usuario prevalecen. Si el código cambia después de
esta fecha, comprueba el estado real y actualiza esta guía; no fuerces el sitio a
coincidir con una fotografía antigua.

## 1. Inicio obligatorio y alcance

1. Lee esta guía, `SECURITY.md` y cualquier instrucción adicional aplicable.
2. Revisa `git status --short`, rama, remoto y cambios pendientes antes de tocar archivos.
3. Identifica las páginas afectadas y lee su HTML y los módulos compartidos pertinentes.
4. Conserva cambios ajenos. No hagas limpieza, rediseños, migraciones ni publicaciones
   que no estén incluidos en el encargo.
5. Edita con parches de contexto exacto; revisa el diff y ejecuta las comprobaciones
   de §9. Informa qué se hizo, qué se comprobó y qué queda sin verificar.

Este es el sitio académico personal de Bastian Castorene. No es el sitio editorial
de Primo Físico. El blog y las páginas de material fueron retirados deliberadamente.
No los restaures por instrucciones antiguas ni por encontrar nombres heredados en JS.

## 2. Arquitectura y publicación

- HTML + CSS + JavaScript estáticos, sin framework, npm ni compilación de aplicación.
- Repositorio: `bastiancastorene/castorene-web`; publicación en GitHub Pages,
  rama `main`, raíz del repositorio. Verifica la configuración remota antes de cambiarla.
- Dominio: `www.castorene.cl`, declarado en `CNAME`.
- La zona DNS de Netlify se conserva aunque su hosting esté deshabilitado:
  **no tocar DNS, CNAME ni proveedores** sin encargo explícito.
- `netlify.toml` es configuración heredada: sus cabeceras y redirecciones
  no se aplican automáticamente en GitHub Pages.
- Sí existe CI: `.github/workflows/site-integrity.yml`. No confundir
  «sin build de aplicación» con «sin controles ni despliegue».
- Hay dependencias externas de navegador para las interacciones de publicaciones
  (Supabase y Turnstile). El backend no está versionado aquí.

Todo archivo publicado debe considerarse público, incluso si no aparece en el menú.
No subir borradores, credenciales, PDFs temporales ni datos privados. Conserva
`.gitignore`; no fuerces la inclusión de `AGENTS.md` o `MANUAL-DEL-SITIO.md`.
Este manual, `CLAUDE.md`, sí es versionado y no debe contener secretos.

## 3. Mapa actual: qué editar

| Archivo | Responsabilidad |
|---|---|
| `index.html` | Portada, presentación, novedades, contadores y publicaciones destacadas |
| `publications.html` | Lista completa de artículos y manuscritos/preprints |
| `talks.html` | Charlas y congresos; títulos históricos no se cambian automáticamente. 17 orales + 2 de divulgación escolar = 19, base del «18+» de portada |
| `team.html` | Equipo |
| `card/index.html` | Tarjeta digital; HTML, CSS y JS propios además de recursos compartidos |
| `styles.css` | Diseño compartido, temas, responsive y animaciones CSS |
| `app.js` | Idiomas, temas, canvas, carruseles, navegación y comportamiento compartido |
| `blog-interactions.js` | Reacciones y compartir de publicaciones; nombre heredado, aún activo |
| `assets/` | Imágenes y recursos, incluida ficha VCF y manifiesto de tarjeta |
| `scripts/preflight.py` | Controles estáticos previos a publicar |
| `sitemap.xml`, `robots.txt` | Indexación; sitemap actual con cuatro URLs |
| `404.html`, `.nojekyll`, `CNAME` | Infraestructura del sitio estático |
| `google09efd01ef6fab10d.html` | Verificación de Search Console: no borrar |
| `CV_Bastian_Castorene_2026.pdf`, `cv-thumb-2026.jpg` | CV publicado y miniatura |
| `badge-*.jpg`, `profile*.jpg`, otras imágenes/PDF | Recursos existentes; buscar referencias antes de retirarlos |

No existen actualmente `posts.js`, `blog/` ni `notes-*.html`.
Que el verificador o el JS todavía contemple blogs no significa que deban crearse.

Portada, en orden:
`#top → #about → #latest → #research → #publications → #conferences → #awards → #team → #contact`.

El hero tiene enlaces principales a publicaciones e investigación y un carrusel
de tres retratos. La navegación está repetida en varias páginas: un cambio de
menú debe propagarse a sus consumidores, no solo a la portada.

## 4. Idiomas y fidelidad del contenido

Cuatro idiomas simultáneos: inglés, español, alemán y chino.
`app.js` fija `html[data-lang]`; el CSS oculta los otros idiomas.
En etiquetas nuevas usa el orden en → es → de → zh:

```html
<span class="lang-en">Publications</span><span class="lang-es">Publicaciones</span><span class="lang-de">Publikationen</span><span class="lang-zh">论文</span>
```

La presentación también usa párrafos `p.lang-xx` agrupados por idioma.
Conserva la estructura existente: no todos los contenidos son spans consecutivos.
Mantén equivalencia semántica y cantidades balanceadas; contar clases no comprueba
la calidad ni la completitud de una traducción.

- No traduzcas títulos bibliográficos originales ni alteres DOI, autores o resultados.
- Mejorar redacción no autoriza cambiar la física ni las ideas del autor.
- No inventes fechas, unidades, afiliaciones o conclusiones. Si hay discrepancias,
  identifícalas y consulta; no des la razón automáticamente ni corrijas sin evidencia.
- Para explicaciones científicas nuevas, lee el artículo completo. Un abstract no
  basta para afirmar detalles de figuras o cálculos.
- Si se necesita revisión extensa de prosa, prepara un borrador español privado
  fuera del conjunto publicado y propaga después los cambios a los cuatro idiomas.
- No añadas MathJax, KaTeX ni un editor LaTeX por suposición: no forman parte
  del flujo actual de edición del sitio.

Datos de identidad que deben mantenerse salvo actualización del usuario:
Bastian Castorene (sin tilde en el sitio), bastian.castorene@gmail.com,
ORCID 0009-0002-9075-5716. El cargo indicado es **Representante** de estudiantes,
no Presidente. Los cargos y afiliaciones temporales se verifican antes de renovarlos.

## 5. Diseño y animaciones que deben preservarse

Paleta oscura: violeta `#7c3aed`, magenta `#d946ef`, índigo `#4f46e5`,
violeta apagado `#6453a1`; fondos `#0a0713` / `#120a24`;
texto `#ece9f5`, secundario `#a99fc4`.
Usa las variables CSS existentes: `--v1` a `--v4`, `--bg`, `--bg2`,
`--txt`, `--muted`, `--panel`, `--panel-brd`.
Radio base 18 px y ancho máximo 1080 px.
Encabezados Georgia; cuerpo Inter con alternativas system-ui.
Degradado característico: `linear-gradient(100deg,var(--v1),var(--v2),var(--v3))`.

Jerarquía de botones: `.qlink` → `.btn-primary` →
`.btn.gsoft` / `.gsoft2` → `.btn-ghost` → `.tag`.
Flechas: ↓ descarga; → navegación interna; enlace externo sin flecha.
No cambies esta jerarquía por una petición de contenido.

Todo color nuevo debe funcionar en claro y oscuro: usa variables adaptativas o
reglas `html[data-theme="light"]`. Revisa contraste, foco y tamaño táctil.

Precauciones de `app.js`:

- Reveal: `IntersectionObserver` con `threshold:0` y margen inferior -8%,
  más pase de seguridad a los 400 ms. Subir el threshold puede ocultar secciones
  altas en móvil para siempre. `.reveal` solo se oculta con `html.js` (script de una
  línea en el `<head>` de cada página con secciones `.reveal`); `app.js` añade
  `app-ready` y, si no llega a ejecutarse, un respaldo CSS las muestra a los 2,5 s.
  Una página nueva con `.reveal` necesita ese script en el `<head>`.
- Menú: ☰ hasta 1100 px (medido: el menú en una línea necesita ~1087 px en alemán).
  Si se añade un enlace al menú, volver a medir. Cerrado usa `visibility:hidden`
  para salir del orden de tabulación; ☰ con `aria-expanded` vía `toggleMenu()`;
  selector de idioma operable con teclado; Escape cierra menús.
- `html{scroll-padding-top:76px}` evita que las anclas queden bajo el nav fijo.
- Hero: alterna las imágenes `.pf` cada 5 s. No lo reduzcas a dos por una guía antigua.
- Carruseles: intervalo entre 4 y 5,6 s.
- Novedades: se muestran cuatro, ampliadas cuando comparten mes con la cuarta.
- Scroll peek: solo con al menos tres secciones tituladas y sin texto en la franja inferior.
- El canvas respeta movimiento reducido (dibuja un fotograma estático y lo redibuja
  tras redimensionar); no supongas que toda animación del sitio lo hace.

Canvas `#energy`, especialmente sensible:

- Población por área / 11000, limitada a 30–95.
- Fusión con solapamiento 0,80; conserva área y momento y limita radio máximo.
- Fisión con tasa 0,006; separa las hijas para evitar refusión inmediata.
- Tinte próximo `NEAR=[168,132,228]`; conservar las transiciones suaves.
- Mantener controles de valores finitos, RGB acotados y composición source-over.
  Las líneas usan color sólido (`mix()`), no un `CanvasGradient` por pareja, y no se
  dibujan por debajo de opacidad 0,02: iOS rasterizaba ese caso como una línea
  blanca opaca durante un frame. No reintroducir gradientes por línea.
- Resize con debounce 150 ms: reescala partículas, **no las vuelve a sortear**.
- Conservar protección CSS contra saltos de altura móvil y costuras de GPU.
- Si resta legibilidad, ajustar primero halo, después luminancia del tinte,
  opacidad de líneas y finalmente grosor. No cambiar la dinámica sin necesidad.

## 6. Procedimientos de contenido

### Añadir o actualizar una publicación

1. Busca título y DOI en todo el repo para evitar duplicados.
2. Edita `publications.html`, dentro de `#articles` o `#preprints`, usando
   una tarjeta `.pub` vecina como plantilla y orden cronológico inverso.
3. Conserva título exacto, todos los autores y nombre propio en `<b>`.
   Incluye año, revista, volumen/número/localizador cuando estén confirmados.
4. Usa DOI canónico y enlace PDF real. Enlaces externos: `target="_blank"`
   con `rel="noopener"`. No presentes DOI como descarga PDF.
5. Miniatura: primera página del PDF, JPEG 300×400, respetando la fuente.
   Extrae en un directorio temporal fuera del repo. Si no hay PDF accesible,
   informa la limitación; no fabriques una portada editorial.
6. Al pasar de preprint a artículo, **mueve** la entrada y conserva su identidad.
7. Recalcula el total y actualiza la banda estadística, el texto introductorio de
   publicaciones y ambos subtítulos `.biglink` de portada, en los cuatro idiomas.
8. Añade novedad al inicio de `#latest .news` si corresponde al encargo:
   copia `.news-item`, conserva `.when` y `.what` y traduce el texto.
9. Actualiza una tarjeta destacada solo si corresponde; no son la lista completa.
10. Actualiza el mapa de interacciones según §7 y verifica referencias.

Estado de referencia: **14 trabajos = 10 artículos + 4 manuscritos/preprints**.
No sumar de nuevo un preprint que acaba de publicarse.

Manuscrito añadido el 2026-10-27:
*Thermodynamic spectroscopy of circular graphene nanostructures*,
F. J. Peña, B. Castorene, F. Mondaca, C. D. Núñez, N. Vidal-Silva y P. Vargas.
Estado comunicado por el autor: enviado a Physical Review E. Sin PDF, DOI ni
preprint proporcionados; tarjeta sin miniatura. Slug: `graphene-spectroscopy`.
Total y subtítulos actualizados en los cuatro idiomas. Comprobado el 2026-10-29:
`get_blog_interactions` devuelve 13 de 14 publicaciones y falta
`pub-graphene-spectroscopy`; hay que autorizar ese slug en el backend (fuera de
este repo). Hasta entonces sus reacciones fallan (ahora con aviso visible).

Publicación recientemente incorporada:
*Fundamental Work Scaling and Non-Extensivity in Critical Engines*,
B. Castorene, M. HvE Groves, F. J. Peña, E. E. Vogel y P. Vargas,
*Advanced Quantum Technologies* 9(9), e70470 (2026).
DOI: https://doi.org/10.1002/qute.70470
PDF enlazado: https://arxiv.org/pdf/2510.25533
Miniatura: `badge-p9.jpg`, tomada del preprint, no de una portada editorial.
Está en artículos y la introducción enlaza el DOI mediante [1] inmediatamente
después de «Motor de Castorene» y sus equivalentes en los cuatro idiomas.
Mantén esa cita al editar el párrafo. Los títulos antiguos en charlas históricas
no se sustituyen automáticamente por el título definitivo.

Un HTTP 403 del editor no demuestra que el artículo requiera suscripción:
puede ser una restricción automatizada. No inventes explicaciones de acceso.

### Actualizar CV, fotos o tarjeta

- El CV se actualizó el 2026-10-29 desde `CV_English/main.pdf` (carpeta personal
  «CV multilingue - Actualizado»). No sobrescribas ese archivo con una copia antigua
  para completar otra tarea.
- Busca todas las referencias al PDF antes de sustituirlo y renueva el parámetro
  de caché de los enlaces afectados. Actualmente el CV y su miniatura usan `?v=20261029`.
- Si cambia la primera página, regenera `cv-thumb-2026.jpg` (600×848, página 1
  completa; Ghostscript a 200 ppp y recorte superior a esa proporción).
- Las fotos del hero se controlan por su HTML y `.pf`; conserva recorte y transición.
- `/card` contiene retrato, QR y selector de idioma junto al QR.
  Inspecciona su CSS/JS inline además de los compartidos.
- Mantén `noindex, nofollow` y la tarjeta fuera del menú y sitemap.
  No bloquees su rastreo en robots: el buscador necesita leer el noindex.
- Ficha: `assets/bastian-castorene.vcf`; instalación:
  `assets/card.webmanifest`. Verifica enlaces y descarga tras cambios.
- No elimines archivos antiguos solo por parecer redundantes: busca referencias
  y confirma que su retirada forma parte del encargo.

### Añadir una página pública

Solo si se solicita: copia la estructura vigente de una subpágina, no una plantilla
de blog retirada. Añade canonical, metadatos, navegación y cuatro idiomas.
Enlaces internos de producción: absolutos y sin .html, por ejemplo `/publications`.
Registra la página indexable en sitemap y amplía el verificador si está en una
carpeta que este no recorre. No añadas `/card` al sitemap.

## 7. Interacciones y servicios externos

`publications.html` carga `app.js`, Supabase, `blog-interactions.js`
y Turnstile en ese orden. El nombre del módulo es heredado; **no borrarlo**.

`PUBLICATIONS` en `blog-interactions.js` asocia el texto exacto del h3 a
un slug estable. `installPublications()` genera `pub-SLUG` para reacciones y
`paper-SLUG` para el ancla. El artículo nuevo conserva el slug `work-scaling`.
Si cambia el título, actualiza la clave del mapa, no el slug: cambiarlo separaría
las reacciones anteriores y rompería enlaces compartidos.

El cliente usa autenticación anónima con Turnstile y estas RPC de Supabase:
`get_blog_interactions`, `set_blog_reaction`, `submit_blog_comment`.
Hay código heredado para comentarios, material y posts, pero eso no implica que
estas interfaces estén presentes en las páginas actuales.

La configuración del backend no está en este repo. Un slug nuevo puede requerir
autorización allí. No declares funcional una reacción solo porque aparece el botón.
No pruebes escribiendo reacciones/comentarios reales sin autorización para hacerlo.
Si falta acceso al backend, entrega la parte local e informa el bloqueo.

La URL de Supabase, clave publicable y site key de Turnstile son configuración
pública del cliente; **nunca** agregar service-role keys, secretos de Turnstile
ni tokens privados. No deshabilites autenticación, captcha o permisos para
resolver un error de integración.

Caché: desde el 2026-10-29 todas las páginas cargan `styles.css?v=12` y
`app.js?v=12`; publicaciones carga `blog-interactions.js?v=11`. Después de modificar
CSS/JS compartido, sube la versión en todas sus etiquetas de carga (incluida
`card/index.html`); no asumas que una única página invalida toda la caché.

## 8. Proyectos separados y límites del editor

Primo Físico y un prototipo local llamado Webmasters no son dependencias de este
sitio. No ejecutes ni modifiques esos proyectos por una petición sobre Castorene.
El prototipo no sustituye este procedimiento ni garantiza publicación integral;
verifica su implementación y sus propias instrucciones si el usuario lo solicita.
Abrir su HTML con file:// no equivale a iniciar su servidor.

No existe aquí un CMS desplegado ni un flujo LaTeX → publicación listo para usar.
Cualquier nuevo administrador requiere un encargo independiente y decisiones
sobre autenticación, almacenamiento y publicación. No prometas esa funcionalidad
por la presencia de un prototipo o de código heredado.

## 9. Validación antes de entregar

Desde la raíz:

```sh
git diff --check
python3 scripts/preflight.py
node --check app.js
node --check blog-interactions.js
```

Si Node no está disponible, informa que su comprobación local no se ejecutó.
No instales un stack de aplicación solo para una edición de contenido.

El preflight comprueba archivos versionados prohibidos, algunos patrones de
secretos y balance de div/clases de idioma en HTML de raíz, blog (si existe) y card.
**No** es un parser HTML ni prueba traducciones, CSS, enlaces, renderizado,
accesibilidad o backend. Los archivos nuevos no entran en el escaneo de secretos
hasta que Git los registra; revisa primero y vuelve a ejecutarlo tras prepararlos.

CI usa Python 3.12 y Node 22: ejecuta preflight y sintaxis de **app.js**.
Actualmente no comprueba sintaxis de blog-interactions.js ni apariencia.
Una CI verde no equivale a validación completa.

Para cambios visibles, inicia un servidor local:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Abre http://127.0.0.1:8765/ y las páginas afectadas. El servidor simple puede
necesitar `/publications.html`; no resuelve URLs limpias como GitHub Pages.
No alteres enlaces de producción para arreglar esa diferencia local.
No uses doble clic/file:// como prueba de navegación.

Comprueba: escritorio y móvil, cuatro idiomas, temas claro/oscuro, navegación,
menús, imágenes, ausencia de texto invisible, foco y consola. Revisa el resto
de páginas si cambias estilos o JS compartidos. Detén solo el servidor que hayas
iniciado. Para cambios exclusivamente documentales, basta revisar documentación,
diff y preflight; no afirmar pruebas visuales que no se hicieron.

## 10. Publicar solo con autorización

1. Revisa `git status --short` y `git diff`; excluye borradores y cambios ajenos.
2. Prepara archivos explícitos de la tarea. Usa `git add -A` únicamente si
   todos los cambios revisados deben publicarse; no omitas archivos nuevos.
3. Revisa `git diff --cached --stat` y `git diff --cached`; repite preflight.
4. Crea un commit descriptivo y haz push a la rama acordada.
5. Si la rama está protegida, sigue el flujo de rama/PR permitido; no lo eludas
   con push forzado ni cambios de protección.
6. Comprueba controles y despliegue para el SHA enviado, no una ejecución vieja.
   Puedes usar `gh run list --commit SHA` si está disponible.
7. Verifica el contenido servido por el dominio y su caché mediante recarga
   forzada, sesión nueva o parámetro de versión. Distingue «push realizado»,
   «despliegue completado» y «contenido público comprobado».
8. Informa el resultado real y cualquier comprobación pendiente.

Si hay index.lock, comprueba su existencia y que no haya un Git activo antes de
considerarlo obsoleto. Un error de permisos del entorno no demuestra que exista
un bloqueo abandonado. No borres locks a ciegas; no uses reset --hard ni descartes
cambios para salir de un problema.

## 11. Errores y pendientes que no deben ocultarse

- Nunca reemplaces bloques HTML por índices de posición. Usa contexto único;
  una ancla de cierre ambigua ya destruyó el hero en una edición anterior.
- Nunca hagas reemplazos globales de rutas sin revisar también scripts:
  se han generado URLs accidentales con doble barra inicial.
- No presentes contadores, páginas retiradas o títulos antiguos de esta guía
  como hechos nuevos sin contrastarlos con los archivos.
- Hay miniaturas históricas generadas; no todas son portadas reales.
- Autores verificados el 2026-10-29 contra arXiv y el PDF de Entropy: la tarjeta
  destacada de grafeno lleva ya la lista completa de 7 autores y el coautor figura
  como «M. HvE Groves» en todo el sitio (así lo imprimen los artículos). En el
  artículo del Seebeck se usa «C. D. Núñez», como en el CV del autor, aunque APS
  imprime «Nuñez». El PDF de *Thermal Hofstadter Butterflies* es arXiv:2603.07424
  (mismo título y autores); la página del editor no es un PDF.
- La autorización remota de nuevos slugs y el alcance de CI siguen requiriendo
  verificación específica.
- No hay garantía de «continuidad perfecta»: si faltan datos o acceso, deja
  explícitamente lo verificado, la incertidumbre y el siguiente paso.

Al finalizar un cambio relevante, actualiza esta guía si cambió arquitectura,
contenido estructural, validaciones o publicación. No dupliques el manual en otro
archivo. Responde en español neutro, breve y sin elogios; no afirmes comprobaciones
o despliegues que no ejecutaste.
