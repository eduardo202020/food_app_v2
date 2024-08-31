import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";

import { RecipeCard } from "@/components/Recetas";

import {
  recipeProps as foodDataProps,
  recipeData as foodData,
} from "@/data/recetario";

import { debounce } from "lodash";
import { useRouter } from "expo-router";

const SearchScreen = () => {
  const router = useRouter();

  const [results, setResults] = useState<foodDataProps[]>([]);

  const handleSearch = (value: string) => {
    if (value && value.length > 2) {
      const filteredRecipes = foodData.filter((recipe) =>
        recipe.nombre_receta.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredRecipes);
    } else {
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 10), []);

  return (
    <ImageBackground
      source={require("@/assets/images/madera4.jpg")}
      style={{ flex: 1 }}
      width={100}
    >
      <SafeAreaView className=" flex-1 pt-4">
        <View className="mx-4 pl-2 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full ">
          <TextInput
            onChangeText={handleTextDebounce}
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
        ) : (
          <View className="flex-row justify-center ">
            <Image
              source={require("@/assets/images/logo.png")}
              className="h-96 w-96"
            />
          </View>
        )}
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
});

export default SearchScreen;
