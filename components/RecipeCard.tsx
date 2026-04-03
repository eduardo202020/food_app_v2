import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import type { Recipe } from "@/types/recipe";
import { useAppTheme } from "@/hooks/useAppTheme";

function RecipeCardInner({
  item,
  index,
  compact = false,
}: {
  item: Recipe;
  index: number;
  compact?: boolean;
}) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const entering =
    index < 12
      ? FadeInDown.delay(index * 90).duration(520).springify().damping(12)
      : undefined;

  return (
    <Animated.View
      style={compact && styles.compactColumn}
      entering={entering}
    >
      <TouchableOpacity
        style={[
          styles.recipeCard,
          {
            backgroundColor: theme.surfaceStrong,
            borderColor: theme.border,
            shadowColor: theme.shadow,
          },
          compact && styles.recipeCardCompact,
        ]}
        onPress={() => {
          router.push(`/(home)/${item.slug}`);
        }}
      >
        <View
          style={[
            styles.imageFrame,
            { backgroundColor: theme.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.06)" },
            compact && styles.imageFrameCompact,
          ]}
        >
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
          style={[
            styles.recipeTitle,
            { color: theme.text },
            compact && styles.recipeTitleCompact,
          ]}
        >
          {item.nombre_receta}
        </Text>
        {!compact ? (
          <View
            style={[styles.containerText, compact && styles.containerTextCompact]}
          >
            <Text
              style={[
                styles.recipeTipo,
                { color: theme.textMuted },
                compact && styles.recipeMetaCompact,
              ]}
            >
              <Text style={{ color: theme.accent, fontWeight: "bold" }}>
                Tipo:{' '}
              </Text>
              {item.tipo}
            </Text>
            <Text
              style={[
                styles.recipeDificultad,
                { color: theme.textMuted },
                compact && styles.recipeMetaCompact,
              ]}
            >
              <Text style={{ color: theme.accent, fontWeight: "bold" }}>
                Ep:{' '}
              </Text>
              {item.episodio}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </Animated.View>
  );
}

export const RecipeCard = RecipeCardInner;


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
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 7,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
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
    backgroundColor: "#0b1220",
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
