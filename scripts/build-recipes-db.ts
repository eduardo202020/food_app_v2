import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import initSqlJs from 'sql.js';

import { recipeData } from '../data/recetario';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const outputPath = path.join(projectRoot, 'assets', 'db', 'recipes.db');
const RECIPES_DB_VERSION = 3;

const main = async () => {
  const SQL = await initSqlJs({});
  const db = new SQL.Database();

  db.exec(`
    PRAGMA journal_mode = DELETE;

    CREATE TABLE recipes (
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

    CREATE INDEX idx_recipes_slug ON recipes(slug);
    CREATE INDEX idx_recipes_nombre_receta ON recipes(nombre_receta);
    CREATE INDEX idx_recipes_temporada ON recipes(temporada);
    CREATE INDEX idx_recipes_tipo ON recipes(tipo);
    CREATE INDEX idx_recipes_nivel_complejidad ON recipes(nivel_complejidad);
    CREATE INDEX idx_recipes_slug_temporada_episodio
      ON recipes(slug, temporada, episodio);

    PRAGMA user_version = ${RECIPES_DB_VERSION};
  `);

  const insertStatement = db.prepare(`
    INSERT INTO recipes (
      slug,
      episodio,
      nombre_receta,
      tipo,
      media,
      ingredientes,
      preparacion,
      tips,
      temporada,
      nivel_complejidad,
      glosario
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  db.exec('BEGIN TRANSACTION');

  try {
    for (const recipe of recipeData) {
      insertStatement.run([
        recipe.slug,
        recipe.episodio,
        recipe.nombre_receta,
        recipe.tipo,
        JSON.stringify(recipe.media),
        JSON.stringify(recipe.ingredientes),
        JSON.stringify(recipe.preparacion),
        JSON.stringify(recipe.tips),
        recipe.temporada,
        recipe.nivel_complejidad,
        JSON.stringify(recipe.glosario),
      ]);
    }

    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  } finally {
    insertStatement.free();
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, Buffer.from(db.export()));
  db.close();

  console.log(`SQLite database written to ${outputPath}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
