import {
  View,
  ImageBackground,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";

import { useLikedRecipes } from "@/hooks/useLikedRecipes";
import Recetas from "@/components/Recetas";
import { useFocusEffect } from "expo-router";
import { getRecipesByNames } from "@/lib/recipes-db";
import type { Recipe } from "@/types/recipe";
import { getLikedRecipes } from "@/utils/storageUtils";

const FavoritesScreen = () => {
  const db = useSQLiteContext();
  const { likedRecipes } = useLikedRecipes();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;

      const fetchLikedRecipes = async () => {
        setIsLoading(true);

        try {
          const recipes = await getLikedRecipes();
          const favorites = await getRecipesByNames(db, recipes);

          if (isMounted) {
            setFavoriteRecipes(favorites);
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      };

      fetchLikedRecipes();

      return () => {
        isMounted = false;
      };
    }, [db, likedRecipes])
  );

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
            {isLoading ? (
              <View style={{ paddingVertical: 24, alignItems: "center" }}>
                <ActivityIndicator color="#facc15" size="large" />
                <Text style={{ color: "white", marginTop: 12 }}>
                  Cargando favoritos...
                </Text>
              </View>
            ) : (
              <Recetas meals={favoriteRecipes} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default FavoritesScreen;
