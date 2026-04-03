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
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useSQLiteContext } from "expo-sqlite";

import { RecipeCard } from "@/components/RecipeCard";
import { getRecipes } from "@/lib/recipes-db";
import type { Recipe } from "@/types/recipe";
import { useRouter } from "expo-router";
import { temporadas } from "@/data/temporadas";

const difficultyOptions = ["Todo", "Fácil", "Intermedio", "Avanzado", "Desafiante"];

const FilterChip = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.filterChip, active && styles.filterChipActive]}
  >
    <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const SearchScreen = () => {
  const db = useSQLiteContext();
  const router = useRouter();

  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Recipe[]>([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todo");
  const [activeSeason, setActiveSeason] = useState<number | "Todo">("Todo");
  const [activeDifficulty, setActiveDifficulty] = useState("Todo");

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

    setIsSearching(true);

    const timeoutId = setTimeout(() => {
      const filteredRecipes = allRecipes.filter((recipe) => {
        const matchesSearch = !normalizedSearch
          ? true
          : recipe.nombre_receta.toLowerCase().includes(normalizedSearch);
        const matchesCategory =
          activeCategory === "Todo" ? true : recipe.tipo === activeCategory;
        const matchesSeason =
          activeSeason === "Todo" ? true : recipe.temporada === activeSeason;
        const matchesDifficulty =
          activeDifficulty === "Todo"
            ? true
            : recipe.nivel_complejidad === activeDifficulty;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesSeason &&
          matchesDifficulty
        );
      });

      setResults(filteredRecipes);
      setIsSearching(false);
    }, 180);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [activeCategory, activeDifficulty, activeSeason, allRecipes, searchText]);

  const categoryOptions = React.useMemo(
    () => [
      "Todo",
      ...Array.from(new Set(allRecipes.map((recipe) => recipe.tipo))).sort(),
    ],
    [allRecipes]
  );

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
                <View style={styles.filtersBlock}>
                  <Text style={styles.filtersTitle}>Categorias</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterRow}
                  >
                    {categoryOptions.map((category) => (
                      <FilterChip
                        key={category}
                        label={category}
                        active={activeCategory === category}
                        onPress={() => setActiveCategory(category)}
                      />
                    ))}
                  </ScrollView>

                  <Text style={styles.filtersTitle}>Temporadas</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterRow}
                  >
                    <FilterChip
                      label="Todo"
                      active={activeSeason === "Todo"}
                      onPress={() => setActiveSeason("Todo")}
                    />
                    {temporadas.map((temporada) => (
                      <FilterChip
                        key={temporada.temporada}
                        label={`T${temporada.temporada}`}
                        active={activeSeason === temporada.temporada}
                        onPress={() => setActiveSeason(temporada.temporada)}
                      />
                    ))}
                  </ScrollView>

                  <Text style={styles.filtersTitle}>Dificultad</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterRow}
                  >
                    {difficultyOptions.map((difficulty) => (
                      <FilterChip
                        key={difficulty}
                        label={difficulty}
                        active={activeDifficulty === difficulty}
                        onPress={() => setActiveDifficulty(difficulty)}
                      />
                    ))}
                  </ScrollView>
                </View>
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
  filtersBlock: {
    marginBottom: 14,
  },
  filtersTitle: {
    color: "#fef3c7",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
    marginLeft: 4,
    marginTop: 10,
  },
  filterRow: {
    paddingHorizontal: 2,
    paddingRight: 10,
  },
  filterChip: {
    backgroundColor: "rgba(255,255,255,0.14)",
    borderColor: "rgba(255,255,255,0.16)",
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterChipActive: {
    backgroundColor: "#fbbf24",
    borderColor: "#fbbf24",
  },
  filterChipText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
  filterChipTextActive: {
    color: "#3a2200",
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
