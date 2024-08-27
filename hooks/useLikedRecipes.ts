import { useState, useEffect } from "react";
import {
  getLikedRecipes,
  saveLikedRecipe,
  removeLikedRecipe,
} from "@/utils/storageUtils";

export const useLikedRecipes = () => {
  const [likedRecipes, setLikedRecipes] = useState<string[]>([]);

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      const recipes = await getLikedRecipes();
      setLikedRecipes(recipes);
    };

    fetchLikedRecipes();
  }, []);

  const likeRecipe = async (recipeTitle: string) => {
    await saveLikedRecipe(recipeTitle);
    setLikedRecipes([...likedRecipes, recipeTitle]);
  };

  const unlikeRecipe = async (recipeTitle: string) => {
    await removeLikedRecipe(recipeTitle);
    setLikedRecipes(likedRecipes.filter((title) => title !== recipeTitle));
  };

  return {
    likedRecipes,
    likeRecipe,
    unlikeRecipe,
  };
};
