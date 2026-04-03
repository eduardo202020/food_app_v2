import {
  ActivityIndicator,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useSQLiteContext } from "expo-sqlite";

import { RecipeCard } from "@/components/RecipeCard";
import { getRecipes } from "@/lib/recipes-db";
import type { Recipe } from "@/types/recipe";
import { useRouter } from "expo-router";

const SearchScreen = () => {
  const db = useSQLiteContext();
  const router = useRouter();

  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Recipe[]>([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadRecipes = async () => {
      try {
        const recipes = await getRecipes(db);

        if (isMounted) {
          setAllRecipes(recipes);
          setResults(recipes);
        }
      } finally {
        if (isMounted) {
          setIsLoadingRecipes(false);
        }
      }
    };

    loadRecipes();

    return () => {
      isMounted = false;
    };
  }, [db]);

  useEffect(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    if (!normalizedSearch) {
      setResults(allRecipes);
      setIsSearching(false);
      return () => {
        undefined;
      };
    }

    setIsSearching(true);

    const timeoutId = setTimeout(() => {
      const filteredRecipes = allRecipes.filter((recipe) =>
        recipe.nombre_receta.toLowerCase().includes(normalizedSearch)
      );

      setResults(filteredRecipes);
      setIsSearching(false);
    }, 180);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [allRecipes, searchText]);

  return (
    <ImageBackground
      source={require("@/assets/images/madera4.jpg")}
      style={{ flex: 1 }}
      width={100}
    >
      <SafeAreaView className=" flex-1 pt-4">
        <View className="mx-4 pl-2 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full ">
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Buscar Recetas"
            placeholderTextColor={"lightgray"}
            className="pb-1 pl-6 text-base font-semibold text-yellow-500 tracking-wider flex-1 "
          />
          <TouchableOpacity
            onPress={() => {
              if (searchText) {
                setSearchText("");
                return;
              }

              router.push("/(home)");
            }}
            className="rounded-full p-3 m-1 bg-neutral-500"
          >
            <XMarkIcon size="25" color="white" />
          </TouchableOpacity>
        </View>

        {isLoadingRecipes ? (
          <View style={styles.logoContent}>
            <ActivityIndicator color="#facc15" size="large" />
            <Text style={styles.searchingText}>Cargando recetas...</Text>
          </View>
        ) : null}

        {!isLoadingRecipes ? (
          <FlatList
            data={results}
            numColumns={2}
            renderItem={({ item, index }) => (
              <RecipeCard
                item={item}
                index={index + item.episodio * item.temporada}
                compact
              />
            )}
            keyExtractor={(item) =>
              item.nombre_receta + item.temporada + item.episodio
            }
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={styles.gridContent}
            ListHeaderComponent={
              <View style={styles.resultsHeader}>
                <Text className="text-white font-semibold ml-1 ">
                  {searchText ? `Resultados (${results.length})` : "Todas las recetas"}
                </Text>
                {isSearching ? (
                  <Text style={styles.filteringText}>Filtrando...</Text>
                ) : null}
              </View>
            }
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Image
                  source={require("@/assets/images/logo.png")}
                  className="h-52 w-52"
                />
                <Text style={styles.emptyText}>
                  No encontramos recetas con ese nombre.
                </Text>
              </View>
            }
          />
        ) : null}
      </SafeAreaView>
    </ImageBackground>
  );
};

// crea los estilos
const styles = StyleSheet.create({
  logoContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  searchingText: {
    color: "white",
    fontSize: 16,
    marginTop: 12,
  },
  resultsHeader: {
    marginBottom: 12,
    paddingHorizontal: 6,
  },
  filteringText: {
    color: "#fde68a",
    fontSize: 12,
    marginLeft: 6,
    marginTop: 6,
  },
  gridContent: {
    paddingBottom: 24,
    paddingHorizontal: 12,
  },
  gridRow: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
  },
  emptyText: {
    color: "white",
    fontSize: 16,
    marginTop: 8,
  },
});

export default SearchScreen;
