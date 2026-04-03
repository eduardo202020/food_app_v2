import type { SQLiteDatabase } from 'expo-sqlite';
import type { Recipe } from '@/types/recipe';

type RecipeRow = {
  id: number;
  episodio: number;
  nombre_receta: string;
  tipo: string;
  media: string;
  ingredientes: string;
  preparacion: string;
  tips: string;
  temporada: number;
  nivel_complejidad: string;
  glosario: string;
  slug: string;
};

const RECIPE_SELECT = `
  SELECT
    id,
    episodio,
    nombre_receta,
    tipo,
    media,
    ingredientes,
    preparacion,
    tips,
    temporada,
    nivel_complejidad,
    glosario,
    slug
  FROM recipes
`;

const RECIPES_DB_VERSION = 3;

const parseRecipeRow = (row: RecipeRow): Recipe => {
  const { id: _id, ...recipeRow } = row;

  return {
    ...recipeRow,
    media: JSON.parse(recipeRow.media),
    ingredientes: JSON.parse(recipeRow.ingredientes),
    preparacion: JSON.parse(recipeRow.preparacion),
    tips: JSON.parse(recipeRow.tips),
    glosario: JSON.parse(recipeRow.glosario),
  };
};

export const initializeRecipesDatabase = async (db: SQLiteDatabase) => {
  await db.execAsync('PRAGMA journal_mode = WAL;');

  const versionRow = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  const currentVersion = versionRow?.user_version ?? 0;

  if (currentVersion < RECIPES_DB_VERSION) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL,
        episodio INTEGER NOT NULL,
        nombre_receta TEXT NOT NULL,
        tipo TEXT NOT NULL,
        media TEXT NOT NULL,
        ingredientes TEXT NOT NULL,
        preparacion TEXT NOT NULL,
        tips TEXT NOT NULL,
        temporada INTEGER NOT NULL,
        nivel_complejidad TEXT NOT NULL,
        glosario TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_recipes_slug ON recipes(slug);
      CREATE INDEX IF NOT EXISTS idx_recipes_nombre_receta ON recipes(nombre_receta);
      CREATE INDEX IF NOT EXISTS idx_recipes_temporada ON recipes(temporada);
      CREATE INDEX IF NOT EXISTS idx_recipes_tipo ON recipes(tipo);
      CREATE INDEX IF NOT EXISTS idx_recipes_nivel_complejidad ON recipes(nivel_complejidad);
      CREATE INDEX IF NOT EXISTS idx_recipes_slug_temporada_episodio
        ON recipes(slug, temporada, episodio);

      PRAGMA user_version = ${RECIPES_DB_VERSION};
    `);
  }
};

export const getRecipes = async (
  db: SQLiteDatabase,
  filters?: { category?: string; difficulty?: string }
) => {
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (filters?.category && filters.category !== 'Todo') {
    conditions.push('tipo = ?');
    params.push(filters.category);
  }

  if (filters?.difficulty && filters.difficulty !== 'Todo') {
    conditions.push('nivel_complejidad = ?');
    params.push(filters.difficulty);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const rows = await db.getAllAsync<RecipeRow>(
    `${RECIPE_SELECT} ${whereClause} ORDER BY temporada, episodio, nombre_receta`,
    ...params
  );

  return rows.map(parseRecipeRow);
};

export const getRecipeBySlug = async (db: SQLiteDatabase, slug: string) => {
  const row = await db.getFirstAsync<RecipeRow>(
    `${RECIPE_SELECT}
     WHERE slug = ?
     ORDER BY temporada DESC, episodio DESC, id DESC
     LIMIT 1`,
    slug
  );

  return row ? parseRecipeRow(row) : null;
};

export const getRecipesBySeason = async (
  db: SQLiteDatabase,
  season: number
) => {
  const rows = await db.getAllAsync<RecipeRow>(
    `${RECIPE_SELECT} WHERE temporada = ? ORDER BY episodio, nombre_receta`,
    season
  );

  return rows.map(parseRecipeRow);
};

export const searchRecipesByName = async (
  db: SQLiteDatabase,
  query: string
) => {
  const normalizedQuery = query.trim();

  if (normalizedQuery.length < 3) {
    return [];
  }

  const rows = await db.getAllAsync<RecipeRow>(
    `${RECIPE_SELECT}
     WHERE lower(nombre_receta) LIKE '%' || lower(?) || '%'
     ORDER BY nombre_receta
     LIMIT 50`,
    normalizedQuery
  );

  return rows.map(parseRecipeRow);
};

export const getRecipesByNames = async (
  db: SQLiteDatabase,
  recipeNames: string[]
) => {
  if (recipeNames.length === 0) {
    return [];
  }

  const placeholders = recipeNames.map(() => '?').join(', ');
  const rows = await db.getAllAsync<RecipeRow>(
    `${RECIPE_SELECT} WHERE nombre_receta IN (${placeholders})`,
    ...recipeNames
  );

  const recipes = rows.map(parseRecipeRow);

  return recipeNames
    .map((recipeName) =>
      recipes.find((recipe) => recipe.nombre_receta === recipeName)
    )
    .filter((recipe): recipe is Recipe => recipe !== undefined);
};

export const getRecipesBySlugs = async (
  db: SQLiteDatabase,
  recipeSlugs: string[]
) => {
  if (recipeSlugs.length === 0) {
    return [];
  }

  const placeholders = recipeSlugs.map(() => '?').join(', ');
  const rows = await db.getAllAsync<RecipeRow>(
    `${RECIPE_SELECT} WHERE slug IN (${placeholders})`,
    ...recipeSlugs
  );

  const recipes = rows.map(parseRecipeRow);

  return recipeSlugs
    .map((recipeSlug) => recipes.find((recipe) => recipe.slug === recipeSlug))
    .filter((recipe): recipe is Recipe => recipe !== undefined);
};

export const getRelatedRecipes = async (
  db: SQLiteDatabase,
  currentRecipe: Pick<Recipe, 'slug' | 'tipo' | 'temporada'>,
  limit = 6
) => {
  const rows = await db.getAllAsync<RecipeRow>(
    `${RECIPE_SELECT}
     WHERE slug != ?
       AND (tipo = ? OR temporada = ?)
     ORDER BY
       CASE WHEN tipo = ? THEN 0 ELSE 1 END,
       CASE WHEN temporada = ? THEN 0 ELSE 1 END,
       temporada DESC,
       episodio ASC
     LIMIT ?`,
    currentRecipe.slug,
    currentRecipe.tipo,
    currentRecipe.temporada,
    currentRecipe.tipo,
    currentRecipe.temporada,
    limit
  );

  return rows.map(parseRecipeRow);
};
