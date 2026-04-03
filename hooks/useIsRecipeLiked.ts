import { useState, useEffect } from "react";
import { isRecipeSlugLiked } from "@/utils/storageUtils";

export const useIsRecipeLiked = (recipeSlug: string) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!recipeSlug) {
        setIsLiked(false);
        return;
      }

      const liked = await isRecipeSlugLiked(recipeSlug);
      setIsLiked(liked);
    };

    checkIfLiked();
  }, [recipeSlug]);

  return isLiked;
};
