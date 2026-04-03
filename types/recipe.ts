export interface Recipe {
  episodio: number;
  nombre_receta: string;
  tipo: string;
  media: string[];
  ingredientes: {
    [key: string]: string[];
  };
  preparacion: {
    [key: string]: string[];
  };
  tips: string[];
  temporada: number;
  nivel_complejidad: string;
  glosario: string[];
  slug: string;
}

