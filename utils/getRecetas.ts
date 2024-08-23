import { foodDataProps, foodData } from "../data/index";

export const getRecetas = (tipo: string): foodDataProps[] => {
  // Filtra las recetas por el tipo proporcionado
  const platos = foodData.filter(
    (receta) => receta.tipo.toLowerCase() === tipo.toLowerCase()
  );

  return platos;
};

export const getRecetasPorDificultad = (nivel: string): foodDataProps[] => {
  // Filtra las recetas por el nivel de complejidad proporcionado
  const recetasFiltradas = foodData.filter(
    (receta) => receta.nivel_complejidad.toLowerCase() === nivel.toLowerCase()
  );

  return recetasFiltradas;
};
