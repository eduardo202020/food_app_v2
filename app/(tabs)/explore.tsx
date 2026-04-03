import {
  ActivityIndicator,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
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
import { AppBackground } from "@/components/AppBackground";
import { useAppTheme } from "@/hooks/useAppTheme";

const difficultyOptions = ["Todo", "Fácil", "Intermedio", "Avanzado", "Desafiante"];

const FilterChip = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.filterChip,
        {
          backgroundColor: active ? theme.accent : theme.surface,
          borderColor: active ? 'rgba(250, 204, 21, 0.35)' : theme.border,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <Text
        style={[
          styles.filterChipText,
          { color: active ? theme.accentTextOn : theme.text },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const SearchScreen = () => {
  const db = useSQLiteContext();
  const { theme } = useAppTheme();
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
    <AppBackground>
      <SafeAreaView className=" flex-1 pt-4">
        <View
          className="mx-4 pl-2 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full "
          style={[
            styles.searchSurface,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              shadowColor: theme.shadow,
            },
          ]}
        >
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Buscar Recetas"
            placeholderTextColor={theme.textMuted}
            className="pb-1 pl-6 text-base font-semibold text-yellow-500 tracking-wider flex-1 "
            style={{ color: theme.text }}
          />
          <TouchableOpacity
            onPress={() => {
              if (searchText) {
                setSearchText("");
                return;
              }

              router.push("/(home)");
            }}
            style={[
              styles.clearButton,
              {
                backgroundColor:
                  theme.mode === "dark" ? "rgba(255,255,255,0.14)" : "rgba(15,23,42,0.06)",
              },
            ]}
          >
            <XMarkIcon size="25" color={theme.text} />
          </TouchableOpacity>
        </View>

        {isLoadingRecipes ? (
          <View style={styles.logoContent}>
            <ActivityIndicator color="#facc15" size="large" />
            <Text style={[styles.searchingText, { color: theme.textMuted }]}>
              Cargando recetas...
            </Text>
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
                  <Text style={[styles.filtersTitle, { color: theme.textMuted }]}>
                    Categorias
                  </Text>
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

                  <Text style={[styles.filtersTitle, { color: theme.textMuted }]}>
                    Temporadas
                  </Text>
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

                  <Text style={[styles.filtersTitle, { color: theme.textMuted }]}>
                    Dificultad
                  </Text>
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
                <Text
                  className="font-semibold ml-1 "
                  style={{ color: theme.text }}
                >
                  {searchText ? `Resultados (${results.length})` : "Todas las recetas"}
                </Text>
                {isSearching ? (
                  <Text style={[styles.filteringText, { color: theme.textMuted }]}>
                    Filtrando...
                  </Text>
                ) : null}
              </View>
            }
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Image
                  source={require("@/assets/images/logo.png")}
                  className="h-52 w-52"
                />
                <Text style={[styles.emptyText, { color: theme.text }]}>
                  No encontramos recetas con ese nombre.
                </Text>
              </View>
            }
          />
        ) : null}
      </SafeAreaView>
    </AppBackground>
  );
};

// crea los estilos
const styles = StyleSheet.create({
  searchSurface: {
    backgroundColor: "rgba(17, 24, 39, 0.55)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 7,
  },
  logoContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  searchingText: {
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
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
    marginLeft: 4,
    marginTop: 10,
  },
  filterRow: {
    paddingHorizontal: 2,
    paddingRight: 10,
    paddingBottom: 18,
    paddingTop: 4,
  },
  filterChip: {
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOpacity: 0.14,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "600",
  },
  filteringText: {
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
    fontSize: 16,
    marginTop: 8,
  },
  clearButton: {
    borderRadius: 999,
    padding: 12,
    margin: 4,
  },
});

export default SearchScreen;
