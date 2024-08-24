import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import TrendingRecipes from "@/components/TrendingRecipes";
import { foodDataProps, foodData } from "../../../data";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Categorias from "@/components/Categorias";
import Recetas from "@/components/Recetas";
import Dificultades from "@/components/Dificultad";

const index = () => {
  const router = useRouter();

  // Estado para la categoría activa y las recetas filtradas
  const [activeCategory, setActiveCategory] = useState<string>("Todo");

  // Estado para la dificultad activa y las recetas filtradas
  const [activeDificultad, setActiveDificultad] = useState<string>("Todo");

  const [filteredRecipes, setFilteredRecipes] =
    useState<foodDataProps[]>(foodData);

  // Función para actualizar las recetas filtradas
  const updateFilteredRecipes = (category: string, dificultad: string) => {
    let updatedRecipes = foodData;

    if (category !== "Todo") {
      updatedRecipes = updatedRecipes.filter(
        (recipe) => recipe.tipo === category
      );
    }

    if (dificultad !== "Todo") {
      updatedRecipes = updatedRecipes.filter(
        (recipe) => recipe.nivel_complejidad === dificultad
      );
    }

    setFilteredRecipes(updatedRecipes);
  };

  // Función para manejar el cambio de dificultad
  const handleDificultad = (dificultad: string) => {
    const newDificultad = activeDificultad === dificultad ? "Todo" : dificultad;
    setActiveDificultad(newDificultad);
    updateFilteredRecipes(activeCategory, newDificultad);
  };

  // Función para manejar el cambio de categoría
  const handleChangeCategory = (category: string) => {
    const newCategory = activeCategory === category ? "Todo" : category;
    setActiveCategory(newCategory);
    updateFilteredRecipes(newCategory, activeDificultad);
  };

  return (
    <ImageBackground
      source={require("@/assets/images/madera4.jpg")}
      style={{ flex: 1 }}
      width={100}
    >
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView>
        <View className="pb-4 flex-row justify-between items-center mx-4 border-solid border-b-stone-900 ">
          <FontAwesome6 name="bars-staggered" size={24} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>E</Text>l{" "}
            <Text style={styles.text}>G</Text>ran{" "}
            <Text style={styles.text}>C</Text>hef
          </Text>
          <TouchableOpacity onPress={() => router.push("/explore")}>
            <FontAwesome name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Recetas filtradas */}
          {foodData.length > 0 && <TrendingRecipes data={foodData} />}

          {/* Dificultades */}
          <Dificultades
            activeDificultad={activeDificultad}
            handleChangeDificultad={handleDificultad}
          />

          {/* Categorías */}
          <Categorias
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />

          {/* Recipes */}
          <View>
            <Recetas meals={filteredRecipes} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default index;

// crea los estilos
const styles = StyleSheet.create({
  text: {
    color: "yellow",
    fontSize: 30,
    fontWeight: "bold",
  },
});
