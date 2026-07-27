/* Posts del blog · editar aquí; lo usan /blog y la portada */
window.POSTS = [
  {
    date: "2026-07-26",
    dateLabel: "Jul 2026",
    category: { en:"Physics notes", es:"Notas de f\u00edsica", de:"Physik-Notizen", zh:"\u7269\u7406\u7b14\u8bb0" },
    featured: true,
    title: {
      en: "The charges in a conductor are not where you were told",
      es: "Las cargas en un conductor no est\u00e1n donde te dijeron",
      de: "Die Ladungen in einem Leiter sitzen nicht dort, wo man es dir gesagt hat",
      zh: "\u5bfc\u4f53\u4e2d\u7684\u7535\u8377\u5e76\u4e0d\u5728\u4ed6\u4eec\u544a\u8bc9\u4f60\u7684\u5730\u65b9"
    },
    body: {
      en: "Every electromagnetism course makes you prove that extra charge on a metal goes entirely to the surface, because that arrangement has the lowest energy. But energy is not the only thing that matters: entropy pushes the charges back into the bulk. Redo the calculation honestly and the surface turns out to have thickness.\nWhy the textbook is still right, and what happens when you turn up the heat.",
      es: "Todo curso de electromagnetismo te hace demostrar que la carga extra en un metal se va entera a la superficie, porque ese arreglo tiene la menor energ\u00eda. Pero la energ\u00eda no es lo \u00fanico que importa: la entrop\u00eda empuja las cargas de vuelta al interior. Rehaz el c\u00e1lculo honestamente y resulta que la superficie tiene grosor.\nPor qu\u00e9 el libro igual tiene raz\u00f3n, y qu\u00e9 pasa cuando subes la temperatura.",
      de: "Jeder Elektrodynamik-Kurs l\u00e4sst dich beweisen, dass zus\u00e4tzliche Ladung auf einem Metall vollst\u00e4ndig an die Oberfl\u00e4che geht, weil diese Anordnung die geringste Energie hat. Doch Energie ist nicht alles: Die Entropie dr\u00e4ngt die Ladungen zur\u00fcck ins Innere. Rechnet man ehrlich nach, hat die Oberfl\u00e4che eine Dicke.\nWarum das Lehrbuch trotzdem recht hat \u2014 und was bei hohen Temperaturen passiert.",
      zh: "\u6bcf\u4e00\u95e8\u7535\u78c1\u5b66\u8bfe\u90fd\u4f1a\u8ba9\u4f60\u8bc1\u660e\uff1a\u91d1\u5c5e\u4e0a\u7684\u989d\u5916\u7535\u8377\u4f1a\u5168\u90e8\u8dd1\u5230\u8868\u9762\uff0c\u56e0\u4e3a\u8fd9\u79cd\u6392\u5e03\u80fd\u91cf\u6700\u4f4e\u3002\u4f46\u80fd\u91cf\u5e76\u975e\u552f\u4e00\u91cd\u8981\u7684\u4e1c\u897f\uff1a\u71b5\u4f1a\u628a\u7535\u8377\u63a8\u56de\u5185\u90e8\u3002\u8bda\u5b9e\u5730\u91cd\u505a\u8ba1\u7b97\uff0c\u4f60\u4f1a\u53d1\u73b0\u8868\u9762\u662f\u6709\u539a\u5ea6\u7684\u3002\n\u4e3a\u4ec0\u4e48\u8bfe\u672c\u4f9d\u7136\u6b63\u786e\uff0c\u4ee5\u53ca\u5347\u9ad8\u6e29\u5ea6\u65f6\u4f1a\u53d1\u751f\u4ec0\u4e48\u3002"
    },
    link: {
      url: "/blog/surface-charge",
      label: { en:"Read it in \u03c0 min", es:"L\u00e9elo en \u03c0 min", de:"In \u03c0 Min lesen", zh:"\u03c0 \u5206\u949f\u8bfb\u61c2" }
    },
    images: [],
    video: null
  },
  {
    date: "2025-03-14",
    dateLabel: "Mar 2025",
    category: { en:"Papers explained", es:"Papers explicados", de:"Papers erklärt", zh:"论文解读" },
    featured: true,
    title: {
      en: "A qubit that feels warm at absolute zero",
      es: "Un qubit que se siente tibio en el cero absoluto",
      de: "Ein Qubit, das sich am absoluten Nullpunkt warm anf\u00fchlt",
      zh: "\u4e00\u4e2a\u5728\u7edd\u5bf9\u96f6\u5ea6\u4e0b\u4ecd\u611f\u89c9\u6e29\u6696\u7684\u91cf\u5b50\u6bd4\u7279"
    },
    body: {
      en: "Three qubits hold hands and become entangled. Cool the trio to absolute zero and look at just one of them: it behaves as if it were warm, an effective temperature born purely from entanglement. Our paper in Phys. Rev. E shows how anisotropy makes that entanglement tougher, and how an everyday magnetic measurement can catch it red-handed.\nRead it in two layers, one for everyone and one for specialists.",
      es: "Tres qubits se toman de la mano y se entrelazan. Enfr\u00eda el tr\u00edo al cero absoluto y mira solo uno: se comporta como si estuviera tibio, una temperatura efectiva nacida puramente del entrelazamiento. Nuestro paper en Phys. Rev. E muestra c\u00f3mo la anisotrop\u00eda vuelve ese entrelazamiento m\u00e1s resistente, y c\u00f3mo una medici\u00f3n magn\u00e9tica cotidiana puede atraparlo con las manos en la masa.\nL\u00e9elo en dos capas, una para todo p\u00fablico y otra para especialistas.",
      de: "Drei Qubits halten H\u00e4ndchen und werden verschr\u00e4nkt. K\u00fchle das Trio auf den absoluten Nullpunkt und betrachte nur eines: Es verh\u00e4lt sich, als w\u00e4re es warm \u2014 eine effektive Temperatur, rein aus der Verschr\u00e4nkung geboren. Unser Paper in Phys. Rev. E zeigt, wie Anisotropie diese Verschr\u00e4nkung widerstandsf\u00e4higer macht und wie eine allt\u00e4gliche magnetische Messung sie auf frischer Tat ertappt.\nIn zwei Ebenen lesbar, eine f\u00fcr alle und eine f\u00fcr Fachleute.",
      zh: "\u4e09\u4e2a\u91cf\u5b50\u6bd4\u7279\u624b\u62c9\u624b\u5e76\u53d1\u751f\u7ea0\u7f20\u3002\u5c06\u8fd9\u4e09\u4e2a\u51b7\u5374\u5230\u7edd\u5bf9\u96f6\u5ea6\uff0c\u53ea\u770b\u5176\u4e2d\u4e00\u4e2a\uff1a\u5b83\u8868\u73b0\u5f97\u4eff\u4f5b\u6e29\u6696\uff0c\u4e00\u79cd\u7eaf\u7531\u7ea0\u7f20\u800c\u751f\u7684\u6709\u6548\u6e29\u5ea6\u3002\u6211\u4eec\u53d1\u8868\u5728 Phys. Rev. E \u7684\u8bba\u6587\u5c55\u793a\u4e86\u5404\u5411\u5f02\u6027\u5982\u4f55\u4f7f\u8fd9\u79cd\u7ea0\u7f20\u66f4\u52a0\u575a\u97e7\uff0c\u4ee5\u53ca\u4e00\u6b21\u65e5\u5e38\u7684\u78c1\u6d4b\u91cf\u5982\u4f55\u5f53\u573a\u6355\u83b7\u5b83\u3002\n\u5206\u4e24\u5c42\u9605\u8bfb\uff0c\u4e00\u5c42\u9762\u5411\u6240\u6709\u4eba\uff0c\u4e00\u5c42\u9762\u5411\u4e13\u4e1a\u8bfb\u8005\u3002"
    },
    link: {
      url: "/blog/paper-3qubits",
      label: { en:"Read it in \u03c0 min", es:"L\u00e9elo en \u03c0 min", de:"In \u03c0 Min lesen", zh:"\u03c0 \u5206\u949f\u8bfb\u61c2" }
    },
    images: [],
    video: null
  },
  {
    date: "2026-07-19",
    dateLabel: "Jul 2026",
    category: { en:"Papers explained", es:"Papers explicados", de:"Papers erklärt", zh:"论文解读" },
    featured: true,
    title: {
      en: "The golden ratio hidden inside a magnet",
      es: "El número áureo escondido dentro de un imán",
      de: "Der goldene Schnitt, versteckt in einem Magneten",
      zh: "藏在磁体里的黄金比例"
    },
    body: {
      en: "Picture a row of coins on a table, each showing heads or tails: that is essentially a magnet seen up close. At the exact field where two opposing tendencies tie, how many arrangements share the same energy? The answer turned out to be Fibonacci — and some rungs of the energy ladder are strictly forbidden.\nI wrote the full explanation in two layers, one for everyone and one for specialists, switchable with a single tap.",
      es: "Imagina una fila de monedas sobre la mesa, cada una mostrando cara o sello: eso es, esencialmente, un imán visto de muy cerca. En el campo exacto donde dos tendencias opuestas empatan, ¿cuántas configuraciones comparten la misma energía? La respuesta resultó ser Fibonacci — y algunos peldaños de la escalera energética están estrictamente prohibidos.\nEscribí la explicación completa en dos capas, una para todo público y otra para especialistas, que cambias con un solo toque.",
      de: "Stell dir eine Reihe Münzen vor, jede zeigt Kopf oder Zahl: im Kern ein Magnet aus der Nähe. Wie viele Anordnungen teilen bei genau dem Feld, in dem sich zwei gegenläufige Tendenzen die Waage halten, dieselbe Energie? Die Antwort war Fibonacci — und einige Sprossen der Energieleiter sind strikt verboten.\nDie vollständige Erklärung gibt es in zwei Ebenen, eine für alle und eine für Fachleute, umschaltbar mit einem Tippen.",
      zh: "想象桌上排成一行的硬币，每枚只能显示正面或反面：这本质上就是近距离观察的磁体。在两种相反倾向恰好势均力敌的场强下，有多少种排布共享同一能量？答案是斐波那契数列——而能量阶梯上的某些台阶被严格禁止。\n完整解读分为两层，一层面向所有人，一层面向专业读者，轻点即可切换。"
    },
    link: {
      url: "/blog/paper-entropy-ising",
      label: { en:"Read the explainer", es:"Leer la explicación", de:"Erklärung lesen", zh:"阅读解读" }
    },
    images: [],
    video: null
  },
];
