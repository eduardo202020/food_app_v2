export interface categoriasProps {
  tipo: string;
  imagen: any;
}

export const categorias: categoriasProps[] = [
  {
    tipo: "Carne",
    imagen: require("../assets/images/tipos/carne.png"),
  },
  {
    tipo: "Vegetariano",
    imagen: require("../assets/images/tipos/vegetariano.png"),
  },
  {
    tipo: "Postres",
    imagen: require("../assets/images/tipos/postres.png"),
  },
  {
    tipo: "Internacional",
    imagen: require("../assets/images/tipos/internacional.png"),
  },
  {
    tipo: "Pasta",
    imagen: require("../assets/images/tipos/pasta.png"),
  },
  {
    tipo: "Entrada",
    imagen: require("../assets/images/tipos/entrada.png"),
  },
  {
    tipo: "Otro",
    imagen: require("../assets/images/tipos/otro.png"),
  },
  {
    tipo: "Mariscos",
    imagen: require("../assets/images/tipos/mariscos.png"),
  },
  {
    tipo: "Pollo",
    imagen: require("../assets/images/tipos/pollo.png"),
  },
];
