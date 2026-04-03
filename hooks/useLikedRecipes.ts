import { useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import {
  getLikedRecipeSlugs,
  migrateLegacyLikedRecipes,
  removeLikedRecipeSlug,
  saveLikedRecipeSlug,
} from "@/utils/storageUtils";
import { getRecipesByNames } from "@/lib/recipes-db";

export const useLikedRecipes = () => {
  const db = useSQLiteContext();
  const [likedRecipeSlugs, setLikedRecipeSlugs] = useState<string[]>([]);

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      const migratedSlugs = await migrateLegacyLikedRecipes(async (names) => {
        const recipes = await getRecipesByNames(db, names);
        return recipes.map((recipe) => recipe.slug);
      });

      if (migratedSlugs.length > 0) {
        setLikedRecipeSlugs(migratedSlugs);
        return;
      }

      const recipes = await getLikedRecipeSlugs();
      setLikedRecipeSlugs(recipes);
    };

    fetchLikedRecipes();
  }, [db]);

  const likeRecipe = async (recipeSlug: string) => {
    await saveLikedRecipeSlug(recipeSlug);
    setLikedRecipeSlugs((currentSlugs) =>
      currentSlugs.includes(recipeSlug)
        ? currentSlugs
        : [...currentSlugs, recipeSlug]
    );
  };

  const unlikeRecipe = async (recipeSlug: string) => {
    await removeLikedRecipeSlug(recipeSlug);
    setLikedRecipeSlugs((currentSlugs) =>
      currentSlugs.filter((storedSlug) => storedSlug !== recipeSlug)
    );
  };
  return {
    likedRecipeSlugs,
    likeRecipe,
    unlikeRecipe,
  };
};
