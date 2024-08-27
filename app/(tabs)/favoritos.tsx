import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLikedRecipes } from "@/hooks/useLikedRecipes";
import { recipeData, recipeProps } from "@/data/recetario_test";
import Recetas from "@/components/Recetas";
import { useFocusEffect } from "expo-router";
import { getLikedRecipes } from "@/utils/storageUtils";

type Props = {};

const findRecipesFavorites = (
  recipes: recipeProps[],
  likedRecipes: string[]
) => {
  return recipes.filter((recipe) =>
    likedRecipes.includes(recipe.nombre_receta)
  );
};

const favoritos = (props: Props) => {
  const { likedRecipes } = useLikedRecipes();
  const [favoriteRecipes, setFavoriteRecipes] = useState<recipeProps[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      // Actualiza las recetas favoritas cada vez que la pantalla recibe el enfoque

      const fetchLikedRecipes = async () => {
        const recipes = await getLikedRecipes();
        setFavoriteRecipes(findRecipesFavorites(recipeData, recipes));
      };

      fetchLikedRecipes();
    }, [likedRecipes, setFavoriteRecipes])
  );

  console.log(likedRecipes);

  return (
    <ImageBackground
      source={require("@/assets/images/madera4.jpg")}
      style={{ flex: 1 }}
      width={100}
    >
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <View>
            <Recetas meals={favoriteRecipes} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default favoritos;
