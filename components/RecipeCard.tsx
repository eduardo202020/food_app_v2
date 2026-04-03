import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import type { Recipe } from "@/types/recipe";

export const RecipeCard = ({
  item,
  index,
  compact = false,
}: {
  item: Recipe;
  index: number;
  compact?: boolean;
}) => {
  const router = useRouter();

  return (
    <Animated.View
      style={compact && styles.compactColumn}
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <TouchableOpacity
        style={[styles.recipeCard, compact && styles.recipeCardCompact]}
        onPress={() => {
          router.push(`/(home)/${item.slug}`);
        }}
      >
        <View style={[styles.imageFrame, compact && styles.imageFrameCompact]}>
          <Image
            cachePolicy="disk"
            source={{ uri: item.media[0] }}
            style={[styles.recipeImage, compact && styles.recipeImageCompact]}
            contentFit="cover"
            contentPosition="center"
            placeholder={require("@/assets/images/action/plato.jpg")}
            transition={1000}
          />
        </View>
        <Text
          numberOfLines={compact ? 2 : 3}
          style={[styles.recipeTitle, compact && styles.recipeTitleCompact]}
        >
          {item.nombre_receta}
        </Text>
        {!compact ? (
          <View
            style={[styles.containerText, compact && styles.containerTextCompact]}
          >
            <Text style={[styles.recipeTipo, compact && styles.recipeMetaCompact]}>
              <Text style={{ color: "yellow", fontWeight: "bold" }}>Tipo: </Text>
              {item.tipo}
            </Text>
            <Text
              style={[styles.recipeDificultad, compact && styles.recipeMetaCompact]}
            >
              <Text style={{ color: "yellow", fontWeight: "bold" }}>Ep: </Text>
              {item.episodio}
            </Text>
          </View>
        ) : null}
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
  recipeCardCompact: {
    minHeight: 152,
    padding: 10,
    width: "100%",
  },
  imageFrame: {
    borderRadius: 16,
    overflow: "hidden",
  },
  imageFrameCompact: {
    height: 98,
  },
  compactColumn: {
    marginBottom: 6,
    width: "48%",
  },
  recipeImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#f2f2f2",
  },
  recipeImageCompact: {
    height: 118,
    marginTop: -10,
  },
  recipeTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "800",
    color: "white",
  },
  recipeTitleCompact: {
    fontSize: 13,
    lineHeight: 17,
    marginTop: 8,
    minHeight: 34,
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
  recipeMetaCompact: {
    fontSize: 12,
    marginTop: 6,
  },
  containerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerTextCompact: {
    alignItems: "flex-start",
    flexDirection: "column",
    marginTop: 2,
  },
});
