# Borrador de entrada de blog — Entropy 28, 821 (2026)

**Paper:** *Exact Combinatorial Density of States for the Critical 1D Ising Model*
B. Castorene, F. J. Peña, M. HvE Groves, P. Vargas · Entropy 2026, 28, 821 · CC BY 4.0
DOI: https://doi.org/10.3390/e28070821

---

## Cómo está construido gist.science (para replicarlo)

La página tiene **dos textos independientes sobre el mismo paper**, no un texto que se va poniendo más difícil. El lector elige capa:

**Capa 1 — "The Gist"** (≈5 min, cero jerga)
- Abre con una imagen mental cotidiana, nunca con el problema científico. En el paper del grafeno arranca con *"Imagina que tienes un motor diminuto e invisible"*.
- Se divide en **secciones numeradas cortas**: el sistema, los materiales, el hallazgo, por qué importa.
- **Una analogía sostenida por sección**, no analogías sueltas. La mejor del texto de grafeno: monocapa = violín, bicapa = piano, tricapa = arpa. La usa tres veces seguidas y el lector la retiene.
- Negritas solo en el concepto clave de cada párrafo.
- Cierra con **"The Bottom Line"**: dos o tres frases de "si querés X, usá Y".
- Nunca hay ecuaciones. Ni una.

**Capa 2 — "Technical Summary"** (para el especialista)
- Estructura fija de cinco bloques: *Problem Statement and Motivation · Methodology · Key Contributions · Key Results · Significance and Implications*.
- Es un resumen ejecutivo, no una versión corta del paper: dice **qué se corrigió respecto de la literatura previa** (ahí Fermi-Dirac en vez de Boltzmann) y **qué es nuevo**.
- Resultados con subsecciones A/B/C y números concretos.
- Con ecuaciones, pero mínimas.

**Metadatos que ayudan mucho:** categoría (`cond-mat`), tiempo de lectura, autores originales, licencia y un aviso explícito de que la explicación es generada por IA.

Ese aviso conviene mantenerlo, adaptado: en tu blog serías **autor del paper**, así que la fórmula honesta es *"versión divulgativa redactada con asistencia de IA y revisada por mí"*.

---

# CAPA 1 — La versión para todo público

## El número áureo escondido dentro de un imán

Imagina una fila de monedas sobre la mesa, una al lado de la otra. Cada una solo puede mostrar **cara** o **sello**. Eso es, esencialmente, un imán visto de muy cerca: el modelo de Ising unidimensional, el caballo de batalla más simple del magnetismo y una de las ideas más reutilizadas de toda la física.
Nuestras monedas son unas divas entre sí: cada una prefiere mostrar lo contrario que su vecina, y ojalá alternando. Cara, sello, cara, sello. A eso se le llama estado antiferromagnético, y si las dejáramos solas la fila entera se ordenaría de forma alternada.
Pero ahora aparece una segunda regla que las tienta a todas por igual: **cada moneda que muestre cara suma puntos**. Esa regla es el campo magnético longitudinal externo, y no le importa lo que hagan las vecinas: premia la cara y punto.
Aparece un tira y afloja. Con el premio chico ganan las vecinas y la fila se alterna; con el premio grande gana la regla y todas terminan mostrando cara. Pero existe **un valor exacto del premio en que ambas fuerzas empatan**.
Y ahí pasa algo raro y hermoso: de golpe, muchísimas maneras distintas de dar vuelta las monedas cuestan exactamente lo mismo. No hay una única "mejor jugada": hay una enorme cantidad de jugadas igual de buenas. El sistema queda indeciso.
*Es como una carta de restaurante donde todos los platos valen lo mismo. No hay ninguna razón para elegir uno u otro. Y la pregunta natural pasa a ser: ¿cuántos platos tiene exactamente el menú?*

### La pregunta que respondimos
Contar cuántas jugadas distintas tienen cada energía se llama, en física, obtener la **densidad de estados**. Es la información más básica que uno puede querer de un sistema: si la conoces, conoces su entropía exacta y su comportamiento termodinámico.
El problema es que el número de jugadas crece de forma explosiva. Con solo 100 monedas hay 2^100 combinaciones posibles de caras y sellos: ¡más de un quintillón, un millón de veces más que estrellas hay en el universo observable! Revisarlas una por una a mano o con un computador tradicional es combinatoriamente imposible. Nosotros las contamos **exactamente, con una fórmula cerrada, sin aproximar ni simular nada**.

### La sorpresa: aparecen los números de Fibonacci
Al hacer la cuenta analítica en el punto de empate salieron los números de Fibonacci: 1, 1, 2, 3, 5, 8, 13, 21… Es la misma sucesión donde cada número es la suma de los dos anteriores y que aparece en las espirales de los girasoles.
No es coincidencia mística, y la razón es sorprendentemente concreta: en el punto crítico, las únicas jugadas válidas son aquellas en que **no hay dos caras juntas**. Nunca dos monedas vecinas mostrando cara; está prohibido fundamentalmente para alcanzar la mínima energía.
Contar filas donde ciertos elementos tienen prohibido ser vecinos es, literalmente, el problema que define a la secuencia de Fibonacci.
*Piénsalo como una fila de butacas de cine donde dos personas no pueden sentarse juntas. Nuestro imán, en su punto crítico, es exactamente ese problema disfrazado de monedas.*

### Fila o círculo: la topología cambia los números
Después cerramos la fila de monedas en un círculo, imponiendo condiciones de contorno periódicas. El resultado cambia: ya no salen los números de Fibonacci sino los **números de Lucas**, su sucesión hermana (2, 1, 3, 4, 7, 11, 18…). Misma regla de formación, distinto punto de partida. ¿Por qué?
En una hilera abierta, las dos monedas de los extremos son privilegiadas: tienen una sola vecina a la que contradecir, no dos. En un círculo cerrado no hay extremos y todas juegan con las mismas reglas. Esa diferencia mínima cambia toda la contabilidad.
Y no cambia solo la mejor jugada. Las monedas del extremo de la cadena abierta se comportan como **defectos topológicos fraccionarios**: dar vuelta una de la punta cuesta exactamente la mitad de la energía que alterar un par en el medio de la fila. El resultado es que la hilera tiene una escalera de energías con el doble de escalones (pasos de 2J) que el círculo (pasos de 4J). La forma del objeto reorganiza su espectro completo.

### Escalones prohibidos
El hallazgo matemático que más nos sorprendió: hay peldaños de esa escalera que están **estrictamente vacíos**. Cerca del extremo donde casi todas las monedas muestran cara, hay niveles donde nuestra fórmula da exactamente cero. No es que sean improbables o difíciles de alcanzar: es que el sistema tiene estrictamente prohibido ocupar ese estado.
*Es una escalera perfectamente regular a la que, justo antes del final, le faltan peldaños: uno si la fila está cerrada en círculo, dos si está abierta. Una brecha no trivial de 8J. La razón es puramente geométrica y estructural de los enlaces.*

### En resumen

- En el punto de cruce de niveles, un imán unidimensional tiene tantas jugadas equivalentes que su conteo sigue la sucesión de **Fibonacci** si es una hilera abierta.
- El conteo sigue la sucesión de **Lucas** para anillos periódicos cerrados.
- El espectro de excitaciones completo hereda esta misma arquitectura matemática recursiva.
- Existen niveles de energía estrictamente prohibidos, con degeneración nula, por razones puramente topológicas.
- Al derivar estas degeneraciones de forma exacta, la entropía total se obtiene directamente.
- Esto permite eludir por completo las aproximaciones numéricas.

---

# CAPA 2 — Resumen técnico

### La arquitectura combinatoria del cruce de niveles
Todos sabemos que el modelo de Ising 1D ya está archirresuelto en el ensamble canónico, ¿verdad? Es el ejemplo clásico de la matriz de transferencia. El problema es que cuando te paras a mirar el cruce de niveles a campo fijo y te preguntas por la degeneración exacta nivel a nivel en el microcanónico, la cosa se pone sorprendentemente fea.
Si intentas la ruta termodinámica de siempre —invertir la función de partición de Laplace usando el canónico para sacar la densidad de estados del microcanónico— te topas con un muro. Los autovalores de la matriz de transferencia están llenos de radicales que te meten cortes de rama espantosos en el plano complejo, imposibilitando la integral de contorno usual y sepultando cualquier interpretación microscópica bonita de los niveles.
Existen trabajos recientes que sacan esto numéricamente o con métodos iterativos para sistemas finitos, pero nuestro punto no era competir en músculo computacional. Queríamos saber analíticamente la *arquitectura combinatoria exacta* que gobierna el manifold crítico en el cruce de niveles antiferromagnético (**B/J = 2**).

### El setup y la herramienta
El sistema es el clásico: una cadena 1D de **N** espines con interacción antiferromagnética a primeros vecinos y un campo magnético longitudinal. Evaluamos las dos topologías de siempre, la cadena abierta y el anillo periódico. Nos plantamos justo en el cruce de niveles primario (**B/J = 2**), donde el *ground state* transiciona y se vuelve macroscópicamente degenerado.
¿Nuestra navaja suiza para abrir este problema? La combinatoria analítica. Terminamos descubriendo que las excitaciones se pueden mapear a una simple ecuación diofántica lineal (**m = b + 2k**, es decir, una ecuación con soluciones de números enteros) y que las degeneraciones se arman a punta de convoluciones de Fibonacci: sumas combinatorias que multiplican números de Fibonacci según cómo se particione el sistema.

### Lo que encontramos (sin rodeos)

- **Fibonacci y Lucas dictan el *ground state*.** Las degeneraciones del manifold fundamental no son números aleatorios; encajan perfecto con la secuencia de Fibonacci (cadena abierta) y la de Lucas (anillo). Y no es casualidad: es la consecuencia geométrica directa de minimizar la energía, lo que impone una restricción de no adyacencia estricta (**N_↑↑ = 0**). Es decir, no hay dos espines up-up consecutivos.
- **La recursividad infecta todo el espectro.** Esta estructura no se queda solo en el estado base. El espectro excitado completo es básicamente una aglomeración de defectos topológicos, pesados matemáticamente por convoluciones de Fibonacci. El anillo usa convoluciones estándar, pero la cadena abierta nos obligó a usar convoluciones extendidas para lidiar con los colapsos de los bordes.
- **Los bordes actúan como defectos fraccionarios.** Ojo, hablo de "fraccionarios" estrictamente en la contabilidad de energía, nada de cuasipartículas exóticas. Resulta que dar vuelta un espín en el extremo de la cadena abierta cuesta exactamente la mitad de energía que alterar un par en el *bulk*. Esto densifica el espectro de la cadena, metiéndole escalones finos de **2J**, en contraste con la cuantización súper rígida de **4J** del anillo periódico.
- **Hay gaps prohibidos.** Esto fue de lo más genial que encontramos: predecimos niveles con degeneración estrictamente nula. El penúltimo nivel del anillo y los dos niveles justo debajo del estado totalmente polarizado en la cadena están literalmente vacíos, algo análogo al salto de masa no trivial de física fundamental. No es un tema de probabilidad: es que es topológicamente imposible romper los enlaces adyacentes para acomodarse en esas combinaciones específicas.

### ¿Por qué importa esto?
Más allá de lo bonito que es matemáticamente, tener estas fórmulas cerradas nos permite calcular la entropía residual y a temperatura finita del manifold crítico de forma exacta, sin depender de reconstrucciones numéricas. Esto sirve como el *benchmark* definitivo —el *ground truth*— para calibrar algoritmos de Monte Carlo, Wang–Landau y rutinas de matriz de transferencia. O, en nuestro caso, para diseñar un motor sin pérdidas calóricas: conocer la degeneración exacta del estado fundamental es un requisito, no un lujo, y ahí es donde este trabajo se enchufa directamente con nuestra línea de motores Stirling cuánticos.
Además, nos sugiere que si miramos sistemas frustrados u otras topologías, podríamos encontrar organizaciones espectrales similares dictadas por los bordes.
En el fondo, lo que demostramos es que la arquitectura de teoría de números de estos manifolds críticos cuánticos sale a la luz en todo su esplendor cuando decides *contar* microestados exactos en lugar de conformarte con promediarlos térmicamente.
