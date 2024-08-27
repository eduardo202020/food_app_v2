import AsyncStorage from "@react-native-async-storage/async-storage";

const LIKED_RECIPES_KEY = "likedRecipes";

export const getLikedRecipes = async (): Promise<string[]> => {
  const jsonValue = await AsyncStorage.getItem(LIKED_RECIPES_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
};

export const saveLikedRecipe = async (recipeTitle: string) => {
  const likedRecipes = await getLikedRecipes();
  if (!likedRecipes.includes(recipeTitle)) {
    likedRecipes.push(recipeTitle);
    await AsyncStorage.setItem(LIKED_RECIPES_KEY, JSON.stringify(likedRecipes));
  }
};

export const removeLikedRecipe = async (recipeTitle: string) => {
  let likedRecipes = await getLikedRecipes();
  likedRecipes = likedRecipes.filter((title) => title !== recipeTitle);
  await AsyncStorage.setItem(LIKED_RECIPES_KEY, JSON.stringify(likedRecipes));
};

export const isRecipeLiked = async (recipeTitle: string): Promise<boolean> => {
  const likedRecipes = await getLikedRecipes();
  return likedRecipes.includes(recipeTitle);
};
