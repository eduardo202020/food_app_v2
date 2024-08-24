import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import { foodDataProps } from "../data/index"; // Importar el tipo foodDataProps
import { useRouter } from "expo-router";

export default function Recetas({ meals }: { meals: foodDataProps[] }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recetas:</Text>
      <View>
        {meals.length === 0 ? (
          <Text style={styles.noRecipesText}>No recipes found.</Text>
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item: any) => item.slug}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }: { item: unknown; i: number }) => (
              <RecipeCard item={item as foodDataProps} index={i} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({
  item,
  index,
}: {
  item: foodDataProps;
  index: number;
}) => {
  //   let isEven = index % 2 === 0;
  const router = useRouter();
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={[styles.recipeCard]}
        onPress={() => {
          console.log(`Navigating to recipe: ${item.nombre_receta}`);
          router.push(`/(home)/${item.slug}`);
        }}
      >
        <Image
          source={{ uri: item.media[0] }} // Asume que media[0] es la imagen principal
          style={styles.recipeImage}
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
          {/* <Text style={styles.recipeDificultad}>
            <Text style={{ color: "yellow", fontWeight: "bold" }}>
              Temporada:{" "}
            </Text>
            {item.temporada}
          </Text> */}
        </View>
      </Pressable>
    </Animated.View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
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
    // alignItems: "center",
    borderRadius: 16,
    backgroundColor: "rgba(96, 32, 32, 0.5)",
    padding: 16,
    // add shadow
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
    resizeMode: "cover",
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
    // marginTop: 8,
  },
});
