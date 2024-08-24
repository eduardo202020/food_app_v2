export interface accionesProps {
  tipo: string;
  imagen: any;
}

export const acciones: accionesProps[] = [
  {
    tipo: "agrega",
    imagen: require("../assets/images/action/agrega.png"),
  },
  {
    tipo: "cocina",
    imagen: require("../assets/images/action/cocina.png"),
  },
  {
    tipo: "deja",
    imagen: require("../assets/images/action/deja.png"),
  },
  {
    tipo: "reserva",
    imagen: require("../assets/images/action/reserva.png"),
  },
  {
    tipo: "mezcla",
    imagen: require("../assets/images/action/mezcla.png"),
  },
  {
    tipo: "incorpora",
    imagen: require("../assets/images/action/incorpora.png"),
  },
  {
    tipo: "retira",
    imagen: require("../assets/images/action/retira.png"),
  },
  {
    tipo: "sazona",
    imagen: require("../assets/images/action/sazona.png"),
  },
  {
    tipo: "sirve",
    imagen: require("../assets/images/action/sirve.png"),
  },
  {
    tipo: "corta",
    imagen: require("../assets/images/action/corta.png"),
  },
  {
    tipo: "limpia",
    imagen: require("../assets/images/action/limpia.png"),
  },
  {
    tipo: "coloca",
    imagen: require("../assets/images/action/incorpora.png"),
  },
];
