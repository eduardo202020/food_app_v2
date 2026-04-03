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
import { searchRecipesByName } from "@/lib/recipes-db";
import type { Recipe } from "@/types/recipe";
import { useRouter } from "expo-router";

const SearchScreen = () => {
  const db = useSQLiteContext();
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Recipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (searchText.trim().length < 3) {
      setResults([]);
      setIsSearching(false);
      return () => {
        isMounted = false;
      };
    }

    setIsSearching(true);

    const timeoutId = setTimeout(async () => {
      try {
        const recipes = await searchRecipesByName(db, searchText);

        if (isMounted) {
          setResults(recipes);
        }
      } finally {
        if (isMounted) {
          setIsSearching(false);
        }
      }
    }, 180);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [db, searchText]);

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
              router.push("/(home)");
            }}
            className="rounded-full p-3 m-1 bg-neutral-500"
          >
            <XMarkIcon size="25" color="white" />
          </TouchableOpacity>
        </View>

        {isSearching ? (
          <View style={styles.logoContent}>
            <ActivityIndicator color="#facc15" size="large" />
            <Text style={styles.searchingText}>Buscando recetas...</Text>
          </View>
        ) : null}

        {results.length > 0 ? (
          <FlatList
            data={results}
            renderItem={({ item, index }) => (
              <RecipeCard
                item={item}
                index={index + item.episodio * item.temporada}
              />
            )}
            keyExtractor={(item) =>
              item.nombre_receta + item.temporada + item.episodio
            }
            ListHeaderComponent={
              <Text className="text-white font-semibold ml-1 ">
                Resultados ({results.length}):
              </Text>
            }
          ></FlatList>
        ) : !isSearching ? (
          <View className="flex-row justify-center ">
            <Image
              source={require("@/assets/images/logo.png")}
              className="h-96 w-96"
            />
          </View>
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
  },
  searchingText: {
    color: "white",
    fontSize: 16,
    marginTop: 12,
  },
});

export default SearchScreen;
