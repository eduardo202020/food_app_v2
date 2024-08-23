export interface foodDataProps {
  episodio: number;
  nombre_receta: string;
  tipo: string;
  media: string[];
  ingredientes: {
    [key: string]: string[];
  };
  preparacion: {
    [key: string]: {
      texto: string;
      verbos_clave: string[];
    }[];
  };
  tips: string[];
  temporada: number;
  nivel_complejidad: string;
  glosario: string[];
  slug: string;
}

export const foodData: foodDataProps[] = [
  {
    episodio: 29,
    nombre_receta: "ENSALADA WALDORF CON PAPAS DUQUESAS",
    tipo: "Carne",
    media: [
      "https://img.youtube.com/vi/pv31kkZBAys/sddefault.jpg",
      "https://youtube.com/watch?v=gKjQllo5E0Y",
      "https://youtube.com/watch?v=pv31kkZBAys",
      "https://youtube.com/watch?v=cxzg6aywpso",
    ],
    ingredientes: {
      "ENSALADA WALDORF": [
        "5 manzanas rojas en brunoise",
        "3 papas blancas cocidas y en cubos de 1 cm x 1 cm",
        "3 tallos de apio",
        "150 g de pasas morenas",
        "1 lechuga francesa o escarola en trozos",
        "100 g de pecanas o nueces picadas",
      ],
      "VINAGRETA DE LA ENSALADA": [
        "1 cda. de mostaza",
        "1 limón",
        "1 tza. aceite vegetal",
        "1 huevo",
        "Sal y pimienta",
        "Azúcar",
      ],
      "PAPAS DUQUESAS": [
        "1 kg de papa blanca",
        "100 g de mantequilla",
        "Nuez moscada rallada",
        "3 huevos",
        "Sal y pimienta",
      ],
    },
    preparacion: {
      "ENSALADA WALDORF": [
        {
          texto:
            "PASO 1: En una licuadora haz una mayonesa agregando un huevo, y 1 cucharada de mostaza, el zumo de un limón, un poco de sal, licúa y emulsiona mientras agregas el aceite vegetal en forma de hilo hasta que tome la textura de una mayonesa homogénea. Rectifica la sazón y reserva en frío.",
          verbos_clave: ["agrega", "reserva"],
        },
        {
          texto:
            "PASO 2: Lava bien los tallos de apio y córtalos en brunoise. Pela y corta las manzanas en cubos de 1 cm por 1 cm, consérvalas en agua con un poco de zumo de limón para evitar que se oxiden.",
          verbos_clave: ["corta"],
        },
        {
          texto:
            "PASO 3: A la mayonesa previamente hecha, sazónala con un poco de zumo de limón, el azúcar y la sal. Mezcla bien hasta tener una vinagreta. En un bol aparte, coloca todos los ingredientes de la ensalada e incorpora la vinagreta. Remueve bien para que se mezclen todos los ingredientes.",
          verbos_clave: ["mezcla", "coloca"],
        },
      ],
      "PAPAS DUQUESAS": [
        {
          texto:
            "PASO 1: Lava bien las papas y en una olla con agua fría cocínalas por 30 minutos o hasta que estén completamente cocidas, pela y prensa la papa caliente.",
          verbos_clave: ["enfría", "pela"],
        },
        {
          texto:
            "PASO 2: En un bol coloca el puré de papa caliente con mantequilla derretida, sazona con sal y pimienta y luego incorpora los huevos batidos sin dejar de mover. Reserva en una manga pastelera con un pico decorativo.",
          verbos_clave: ["coloca", "calienta"],
        },
        {
          texto:
            "PASO 3: Sobre una bandeja para horno con tapete de silicona o con papel manteca moldea las papas duquesa dándoles forma ondulada como si fuera un merengue, pincela con huevo y hornea en un horno precalentado a 180°C por 5 minutos o hasta que estén doradas. Sirve caliente.",
          verbos_clave: ["sirve", "calienta"],
        },
      ],
    },
    tips: [
      "Al hacer la mayonesa asegúrate que el aceite en hilo se mezcle de la forma correcta a medida que se va emulsionando la mayonesa. Si aún no se integra bien. Deja de incorporar el aceite y espera que se mezcle antes de continuar con la emulsión.",
      "Utiliza una manga pastelera con una boquilla estrellada para dar forma a las papas duquesas. Esto te permitirá obtener el aspecto tradicional.",
    ],
    temporada: 5,
    nivel_complejidad: "Avanzado",
    glosario: ["CUCHARADA", "NUEZ DE MANTEQUILLA", "EMULSIÓN", "BRUNOISE"],
    slug: "ensalada-waldorf-con-papas-duquesas-v33",
  },
  {
    episodio: 29,
    nombre_receta: "PECHUGA DE PAVO CON ARROZ ÁRABE",
    tipo: "Internacional",
    media: [
      "https://img.youtube.com/vi/VsoYb7-AsfA/sddefault.jpg",
      "https://youtube.com/watch?v=FKsDlos0KCw",
      "https://youtube.com/watch?v=VsoYb7-AsfA",
      "https://youtube.com/watch?v=aWwya8oB54I",
    ],
    ingredientes: {
      "PECHUGA DE PAVO": [
        "1 pechuga de pavo",
        "1 tza. de BIG COLA",
        "1 1/2 cda. de ajo molido",
        "1/2 cda. de pimienta",
        "1/2 cda. de comino",
        "1/2 cda. de orégano seco",
        "1 1/2 cda. de sal",
        "2 naranjas de jugo",
        "1 pimiento rojo en bastones",
        "1 zanahoria en bastones",
        "150 g de queso Edam",
        "150 g de jamón inglés",
      ],
      "ARROZ ÁRABE": [
        "2 tzas. de arroz",
        "100 g de pecanas",
        "150 g de tocino",
        "100 g de fideo cabello de ángel",
        "2 1/2 tzas. de BIG COLA",
        "4 ajos pelados",
        "80 g de pasas rubias",
        "80 g de pasas morenas",
        "Perejil",
        "Sal",
      ],
    },
    preparacion: {
      "PECHUGA DE PAVO": [
        {
          texto:
            "PASO 1: Deshuesa la pechuga de pavo y haz una incisión desde la parte más gruesa a la parte más delgada de las pechugas, sin atravesar completamente las pechugas y dejándolas como una bolsa. Rellénalas con zanahoria y pimientos en bastones, queso Edam y jamón inglés. Cierra la apertura de la pechugas con mondadientes.",
          verbos_clave: ["cierra"],
        },
        {
          texto:
            "PASO 2: En un bol coloca 1 taza de Big Cola con 1 1/2 cucharada de ajo molido, 1/2 cucharada de pimienta, 1/2 cucharada de comino, 1/2 cucharada de orégano seco, 1 1/2 cucharadas de sal y el zumo de dos naranjas de jugo. Mézclalo bien.",
          verbos_clave: ["coloca"],
        },
        {
          texto:
            "PASO 3: Marina las pechugas rellenas por unos 15 como mínimo, luego colócalas en una bandeja de metal, báñalas con el jugo de la mezcla, cubre con papel aluminio y llévala a cocción en un horno precalentado a 180°C por unos 45 minutos. Pasados los primeros 30 minutos retira el papel aluminio para que las pechugas se doren y deja 15 minutos más. Pasado el tiempo la cocción sácalas del horno y en una tabla limpia córtalas en rodajas ligeramente gruesas.",
          verbos_clave: ["retira", "mezcla"],
        },
        {
          texto:
            "PASO 4: Cuela el jugo del horneado del pavo y redúcelo hasta que tenga una consistencia de salsa, termina echándole una cucharada de mantequilla, que derrita bien y con esa salsa baña y decora las rodajas de pechuga en el plato.",
          verbos_clave: [],
        },
      ],
      "ARROZ ÁRABE": [
        {
          texto:
            "PASO 1: En una sartén dora el tocino hasta que quede crocante y resérvalo. Luego, en la misma sartén dora los fideos cabello de ángel partidos por la mitad y tuéstalos en la sartén de a pocos. Resérvalos.",
          verbos_clave: [],
        },
        {
          texto:
            "PASO 2: En una olla coloca un chorro de aceite, el ajo molido, y cocina hasta que se comience a pegar en el cucharón. Agrega el arroz y nacara , luego agrega la mitad de las pecanas tostadas, la mitad de los fideos tostados, la mitad del tocino crocante, las pasas completas y 2 1/2 tazas de Big Cola, tapa y cocina por 20 minutos, a fuego mínimo. Cuando el líquido se haya secado agrega la mitad que nos queda de las pecanas, fideos, tocino y un poco de perejil picado, granea y deja que se termine de cocinar el arroz.",
          verbos_clave: ["cocina", "agrega"],
        },
        {
          texto:
            "PASO 3: Sirve en fuentes por separado, para disfrutar en familia o con muy buenos amigos.",
          verbos_clave: ["sirve"],
        },
      ],
    },
    tips: [
      "Utiliza un termómetro de cocina para asegurarte de que la temperatura interna de la pechuga de pavo alcance los 75°C, para garantizar que esté completamente cocida.",
    ],
    temporada: 5,
    nivel_complejidad: "Desafiante",
    glosario: [
      "MARINAR",
      "BASTONES",
      "TEMPERAR",
      "CUCHARADA",
      "PEINAR EL ARROZ",
    ],
    slug: "pechuga-de-pavo-con-arroz-rabe-v455",
  },
  {
    episodio: 30,
    nombre_receta: "QUESADILLAS Y NACHOS CON GUACAMOLE",
    tipo: "Entrada",
    media: [
      "https://img.youtube.com/vi/HXeF1fP3OOM/sddefault.jpg",
      "https://youtube.com/watch?v=ys4uufhlFao",
      "https://youtube.com/watch?v=HXeF1fP3OOM",
      "https://youtube.com/watch?v=kDsP8j7Z2PU",
    ],
    ingredientes: {
      TORTILLAS: [
        "2 tzas. de harina de maíz nixtamalizada",
        "1 1/3 tzas. de agua",
      ],
      GUACAMOLE: [
        "2 paltas",
        "1 tomate en concassé",
        "1 tza. de culantro picado",
        "1/2 cebolla en brunoise",
        "2 limones",
        "1/2 ají limo en brunoise",
        "Sal y pimienta",
      ],
      QUESADILLAS: ["2 bolas de queso mozzarella rallado"],
      NACHOS: ["Aceite vegetal para freír"],
    },
    preparacion: {
      TORTILLAS: [
        {
          texto:
            "PASO 1: En un bol agrega la harina y mézclala con el agua, amasando durante 2 minutos. Si la masa se siente un poco seca puedes agregar una cucharada de agua. Una vez lista la dividimos en 20 bolitas de 25 gramos cada una y las cubrimos con un paño húmedo mientras vamos estirando la masa bolita por bolita. Pon un poco de papel film en la mesa de trabajo, coloca una bolita de masa, cubre con otro papel film y con la ayuda de un rodillo aplana dándole forma a la tortilla. Repite el proceso con todas las masas.",
          verbos_clave: ["agrega", "coloca"],
        },
        {
          texto:
            "PASO 2: En una sartén sella las tortillas, a fuego medio, entre 1 a 2 minutos por lado. Retíralas y déjalas reposar envueltas en un paño de tela seco dentro de una bandeja o plato para que se mantengan bien.",
          verbos_clave: ["sella"],
        },
      ],
      NACHOS: [
        {
          texto:
            "PASO 1: Corta las tortillas ya doradas en triángulos y fríelos a 180°C en una fritura profunda con abundante aceite vegetal hasta que estén doradas. Retíralas sobre papel absorbente y agrega sal cuando aún estén calientes.",
          verbos_clave: ["corta", "agrega"],
        },
      ],
      QUESADILLA: [
        {
          texto:
            "PASO 1: En una sartén caliente pon una tortilla, colócale queso mozzarella rallado, espera a que derrita un poco el queso y cierra las tortillas a la mitad.",
          verbos_clave: ["calienta", "cierra"],
        },
      ],
      GUACAMOLE: [
        {
          texto:
            "PASO 1: Machaca las paltas en un bol y agrégales el tomate chiquito, zumo de dos limones, sal, pimienta y un poco de culantro picado. Mézclalo bien, rectifica la sal y sirve.",
          verbos_clave: ["sirve"],
        },
        {
          texto:
            "PASO 2: Sirve los nachos con el guacamole y quesadillas calientes.",
          verbos_clave: ["sirve"],
        },
      ],
    },
    tips: [
      "Si al momento de estirar la masa se contrae, déjala descansar por unos 10 minutos tapada con un secador, para que se relaje la masa y sea mucho más fácil de estirar.",
      "Ojo, los alimentos absorberán menos cantidad de aceite si los fries en abundante aceite donde estén sumergidos por completo, asegurándote de estar a 180°C.",
    ],
    temporada: 5,
    nivel_complejidad: "Intermedio",
    glosario: ["CONCASSÉ", "CUCHARADA", "FRITURA PROFUNDA", "BRUNOISE"],
    slug: "quesadillas-y-nachos-con-guacamole-v45",
  },
  {
    episodio: 29,
    nombre_receta: "ENSALADA WALDORF CON PAPAS DUQUESAS",
    tipo: "Postre",
    media: [
      "https://img.youtube.com/vi/pv31kkZBAys/sddefault.jpg",
      "https://youtube.com/watch?v=gKjQllo5E0Y",
      "https://youtube.com/watch?v=pv31kkZBAys",
      "https://youtube.com/watch?v=cxzg6aywpso",
    ],
    ingredientes: {
      "ENSALADA WALDORF": [
        "5 manzanas rojas en brunoise",
        "3 papas blancas cocidas y en cubos de 1 cm x 1 cm",
        "3 tallos de apio",
        "150 g de pasas morenas",
        "1 lechuga francesa o escarola en trozos",
        "100 g de pecanas o nueces picadas",
      ],
      "VINAGRETA DE LA ENSALADA": [
        "1 cda. de mostaza",
        "1 limón",
        "1 tza. aceite vegetal",
        "1 huevo",
        "Sal y pimienta",
        "Azúcar",
      ],
      "PAPAS DUQUESAS": [
        "1 kg de papa blanca",
        "100 g de mantequilla",
        "Nuez moscada rallada",
        "3 huevos",
        "Sal y pimienta",
      ],
    },
    preparacion: {
      "ENSALADA WALDORF": [
        {
          texto:
            "PASO 1: En una licuadora haz una mayonesa agregando un huevo, y 1 cucharada de mostaza, el zumo de un limón, un poco de sal, licúa y emulsiona mientras agregas el aceite vegetal en forma de hilo hasta que tome la textura de una mayonesa homogénea. Rectifica la sazón y reserva en frío.",
          verbos_clave: ["agrega", "reserva"],
        },
        {
          texto:
            "PASO 2: Lava bien los tallos de apio y córtalos en brunoise. Pela y corta las manzanas en cubos de 1 cm por 1 cm, consérvalas en agua con un poco de zumo de limón para evitar que se oxiden.",
          verbos_clave: ["corta"],
        },
        {
          texto:
            "PASO 3: A la mayonesa previamente hecha, sazónala con un poco de zumo de limón, el azúcar y la sal. Mezcla bien hasta tener una vinagreta. En un bol aparte, coloca todos los ingredientes de la ensalada e incorpora la vinagreta. Remueve bien para que se mezclen todos los ingredientes.",
          verbos_clave: ["mezcla", "coloca"],
        },
      ],
      "PAPAS DUQUESAS": [
        {
          texto:
            "PASO 1: Lava bien las papas y en una olla con agua fría cocínalas por 30 minutos o hasta que estén completamente cocidas, pela y prensa la papa caliente.",
          verbos_clave: ["enfría", "pela"],
        },
        {
          texto:
            "PASO 2: En un bol coloca el puré de papa caliente con mantequilla derretida, sazona con sal y pimienta y luego incorpora los huevos batidos sin dejar de mover. Reserva en una manga pastelera con un pico decorativo.",
          verbos_clave: ["coloca", "calienta"],
        },
        {
          texto:
            "PASO 3: Sobre una bandeja para horno con tapete de silicona o con papel manteca moldea las papas duquesa dándoles forma ondulada como si fuera un merengue, pincela con huevo y hornea en un horno precalentado a 180°C por 5 minutos o hasta que estén doradas. Sirve caliente.",
          verbos_clave: ["sirve", "calienta"],
        },
      ],
    },
    tips: [
      "Al hacer la mayonesa asegúrate que el aceite en hilo se mezcle de la forma correcta a medida que se va emulsionando la mayonesa. Si aún no se integra bien. Deja de incorporar el aceite y espera que se mezcle antes de continuar con la emulsión.",
      "Utiliza una manga pastelera con una boquilla estrellada para dar forma a las papas duquesas. Esto te permitirá obtener el aspecto tradicional.",
    ],
    temporada: 5,
    nivel_complejidad: "Avanzado",
    glosario: ["CUCHARADA", "NUEZ DE MANTEQUILLA", "EMULSIÓN", "BRUNOISE"],
    slug: "ensalada-waldorf-con-papas-duquesas-v88",
  },
  {
    episodio: 29,
    nombre_receta: "PECHUGA DE PAVO CON ARROZ ÁRABE",
    tipo: "Carne",
    media: [
      "https://img.youtube.com/vi/VsoYb7-AsfA/sddefault.jpg",
      "https://youtube.com/watch?v=FKsDlos0KCw",
      "https://youtube.com/watch?v=VsoYb7-AsfA",
      "https://youtube.com/watch?v=aWwya8oB54I",
    ],
    ingredientes: {
      "PECHUGA DE PAVO": [
        "1 pechuga de pavo",
        "1 tza. de BIG COLA",
        "1 1/2 cda. de ajo molido",
        "1/2 cda. de pimienta",
        "1/2 cda. de comino",
        "1/2 cda. de orégano seco",
        "1 1/2 cda. de sal",
        "2 naranjas de jugo",
        "1 pimiento rojo en bastones",
        "1 zanahoria en bastones",
        "150 g de queso Edam",
        "150 g de jamón inglés",
      ],
      "ARROZ ÁRABE": [
        "2 tzas. de arroz",
        "100 g de pecanas",
        "150 g de tocino",
        "100 g de fideo cabello de ángel",
        "2 1/2 tzas. de BIG COLA",
        "4 ajos pelados",
        "80 g de pasas rubias",
        "80 g de pasas morenas",
        "Perejil",
        "Sal",
      ],
    },
    preparacion: {
      "PECHUGA DE PAVO": [
        {
          texto:
            "PASO 1: Deshuesa la pechuga de pavo y haz una incisión desde la parte más gruesa a la parte más delgada de las pechugas, sin atravesar completamente las pechugas y dejándolas como una bolsa. Rellénalas con zanahoria y pimientos en bastones, queso Edam y jamón inglés. Cierra la apertura de la pechugas con mondadientes.",
          verbos_clave: ["cierra"],
        },
        {
          texto:
            "PASO 2: En un bol coloca 1 taza de Big Cola con 1 1/2 cucharada de ajo molido, 1/2 cucharada de pimienta, 1/2 cucharada de comino, 1/2 cucharada de orégano seco, 1 1/2 cucharadas de sal y el zumo de dos naranjas de jugo. Mézclalo bien.",
          verbos_clave: ["coloca"],
        },
        {
          texto:
            "PASO 3: Marina las pechugas rellenas por unos 15 como mínimo, luego colócalas en una bandeja de metal, báñalas con el jugo de la mezcla, cubre con papel aluminio y llévala a cocción en un horno precalentado a 180°C por unos 45 minutos. Pasados los primeros 30 minutos retira el papel aluminio para que las pechugas se doren y deja 15 minutos más. Pasado el tiempo la cocción sácalas del horno y en una tabla limpia córtalas en rodajas ligeramente gruesas.",
          verbos_clave: ["retira", "mezcla"],
        },
        {
          texto:
            "PASO 4: Cuela el jugo del horneado del pavo y redúcelo hasta que tenga una consistencia de salsa, termina echándole una cucharada de mantequilla, que derrita bien y con esa salsa baña y decora las rodajas de pechuga en el plato.",
          verbos_clave: [],
        },
      ],
      "ARROZ ÁRABE": [
        {
          texto:
            "PASO 1: En una sartén dora el tocino hasta que quede crocante y resérvalo. Luego, en la misma sartén dora los fideos cabello de ángel partidos por la mitad y tuéstalos en la sartén de a pocos. Resérvalos.",
          verbos_clave: [],
        },
        {
          texto:
            "PASO 2: En una olla coloca un chorro de aceite, el ajo molido, y cocina hasta que se comience a pegar en el cucharón. Agrega el arroz y nacara , luego agrega la mitad de las pecanas tostadas, la mitad de los fideos tostados, la mitad del tocino crocante, las pasas completas y 2 1/2 tazas de Big Cola, tapa y cocina por 20 minutos, a fuego mínimo. Cuando el líquido se haya secado agrega la mitad que nos queda de las pecanas, fideos, tocino y un poco de perejil picado, granea y deja que se termine de cocinar el arroz.",
          verbos_clave: ["cocina", "agrega"],
        },
        {
          texto:
            "PASO 3: Sirve en fuentes por separado, para disfrutar en familia o con muy buenos amigos.",
          verbos_clave: ["sirve"],
        },
      ],
    },
    tips: [
      "Utiliza un termómetro de cocina para asegurarte de que la temperatura interna de la pechuga de pavo alcance los 75°C, para garantizar que esté completamente cocida.",
    ],
    temporada: 5,
    nivel_complejidad: "Desafiante",
    glosario: [
      "MARINAR",
      "BASTONES",
      "TEMPERAR",
      "CUCHARADA",
      "PEINAR EL ARROZ",
    ],
    slug: "pechuga-de-pavo-con-arroz-rabe-v6",
  },
  {
    episodio: 30,
    nombre_receta: "QUESADILLAS Y NACHOS CON GUACAMOLE",
    tipo: "Otro",
    media: [
      "https://img.youtube.com/vi/HXeF1fP3OOM/sddefault.jpg",
      "https://youtube.com/watch?v=ys4uufhlFao",
      "https://youtube.com/watch?v=HXeF1fP3OOM",
      "https://youtube.com/watch?v=kDsP8j7Z2PU",
    ],
    ingredientes: {
      TORTILLAS: [
        "2 tzas. de harina de maíz nixtamalizada",
        "1 1/3 tzas. de agua",
      ],
      GUACAMOLE: [
        "2 paltas",
        "1 tomate en concassé",
        "1 tza. de culantro picado",
        "1/2 cebolla en brunoise",
        "2 limones",
        "1/2 ají limo en brunoise",
        "Sal y pimienta",
      ],
      QUESADILLAS: ["2 bolas de queso mozzarella rallado"],
      NACHOS: ["Aceite vegetal para freír"],
    },
    preparacion: {
      TORTILLAS: [
        {
          texto:
            "PASO 1: En un bol agrega la harina y mézclala con el agua, amasando durante 2 minutos. Si la masa se siente un poco seca puedes agregar una cucharada de agua. Una vez lista la dividimos en 20 bolitas de 25 gramos cada una y las cubrimos con un paño húmedo mientras vamos estirando la masa bolita por bolita. Pon un poco de papel film en la mesa de trabajo, coloca una bolita de masa, cubre con otro papel film y con la ayuda de un rodillo aplana dándole forma a la tortilla. Repite el proceso con todas las masas.",
          verbos_clave: ["agrega", "coloca"],
        },
        {
          texto:
            "PASO 2: En una sartén sella las tortillas, a fuego medio, entre 1 a 2 minutos por lado. Retíralas y déjalas reposar envueltas en un paño de tela seco dentro de una bandeja o plato para que se mantengan bien.",
          verbos_clave: ["sella"],
        },
      ],
      NACHOS: [
        {
          texto:
            "PASO 1: Corta las tortillas ya doradas en triángulos y fríelos a 180°C en una fritura profunda con abundante aceite vegetal hasta que estén doradas. Retíralas sobre papel absorbente y agrega sal cuando aún estén calientes.",
          verbos_clave: ["corta", "agrega"],
        },
      ],
      QUESADILLA: [
        {
          texto:
            "PASO 1: En una sartén caliente pon una tortilla, colócale queso mozzarella rallado, espera a que derrita un poco el queso y cierra las tortillas a la mitad.",
          verbos_clave: ["calienta", "cierra"],
        },
      ],
      GUACAMOLE: [
        {
          texto:
            "PASO 1: Machaca las paltas en un bol y agrégales el tomate chiquito, zumo de dos limones, sal, pimienta y un poco de culantro picado. Mézclalo bien, rectifica la sal y sirve.",
          verbos_clave: ["sirve"],
        },
        {
          texto:
            "PASO 2: Sirve los nachos con el guacamole y quesadillas calientes.",
          verbos_clave: ["sirve"],
        },
      ],
    },
    tips: [
      "Si al momento de estirar la masa se contrae, déjala descansar por unos 10 minutos tapada con un secador, para que se relaje la masa y sea mucho más fácil de estirar.",
      "Ojo, los alimentos absorberán menos cantidad de aceite si los fries en abundante aceite donde estén sumergidos por completo, asegurándote de estar a 180°C.",
    ],
    temporada: 5,
    nivel_complejidad: "Fácil",
    glosario: ["CONCASSÉ", "CUCHARADA", "FRITURA PROFUNDA", "BRUNOISE"],
    slug: "quesadillas-y-nachos-con-guacamole-v5",
  },
  {
    episodio: 29,
    nombre_receta: "ENSALADA WALDORF CON PAPAS DUQUESAS",
    tipo: "Carne",
    media: [
      "https://img.youtube.com/vi/pv31kkZBAys/sddefault.jpg",
      "https://youtube.com/watch?v=gKjQllo5E0Y",
      "https://youtube.com/watch?v=pv31kkZBAys",
      "https://youtube.com/watch?v=cxzg6aywpso",
    ],
    ingredientes: {
      "ENSALADA WALDORF": [
        "5 manzanas rojas en brunoise",
        "3 papas blancas cocidas y en cubos de 1 cm x 1 cm",
        "3 tallos de apio",
        "150 g de pasas morenas",
        "1 lechuga francesa o escarola en trozos",
        "100 g de pecanas o nueces picadas",
      ],
      "VINAGRETA DE LA ENSALADA": [
        "1 cda. de mostaza",
        "1 limón",
        "1 tza. aceite vegetal",
        "1 huevo",
        "Sal y pimienta",
        "Azúcar",
      ],
      "PAPAS DUQUESAS": [
        "1 kg de papa blanca",
        "100 g de mantequilla",
        "Nuez moscada rallada",
        "3 huevos",
        "Sal y pimienta",
      ],
    },
    preparacion: {
      "ENSALADA WALDORF": [
        {
          texto:
            "PASO 1: En una licuadora haz una mayonesa agregando un huevo, y 1 cucharada de mostaza, el zumo de un limón, un poco de sal, licúa y emulsiona mientras agregas el aceite vegetal en forma de hilo hasta que tome la textura de una mayonesa homogénea. Rectifica la sazón y reserva en frío.",
          verbos_clave: ["agrega", "reserva"],
        },
        {
          texto:
            "PASO 2: Lava bien los tallos de apio y córtalos en brunoise. Pela y corta las manzanas en cubos de 1 cm por 1 cm, consérvalas en agua con un poco de zumo de limón para evitar que se oxiden.",
          verbos_clave: ["corta"],
        },
        {
          texto:
            "PASO 3: A la mayonesa previamente hecha, sazónala con un poco de zumo de limón, el azúcar y la sal. Mezcla bien hasta tener una vinagreta. En un bol aparte, coloca todos los ingredientes de la ensalada e incorpora la vinagreta. Remueve bien para que se mezclen todos los ingredientes.",
          verbos_clave: ["mezcla", "coloca"],
        },
      ],
      "PAPAS DUQUESAS": [
        {
          texto:
            "PASO 1: Lava bien las papas y en una olla con agua fría cocínalas por 30 minutos o hasta que estén completamente cocidas, pela y prensa la papa caliente.",
          verbos_clave: ["enfría", "pela"],
        },
        {
          texto:
            "PASO 2: En un bol coloca el puré de papa caliente con mantequilla derretida, sazona con sal y pimienta y luego incorpora los huevos batidos sin dejar de mover. Reserva en una manga pastelera con un pico decorativo.",
          verbos_clave: ["coloca", "calienta"],
        },
        {
          texto:
            "PASO 3: Sobre una bandeja para horno con tapete de silicona o con papel manteca moldea las papas duquesa dándoles forma ondulada como si fuera un merengue, pincela con huevo y hornea en un horno precalentado a 180°C por 5 minutos o hasta que estén doradas. Sirve caliente.",
          verbos_clave: ["sirve", "calienta"],
        },
      ],
    },
    tips: [
      "Al hacer la mayonesa asegúrate que el aceite en hilo se mezcle de la forma correcta a medida que se va emulsionando la mayonesa. Si aún no se integra bien. Deja de incorporar el aceite y espera que se mezcle antes de continuar con la emulsión.",
      "Utiliza una manga pastelera con una boquilla estrellada para dar forma a las papas duquesas. Esto te permitirá obtener el aspecto tradicional.",
    ],
    temporada: 5,
    nivel_complejidad: "Avanzado",
    glosario: ["CUCHARADA", "NUEZ DE MANTEQUILLA", "EMULSIÓN", "BRUNOISE"],
    slug: "ensalada-waldorf-con-papas-duquesas-v4",
  },
  {
    episodio: 29,
    nombre_receta: "PECHUGA DE PAVO CON ARROZ ÁRABE",
    tipo: "Internacional",
    media: [
      "https://img.youtube.com/vi/VsoYb7-AsfA/sddefault.jpg",
      "https://youtube.com/watch?v=FKsDlos0KCw",
      "https://youtube.com/watch?v=VsoYb7-AsfA",
      "https://youtube.com/watch?v=aWwya8oB54I",
    ],
    ingredientes: {
      "PECHUGA DE PAVO": [
        "1 pechuga de pavo",
        "1 tza. de BIG COLA",
        "1 1/2 cda. de ajo molido",
        "1/2 cda. de pimienta",
        "1/2 cda. de comino",
        "1/2 cda. de orégano seco",
        "1 1/2 cda. de sal",
        "2 naranjas de jugo",
        "1 pimiento rojo en bastones",
        "1 zanahoria en bastones",
        "150 g de queso Edam",
        "150 g de jamón inglés",
      ],
      "ARROZ ÁRABE": [
        "2 tzas. de arroz",
        "100 g de pecanas",
        "150 g de tocino",
        "100 g de fideo cabello de ángel",
        "2 1/2 tzas. de BIG COLA",
        "4 ajos pelados",
        "80 g de pasas rubias",
        "80 g de pasas morenas",
        "Perejil",
        "Sal",
      ],
    },
    preparacion: {
      "PECHUGA DE PAVO": [
        {
          texto:
            "PASO 1: Deshuesa la pechuga de pavo y haz una incisión desde la parte más gruesa a la parte más delgada de las pechugas, sin atravesar completamente las pechugas y dejándolas como una bolsa. Rellénalas con zanahoria y pimientos en bastones, queso Edam y jamón inglés. Cierra la apertura de la pechugas con mondadientes.",
          verbos_clave: ["cierra"],
        },
        {
          texto:
            "PASO 2: En un bol coloca 1 taza de Big Cola con 1 1/2 cucharada de ajo molido, 1/2 cucharada de pimienta, 1/2 cucharada de comino, 1/2 cucharada de orégano seco, 1 1/2 cucharadas de sal y el zumo de dos naranjas de jugo. Mézclalo bien.",
          verbos_clave: ["coloca"],
        },
        {
          texto:
            "PASO 3: Marina las pechugas rellenas por unos 15 como mínimo, luego colócalas en una bandeja de metal, báñalas con el jugo de la mezcla, cubre con papel aluminio y llévala a cocción en un horno precalentado a 180°C por unos 45 minutos. Pasados los primeros 30 minutos retira el papel aluminio para que las pechugas se doren y deja 15 minutos más. Pasado el tiempo la cocción sácalas del horno y en una tabla limpia córtalas en rodajas ligeramente gruesas.",
          verbos_clave: ["retira", "mezcla"],
        },
        {
          texto:
            "PASO 4: Cuela el jugo del horneado del pavo y redúcelo hasta que tenga una consistencia de salsa, termina echándole una cucharada de mantequilla, que derrita bien y con esa salsa baña y decora las rodajas de pechuga en el plato.",
          verbos_clave: [],
        },
      ],
      "ARROZ ÁRABE": [
        {
          texto:
            "PASO 1: En una sartén dora el tocino hasta que quede crocante y resérvalo. Luego, en la misma sartén dora los fideos cabello de ángel partidos por la mitad y tuéstalos en la sartén de a pocos. Resérvalos.",
          verbos_clave: [],
        },
        {
          texto:
            "PASO 2: En una olla coloca un chorro de aceite, el ajo molido, y cocina hasta que se comience a pegar en el cucharón. Agrega el arroz y nacara , luego agrega la mitad de las pecanas tostadas, la mitad de los fideos tostados, la mitad del tocino crocante, las pasas completas y 2 1/2 tazas de Big Cola, tapa y cocina por 20 minutos, a fuego mínimo. Cuando el líquido se haya secado agrega la mitad que nos queda de las pecanas, fideos, tocino y un poco de perejil picado, granea y deja que se termine de cocinar el arroz.",
          verbos_clave: ["cocina", "agrega"],
        },
        {
          texto:
            "PASO 3: Sirve en fuentes por separado, para disfrutar en familia o con muy buenos amigos.",
          verbos_clave: ["sirve"],
        },
      ],
    },
    tips: [
      "Utiliza un termómetro de cocina para asegurarte de que la temperatura interna de la pechuga de pavo alcance los 75°C, para garantizar que esté completamente cocida.",
    ],
    temporada: 5,
    nivel_complejidad: "Desafiante",
    glosario: [
      "MARINAR",
      "BASTONES",
      "TEMPERAR",
      "CUCHARADA",
      "PEINAR EL ARROZ",
    ],
    slug: "pechuga-de-pavo-con-arroz-rabe-v3",
  },
  {
    episodio: 30,
    nombre_receta: "QUESADILLAS Y NACHOS CON GUACAMOLE",
    tipo: "Entrada",
    media: [
      "https://img.youtube.com/vi/HXeF1fP3OOM/sddefault.jpg",
      "https://youtube.com/watch?v=ys4uufhlFao",
      "https://youtube.com/watch?v=HXeF1fP3OOM",
      "https://youtube.com/watch?v=kDsP8j7Z2PU",
    ],
    ingredientes: {
      TORTILLAS: [
        "2 tzas. de harina de maíz nixtamalizada",
        "1 1/3 tzas. de agua",
      ],
      GUACAMOLE: [
        "2 paltas",
        "1 tomate en concassé",
        "1 tza. de culantro picado",
        "1/2 cebolla en brunoise",
        "2 limones",
        "1/2 ají limo en brunoise",
        "Sal y pimienta",
      ],
      QUESADILLAS: ["2 bolas de queso mozzarella rallado"],
      NACHOS: ["Aceite vegetal para freír"],
    },
    preparacion: {
      TORTILLAS: [
        {
          texto:
            "PASO 1: En un bol agrega la harina y mézclala con el agua, amasando durante 2 minutos. Si la masa se siente un poco seca puedes agregar una cucharada de agua. Una vez lista la dividimos en 20 bolitas de 25 gramos cada una y las cubrimos con un paño húmedo mientras vamos estirando la masa bolita por bolita. Pon un poco de papel film en la mesa de trabajo, coloca una bolita de masa, cubre con otro papel film y con la ayuda de un rodillo aplana dándole forma a la tortilla. Repite el proceso con todas las masas.",
          verbos_clave: ["agrega", "coloca"],
        },
        {
          texto:
            "PASO 2: En una sartén sella las tortillas, a fuego medio, entre 1 a 2 minutos por lado. Retíralas y déjalas reposar envueltas en un paño de tela seco dentro de una bandeja o plato para que se mantengan bien.",
          verbos_clave: ["sella"],
        },
      ],
      NACHOS: [
        {
          texto:
            "PASO 1: Corta las tortillas ya doradas en triángulos y fríelos a 180°C en una fritura profunda con abundante aceite vegetal hasta que estén doradas. Retíralas sobre papel absorbente y agrega sal cuando aún estén calientes.",
          verbos_clave: ["corta", "agrega"],
        },
      ],
      QUESADILLA: [
        {
          texto:
            "PASO 1: En una sartén caliente pon una tortilla, colócale queso mozzarella rallado, espera a que derrita un poco el queso y cierra las tortillas a la mitad.",
          verbos_clave: ["calienta", "cierra"],
        },
      ],
      GUACAMOLE: [
        {
          texto:
            "PASO 1: Machaca las paltas en un bol y agrégales el tomate chiquito, zumo de dos limones, sal, pimienta y un poco de culantro picado. Mézclalo bien, rectifica la sal y sirve.",
          verbos_clave: ["sirve"],
        },
        {
          texto:
            "PASO 2: Sirve los nachos con el guacamole y quesadillas calientes.",
          verbos_clave: ["sirve"],
        },
      ],
    },
    tips: [
      "Si al momento de estirar la masa se contrae, déjala descansar por unos 10 minutos tapada con un secador, para que se relaje la masa y sea mucho más fácil de estirar.",
      "Ojo, los alimentos absorberán menos cantidad de aceite si los fries en abundante aceite donde estén sumergidos por completo, asegurándote de estar a 180°C.",
    ],
    temporada: 5,
    nivel_complejidad: "Intermedio",
    glosario: ["CONCASSÉ", "CUCHARADA", "FRITURA PROFUNDA", "BRUNOISE"],
    slug: "quesadillas-y-nachos-con-guacamole-v2",
  },
  {
    episodio: 29,
    nombre_receta: "ENSALADA WALDORF CON PAPAS DUQUESAS",
    tipo: "Postre",
    media: [
      "https://img.youtube.com/vi/pv31kkZBAys/sddefault.jpg",
      "https://youtube.com/watch?v=gKjQllo5E0Y",
      "https://youtube.com/watch?v=pv31kkZBAys",
      "https://youtube.com/watch?v=cxzg6aywpso",
    ],
    ingredientes: {
      "ENSALADA WALDORF": [
        "5 manzanas rojas en brunoise",
        "3 papas blancas cocidas y en cubos de 1 cm x 1 cm",
        "3 tallos de apio",
        "150 g de pasas morenas",
        "1 lechuga francesa o escarola en trozos",
        "100 g de pecanas o nueces picadas",
      ],
      "VINAGRETA DE LA ENSALADA": [
        "1 cda. de mostaza",
        "1 limón",
        "1 tza. aceite vegetal",
        "1 huevo",
        "Sal y pimienta",
        "Azúcar",
      ],
      "PAPAS DUQUESAS": [
        "1 kg de papa blanca",
        "100 g de mantequilla",
        "Nuez moscada rallada",
        "3 huevos",
        "Sal y pimienta",
      ],
    },
    preparacion: {
      "ENSALADA WALDORF": [
        {
          texto:
            "PASO 1: En una licuadora haz una mayonesa agregando un huevo, y 1 cucharada de mostaza, el zumo de un limón, un poco de sal, licúa y emulsiona mientras agregas el aceite vegetal en forma de hilo hasta que tome la textura de una mayonesa homogénea. Rectifica la sazón y reserva en frío.",
          verbos_clave: ["agrega", "reserva"],
        },
        {
          texto:
            "PASO 2: Lava bien los tallos de apio y córtalos en brunoise. Pela y corta las manzanas en cubos de 1 cm por 1 cm, consérvalas en agua con un poco de zumo de limón para evitar que se oxiden.",
          verbos_clave: ["corta"],
        },
        {
          texto:
            "PASO 3: A la mayonesa previamente hecha, sazónala con un poco de zumo de limón, el azúcar y la sal. Mezcla bien hasta tener una vinagreta. En un bol aparte, coloca todos los ingredientes de la ensalada e incorpora la vinagreta. Remueve bien para que se mezclen todos los ingredientes.",
          verbos_clave: ["mezcla", "coloca"],
        },
      ],
      "PAPAS DUQUESAS": [
        {
          texto:
            "PASO 1: Lava bien las papas y en una olla con agua fría cocínalas por 30 minutos o hasta que estén completamente cocidas, pela y prensa la papa caliente.",
          verbos_clave: ["enfría", "pela"],
        },
        {
          texto:
            "PASO 2: En un bol coloca el puré de papa caliente con mantequilla derretida, sazona con sal y pimienta y luego incorpora los huevos batidos sin dejar de mover. Reserva en una manga pastelera con un pico decorativo.",
          verbos_clave: ["coloca", "calienta"],
        },
        {
          texto:
            "PASO 3: Sobre una bandeja para horno con tapete de silicona o con papel manteca moldea las papas duquesa dándoles forma ondulada como si fuera un merengue, pincela con huevo y hornea en un horno precalentado a 180°C por 5 minutos o hasta que estén doradas. Sirve caliente.",
          verbos_clave: ["sirve", "calienta"],
        },
      ],
    },
    tips: [
      "Al hacer la mayonesa asegúrate que el aceite en hilo se mezcle de la forma correcta a medida que se va emulsionando la mayonesa. Si aún no se integra bien. Deja de incorporar el aceite y espera que se mezcle antes de continuar con la emulsión.",
      "Utiliza una manga pastelera con una boquilla estrellada para dar forma a las papas duquesas. Esto te permitirá obtener el aspecto tradicional.",
    ],
    temporada: 5,
    nivel_complejidad: "Avanzado",
    glosario: ["CUCHARADA", "NUEZ DE MANTEQUILLA", "EMULSIÓN", "BRUNOISE"],
    slug: "ensalada-waldorf-con-papas-duquesas-v8",
  },
  {
    episodio: 29,
    nombre_receta: "PECHUGA DE PAVO CON ARROZ ÁRABE",
    tipo: "Carne",
    media: [
      "https://img.youtube.com/vi/VsoYb7-AsfA/sddefault.jpg",
      "https://youtube.com/watch?v=FKsDlos0KCw",
      "https://youtube.com/watch?v=VsoYb7-AsfA",
      "https://youtube.com/watch?v=aWwya8oB54I",
    ],
    ingredientes: {
      "PECHUGA DE PAVO": [
        "1 pechuga de pavo",
        "1 tza. de BIG COLA",
        "1 1/2 cda. de ajo molido",
        "1/2 cda. de pimienta",
        "1/2 cda. de comino",
        "1/2 cda. de orégano seco",
        "1 1/2 cda. de sal",
        "2 naranjas de jugo",
        "1 pimiento rojo en bastones",
        "1 zanahoria en bastones",
        "150 g de queso Edam",
        "150 g de jamón inglés",
      ],
      "ARROZ ÁRABE": [
        "2 tzas. de arroz",
        "100 g de pecanas",
        "150 g de tocino",
        "100 g de fideo cabello de ángel",
        "2 1/2 tzas. de BIG COLA",
        "4 ajos pelados",
        "80 g de pasas rubias",
        "80 g de pasas morenas",
        "Perejil",
        "Sal",
      ],
    },
    preparacion: {
      "PECHUGA DE PAVO": [
        {
          texto:
            "PASO 1: Deshuesa la pechuga de pavo y haz una incisión desde la parte más gruesa a la parte más delgada de las pechugas, sin atravesar completamente las pechugas y dejándolas como una bolsa. Rellénalas con zanahoria y pimientos en bastones, queso Edam y jamón inglés. Cierra la apertura de la pechugas con mondadientes.",
          verbos_clave: ["cierra"],
        },
        {
          texto:
            "PASO 2: En un bol coloca 1 taza de Big Cola con 1 1/2 cucharada de ajo molido, 1/2 cucharada de pimienta, 1/2 cucharada de comino, 1/2 cucharada de orégano seco, 1 1/2 cucharadas de sal y el zumo de dos naranjas de jugo. Mézclalo bien.",
          verbos_clave: ["coloca"],
        },
        {
          texto:
            "PASO 3: Marina las pechugas rellenas por unos 15 como mínimo, luego colócalas en una bandeja de metal, báñalas con el jugo de la mezcla, cubre con papel aluminio y llévala a cocción en un horno precalentado a 180°C por unos 45 minutos. Pasados los primeros 30 minutos retira el papel aluminio para que las pechugas se doren y deja 15 minutos más. Pasado el tiempo la cocción sácalas del horno y en una tabla limpia córtalas en rodajas ligeramente gruesas.",
          verbos_clave: ["retira", "mezcla"],
        },
        {
          texto:
            "PASO 4: Cuela el jugo del horneado del pavo y redúcelo hasta que tenga una consistencia de salsa, termina echándole una cucharada de mantequilla, que derrita bien y con esa salsa baña y decora las rodajas de pechuga en el plato.",
          verbos_clave: [],
        },
      ],
      "ARROZ ÁRABE": [
        {
          texto:
            "PASO 1: En una sartén dora el tocino hasta que quede crocante y resérvalo. Luego, en la misma sartén dora los fideos cabello de ángel partidos por la mitad y tuéstalos en la sartén de a pocos. Resérvalos.",
          verbos_clave: [],
        },
        {
          texto:
            "PASO 2: En una olla coloca un chorro de aceite, el ajo molido, y cocina hasta que se comience a pegar en el cucharón. Agrega el arroz y nacara , luego agrega la mitad de las pecanas tostadas, la mitad de los fideos tostados, la mitad del tocino crocante, las pasas completas y 2 1/2 tazas de Big Cola, tapa y cocina por 20 minutos, a fuego mínimo. Cuando el líquido se haya secado agrega la mitad que nos queda de las pecanas, fideos, tocino y un poco de perejil picado, granea y deja que se termine de cocinar el arroz.",
          verbos_clave: ["cocina", "agrega"],
        },
        {
          texto:
            "PASO 3: Sirve en fuentes por separado, para disfrutar en familia o con muy buenos amigos.",
          verbos_clave: ["sirve"],
        },
      ],
    },
    tips: [
      "Utiliza un termómetro de cocina para asegurarte de que la temperatura interna de la pechuga de pavo alcance los 75°C, para garantizar que esté completamente cocida.",
    ],
    temporada: 5,
    nivel_complejidad: "Desafiante",
    glosario: [
      "MARINAR",
      "BASTONES",
      "TEMPERAR",
      "CUCHARADA",
      "PEINAR EL ARROZ",
    ],
    slug: "pechuga-de-pavo-con-arroz-rabe-vx",
  },
  {
    episodio: 30,
    nombre_receta: "QUESADILLAS Y NACHOS CON GUACAMOLE",
    tipo: "Otro",
    media: [
      "https://img.youtube.com/vi/HXeF1fP3OOM/sddefault.jpg",
      "https://youtube.com/watch?v=ys4uufhlFao",
      "https://youtube.com/watch?v=HXeF1fP3OOM",
      "https://youtube.com/watch?v=kDsP8j7Z2PU",
    ],
    ingredientes: {
      TORTILLAS: [
        "2 tzas. de harina de maíz nixtamalizada",
        "1 1/3 tzas. de agua",
      ],
      GUACAMOLE: [
        "2 paltas",
        "1 tomate en concassé",
        "1 tza. de culantro picado",
        "1/2 cebolla en brunoise",
        "2 limones",
        "1/2 ají limo en brunoise",
        "Sal y pimienta",
      ],
      QUESADILLAS: ["2 bolas de queso mozzarella rallado"],
      NACHOS: ["Aceite vegetal para freír"],
    },
    preparacion: {
      TORTILLAS: [
        {
          texto:
            "PASO 1: En un bol agrega la harina y mézclala con el agua, amasando durante 2 minutos. Si la masa se siente un poco seca puedes agregar una cucharada de agua. Una vez lista la dividimos en 20 bolitas de 25 gramos cada una y las cubrimos con un paño húmedo mientras vamos estirando la masa bolita por bolita. Pon un poco de papel film en la mesa de trabajo, coloca una bolita de masa, cubre con otro papel film y con la ayuda de un rodillo aplana dándole forma a la tortilla. Repite el proceso con todas las masas.",
          verbos_clave: ["agrega", "coloca"],
        },
        {
          texto:
            "PASO 2: En una sartén sella las tortillas, a fuego medio, entre 1 a 2 minutos por lado. Retíralas y déjalas reposar envueltas en un paño de tela seco dentro de una bandeja o plato para que se mantengan bien.",
          verbos_clave: ["sella"],
        },
      ],
      NACHOS: [
        {
          texto:
            "PASO 1: Corta las tortillas ya doradas en triángulos y fríelos a 180°C en una fritura profunda con abundante aceite vegetal hasta que estén doradas. Retíralas sobre papel absorbente y agrega sal cuando aún estén calientes.",
          verbos_clave: ["corta", "agrega"],
        },
      ],
      QUESADILLA: [
        {
          texto:
            "PASO 1: En una sartén caliente pon una tortilla, colócale queso mozzarella rallado, espera a que derrita un poco el queso y cierra las tortillas a la mitad.",
          verbos_clave: ["calienta", "cierra"],
        },
      ],
      GUACAMOLE: [
        {
          texto:
            "PASO 1: Machaca las paltas en un bol y agrégales el tomate chiquito, zumo de dos limones, sal, pimienta y un poco de culantro picado. Mézclalo bien, rectifica la sal y sirve.",
          verbos_clave: ["sirve"],
        },
        {
          texto:
            "PASO 2: Sirve los nachos con el guacamole y quesadillas calientes.",
          verbos_clave: ["sirve"],
        },
      ],
    },
    tips: [
      "Si al momento de estirar la masa se contrae, déjala descansar por unos 10 minutos tapada con un secador, para que se relaje la masa y sea mucho más fácil de estirar.",
      "Ojo, los alimentos absorberán menos cantidad de aceite si los fries en abundante aceite donde estén sumergidos por completo, asegurándote de estar a 180°C.",
    ],
    temporada: 5,
    nivel_complejidad: "Intermedio",
    glosario: ["CONCASSÉ", "CUCHARADA", "FRITURA PROFUNDA", "BRUNOISE"],
    slug: "quesadillas-y-nachos-con-guacamole-v9",
  },
];
