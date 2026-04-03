import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import type { Recipe } from "@/types/recipe";


export const RecipeCard = ({
    item,
    index,
  }: {
    item: Recipe;
    index: number;
  }) => {
    const router = useRouter();
    return (
      <Animated.View
        entering={FadeInDown.delay(index * 100)
          .duration(600)
          .springify()
          .damping(12)}
      >
        <TouchableOpacity
          style={styles.recipeCard}
          onPress={() => {
            router.push(`/(home)/${item.slug}`);
          }}
        >
          <Image
            cachePolicy="disk"
            source={{ uri: item.media[0] }}
            style={styles.recipeImage}
            contentFit="cover"
            placeholder={require("@/assets/images/action/plato.jpg")}
            transition={1000}
          />
          <Text style={styles.recipeTitle}>{item.nombre_receta}</Text>
          <View style={styles.containerText}>
            <Text style={styles.recipeTipo}>
              <Text style={{ color: "yellow", fontWeight: "bold" }}>Tipo: </Text>
              {item.tipo}
            </Text>
            <Text style={styles.recipeDificultad}>
              <Text style={{ color: "yellow", fontWeight: "bold" }}>Nivel: </Text>
              {item.nivel_complejidad}
            </Text>
            <Text style={styles.recipeDificultad}>
              <Text style={{ color: "yellow", fontWeight: "bold" }}>Ep: </Text>
              {item.episodio}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };


  const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    overflow: "hidden",
    paddingTop: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 10,
    color: "white",
  },
  noRecipesText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
    fontSize: 18,
  },
  recipeCard: {
    flex: 1,
    marginBottom: 16,
    paddingBottom: 12,
    borderRadius: 16,
    backgroundColor: "rgba(96, 32, 32, 0.5)",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  recipeImage: {
    width: "100%",
    height: 150,
    borderRadius: 16,
    backgroundColor: "#f2f2f2",
  },
  recipeTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "800",
    color: "white",
  },
  recipeTipo: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  recipeDificultad: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  containerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
