import AsyncStorage from "@react-native-async-storage/async-storage";

const LEGACY_LIKED_RECIPES_KEY = "likedRecipes";
const LIKED_RECIPE_SLUGS_KEY = "likedRecipeSlugs";

const setLikedRecipeSlugs = async (slugs: string[]) => {
  await AsyncStorage.setItem(
    LIKED_RECIPE_SLUGS_KEY,
    JSON.stringify([...new Set(slugs)])
  );
};

export const getLikedRecipeSlugs = async (): Promise<string[]> => {
  const jsonValue = await AsyncStorage.getItem(LIKED_RECIPE_SLUGS_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
};

export const migrateLegacyLikedRecipes = async (
  mapNamesToSlugs: (recipeNames: string[]) => Promise<string[]>
) => {
  const legacyJsonValue = await AsyncStorage.getItem(LEGACY_LIKED_RECIPES_KEY);
  const currentSlugs = await getLikedRecipeSlugs();

  if (!legacyJsonValue) {
    return currentSlugs;
  }

  const legacyRecipeNames = JSON.parse(legacyJsonValue) as string[];
  const migratedSlugs = await mapNamesToSlugs(legacyRecipeNames);
  const mergedSlugs = [...new Set([...currentSlugs, ...migratedSlugs])];

  await setLikedRecipeSlugs(mergedSlugs);
  await AsyncStorage.removeItem(LEGACY_LIKED_RECIPES_KEY);

  return mergedSlugs;
};

export const saveLikedRecipeSlug = async (recipeSlug: string) => {
  const likedRecipeSlugs = await getLikedRecipeSlugs();
  if (!likedRecipeSlugs.includes(recipeSlug)) {
    likedRecipeSlugs.push(recipeSlug);
    await setLikedRecipeSlugs(likedRecipeSlugs);
  }
};

export const removeLikedRecipeSlug = async (recipeSlug: string) => {
  const likedRecipeSlugs = await getLikedRecipeSlugs();
  await setLikedRecipeSlugs(
    likedRecipeSlugs.filter((storedSlug) => storedSlug !== recipeSlug)
  );
};

export const isRecipeSlugLiked = async (
  recipeSlug: string
): Promise<boolean> => {
  const likedRecipeSlugs = await getLikedRecipeSlugs();
  return likedRecipeSlugs.includes(recipeSlug);
};
