import { useState, useEffect } from "react";
import { isRecipeLiked } from "@/utils/storageUtils";

export const useIsRecipeLiked = (recipeTitle: string) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      const liked = await isRecipeLiked(recipeTitle);
      setIsLiked(liked);
    };

    checkIfLiked();
  }, [recipeTitle]);

  return isLiked;
};
