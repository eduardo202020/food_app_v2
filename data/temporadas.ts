export interface tempProps {
  temporada: number;
  imagen: any;
  ganador: string;
  participantes: string[];
  tercer_puesto: string;
  cantidad_platos: number;
  resumen: string;
}

export const temporadas: tempProps[] = [
  {
    temporada: 1,
    imagen: require("../assets/images/temporadas/temp_01.jpg"),
    ganador: "Natalia Salas",
    participantes: [
      "Natalia Salas",
      "Carlos Álvarez",
      "Susan León",
      "Yiddá Eslava",
      "Armando Machuca",
      "Mariella Zanetti",
      "Javier Dulzaides",
      "Patricio Suárez Vértiz",
    ],
    tercer_puesto: "Carlos Álvarez",
    cantidad_platos: 24,
    resumen:
      "La primera temporada se destacó por la emoción y la alta competitividad, con Natalia Salas alzándose como la ganadora.",
  },
  {
    temporada: 2,
    imagen: require("../assets/images/temporadas/temp_02.jpg"),
    ganador: "Ale Fuller",
    participantes: [
      "Ale Fuller",
      "Natalia Salas",
      "Mauricio Mesones",
      "Susan León",
      "Mariella Zanetti",
      "Armando Machuca",
      "Giancarlo Granda",
      "Yiddá Eslava",
    ],
    tercer_puesto: "Mauricio Mesones",
    cantidad_platos: 27,
    resumen:
      "En esta temporada, Ale Fuller se coronó como la ganadora, destacando su habilidad y creatividad en la cocina.",
  },
  {
    temporada: 3,
    imagen: require("../assets/images/temporadas/temp_03.jpg"),
    ganador: "Mariella Zanetti",
    participantes: [
      "Mariella Zanetti",
      "Armando Machuca",
      "Milene Vázquez",
      "Natalia Salas",
      "Patricio Suárez Vértiz",
      "Carlos Álvarez",
      "Giancarlo Granda",
      "Ale Fuller",
    ],
    tercer_puesto: "Milene Vázquez",
    cantidad_platos: 30,
    resumen:
      "Mariella Zanetti se llevó la victoria en una temporada que estuvo llena de sorpresas y platillos exquisitos.",
  },
  {
    temporada: 4,
    imagen: require("../assets/images/temporadas/temp_04.jpg"),
    ganador: "Saskia Bernaola",
    participantes: [
      "Saskia Bernaola",
      "Gino Pessaressi",
      "Fiorella Cayo",
      "Mónica Zevallos",
      "Checho Ibarra",
      "Flor Polo",
      "Renato Rossini padre",
      "Renato Rossini hijo",
      "Tilsa Lozano",
      "Ximena Hoyos",
    ],
    tercer_puesto: "Gino Pessaressi",
    cantidad_platos: 30,
    resumen:
      "La cuarta temporada trajo nuevos retos, donde Saskia Bernaola brilló y ganó la competencia.",
  },
  {
    temporada: 5,
    imagen: require("../assets/images/temporadas/temp_05.jpg"),
    ganador: "Christian Ysla",
    participantes: [
      "Tilsa Lozano",
      "Mayra Goñi",
      "Mónica Torres",
      "Ale Fuller",
      "Mauricio Mesones",
      "Christian «Loco» Wagner",
      "Milene Vázquez",
      "Nico Ponce",
      "Armando Machuca",
    ],
    tercer_puesto: "Mayra Goñi",
    cantidad_platos: 32,
    resumen:
      "Christian Ysla se llevó la victoria en una temporada que estuvo llena de sorpresas y platillos exquisitos.",
  },
];
